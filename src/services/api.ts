import {
  CapabilityId,
  CapabilityResult,
  ChatMessage,
  DocumentType,
  InputEnvelope,
} from "../types";
import { runDeterministicCapability } from "../utils/deterministicEngine";

export interface HealthResponse {
  status: string;
  service: string;
  aiEnabled: boolean;
  provider: string;
}

export async function checkServerHealth(): Promise<HealthResponse> {
  try {
    const res = await fetch("/api/health");
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch {
    return {
      status: "offline",
      service: "DocuMind_AI  Client Engine",
      aiEnabled: false,
      provider: "Deterministic Fallback Active",
    };
  }
}

export async function uploadDocumentFile(file: File): Promise<{
  name: string;
  mimeType: string;
  sizeBytes: number;
  text: string;
  wordCount: number;
  charCount: number;
  pageCountEstimate: number;
}> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Upload failed" }));
    throw new Error(err.error || "Upload failed");
  }

  return await res.json();
}

export async function executeCapability(
  capabilityId: CapabilityId,
  doc: InputEnvelope,
  customPrompt?: string,
): Promise<CapabilityResult> {
  try {
    const res = await fetch("/api/capabilities/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        capabilityId,
        text: doc.text,
        docType: doc.documentType,
        customPrompt,
      }),
    });

    if (!res.ok) {
      throw new Error(`Capability API error: ${res.statusText}`);
    }

    const data = await res.json();

    if (data.useDeterministicFallback) {
      console.info(
        `[DocuMind_AI ] Running deterministic capability pipeline for ${capabilityId}`,
      );
      return runDeterministicCapability(
        capabilityId,
        doc.text,
        doc.documentType,
      );
    }

    return data;
  } catch (err) {
    console.warn(
      `[DocuMind_AI ] Server capability error, using deterministic fallback:`,
      err,
    );
    return runDeterministicCapability(capabilityId, doc.text, doc.documentType);
  }
}

export async function sendGroundedChatMessage(
  doc: InputEnvelope,
  history: ChatMessage[],
  message: string,
): Promise<{
  reply: string;
  citations?: string[];
  suggestedPrompts?: string[];
  provider: string;
}> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentText: doc.text,
        documentName: doc.name,
        history,
        message,
      }),
    });

    if (!res.ok) {
      throw new Error("Chat API call failed");
    }

    return await res.json();
  } catch (err: any) {
    console.warn(
      "Chat request failed, returning client fallback response:",
      err,
    );
    return {
      reply: `I analyzed "${doc.name}". The document encompasses ${doc.wordCount} words across estimated ${doc.pageCountEstimate} page(s). You can run capabilities like 'Extract Facts' or 'Risk Verdict' from the toolbar to see structured breakdowns.`,
      citations: ["Document Overview"],
      suggestedPrompts: [
        "What are the key financial terms?",
        "Highlight all termination clauses",
        "Who are the named parties in this document?",
      ],
      provider: "fallback",
    };
  }
}
