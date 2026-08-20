import React, { useState } from "react";
import { Download, Copy, Check, FileText, Code, X, Share2 } from "lucide-react";
import { InputEnvelope } from "../types";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  doc: InputEnvelope;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  doc,
}) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<"markdown" | "json">("markdown");

  if (!isOpen) return null;

  const generateMarkdown = () => {
    let md = `# DocuMind_AI  Intelligence Dossier\n\n`;
    md += `**Document Name:** ${doc.name}\n`;
    md += `**Document Type:** ${doc.documentType.toUpperCase()}\n`;
    md += `**Word Count:** ${doc.wordCount} words\n`;
    md += `**Generated At:** ${new Date().toISOString()}\n\n`;
    md += `---\n\n`;

    if (doc.results.SUMMARIZE?.data) {
      const s = doc.results.SUMMARIZE.data;
      md += `## 1. Executive Summary\n\n${s.executiveSummary || ""}\n\n`;
      if (s.keyPoints?.length) {
        md += `### Key Takeaways:\n`;
        s.keyPoints.forEach((p: string) => {
          md += `- ${p}\n`;
        });
        md += `\n`;
      }
    }

    if (doc.results.VERDICT?.data) {
      const v = doc.results.VERDICT.data;
      md += `## 2. Risk & Compliance Verdict\n\n`;
      md += `**Verdict:** ${v.verdict} (Risk Score: ${v.riskScore}/100 - ${v.riskLevel})\n\n`;
      md += `${v.summaryVerdict}\n\n`;
      if (v.flags?.length) {
        md += `### Flagged Clauses & Issues:\n`;
        v.flags.forEach((f: any) => {
          md += `- **[${f.severity.toUpperCase()}] ${f.title}**: ${f.description}\n`;
          if (f.recommendation)
            md += `  - *Recommendation:* ${f.recommendation}\n`;
        });
        md += `\n`;
      }
    }

    if (doc.results.EXTRACT_FACTS?.data?.fields) {
      md += `## 3. Extracted Structured Facts\n\n`;
      md += `| Field Name | Value | Confidence |\n|---|---|---|\n`;
      doc.results.EXTRACT_FACTS.data.fields.forEach((f: any) => {
        md += `| ${f.fieldName} | ${typeof f.value === "object" ? JSON.stringify(f.value) : f.value} | ${(f.confidence * 100).toFixed(0)}% |\n`;
      });
      md += `\n`;
    }

    if (doc.results.NEXT_ACTIONS?.data?.actions) {
      md += `## 4. Next Action Items\n\n`;
      doc.results.NEXT_ACTIONS.data.actions.forEach((a: any) => {
        md += `- [ ] **${a.task}** (Priority: ${a.priority}, Assignee: ${a.assignee}, Deadline: ${a.deadline})\n`;
      });
      md += `\n`;
    }

    return md;
  };

  const generateJSON = () => {
    return JSON.stringify(doc, null, 2);
  };

  const content = format === "markdown" ? generateMarkdown() : generateJSON();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${doc.name.replace(/\.[^/.]+$/, "")}_QelomaLens_Report.${format === "markdown" ? "md" : "json"}`;
    const blob = new Blob([content], {
      type: format === "markdown" ? "text/markdown" : "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-semibold text-white font-display">
              Export Understanding Dossier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format selector */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormat("markdown")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                format === "markdown"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown Report (.md)</span>
            </button>
            <button
              onClick={() => setFormat("json")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                format === "json"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Structured JSON (.json)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Preview content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950">
          <pre className="text-xs font-mono-code text-slate-300 whitespace-pre-wrap leading-relaxed">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
};
