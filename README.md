# DocuMind_AI 

![DocuMind_AI  — The lens that sees beyond the page](assets/cover.svg)

[![License: MIT](https://img.shields.io/badge/license-MIT-C0532E.svg)](./LICENSE) ![Node >= 20](https://img.shields.io/badge/node-%3E%3D20-1A1A1A.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-1A1A1A.svg) ![Python 3.12](https://img.shields.io/badge/Python-3.12-3776AB.svg) ![Agentic AI](https://img.shields.io/badge/Architecture-ReAct_Agent-6366F1.svg)

> **A lightweight Python prototype for agentic document parsing, inspired by TypeScript. Implements a provider-agnostic gateway, ReAct agent loop, deterministic validation, confidence scoring, and historical learning.**

---

## Overview

**DocuMind_AI ** is an enterprise-grade, capability-driven document understanding platform designed according to modern Software Development Life Cycle (SDLC) agentic standards. It ingests complex documents (PDFs, DOCX contracts, receipts, tables, plain text, and scans), normalizes them into a canonical **Input Envelope**, and executes intelligent parsing via an autonomous **ReAct (Reasoning + Acting) Agent Loop** supported by a **Provider-Agnostic LLM Gateway**.

### Key Architectural Pillars

1. **Provider-Agnostic Gateway**: Decouples model inference from orchestration. Seamlessly routes requests across Google Gemini, OpenAI-compatible endpoints, Anthropic, or offline deterministic mock providers.
2. **ReAct Agent Loop (`documind/agent.py`)**: Multi-turn reasoning and tool invocation framework where the agent dynamically inspects schema definitions, extracts raw content, validates structured attributes, checks confidence gates, and consults few-shot historical memory.
3. **Deterministic Rule-Based Fallback**: Built on the "never hard-fail" principle—every analytical capability runs deterministic heuristic regex and pattern-matching parsers whenever external APIs are unreachable or offline.
4. **Confidence Scoring & Human-in-the-Loop Queue**: Real-time confidence calibration. Extracted fields falling below safety thresholds (e.g. `< 0.70`) or failing schema validation are automatically routed into a human review and triage queue.
5. **Historical Learning & Grounding**: In-context knowledge retrieval and few-shot calibration based on verified historical document corrections.

---

## System Architecture & SDLC Specification

```
                          ┌────────────────────────┐
                          │   Document Ingestion   │ (PDF, DOCX, Images, Text)
                          └───────────┬────────────┘
                                      │
                                      ▼
                          ┌────────────────────────┐
                          │     Input Envelope     │ (Canonical Document State)
                          └───────────┬────────────┘
                                      │
                 ┌────────────────────┴────────────────────┐
                 ▼                                         ▼
   ┌───────────────────────────┐             ┌───────────────────────────┐
   │  TypeScript / Express UI  │             │   Python ReAct Agent Core │
   │  • Dual-Pane Workspace    │             │   • ReAct Reasoning Loop  │
   │  • Capability Pipelines   │             │   • Schema Lookup Tool    │
   │  • Grounded Copilot Q&A   │             │   • Validation & Scoring  │
   └─────────────┬─────────────┘             └─────────────┬─────────────┘
                 │                                         │
                 ▼                                         ▼
   ┌─────────────────────────────────────────────────────────────────────┐
   │                     Provider-Agnostic Gateway                       │
   │      (Gemini 3.7 / 2.5 Flash ── OpenAI ── Offline Deterministic)   │
   └──────────────────────────────────┬──────────────────────────────────┘
                                      │
                   ┌──────────────────┴──────────────────┐
                   │                                     │
                   ▼                                     ▼
        [ Confidence >= 0.70 ]                 [ Confidence < 0.70 ]
                   │                                     │
                   ▼                                     ▼
      ┌─────────────────────────┐           ┌─────────────────────────┐
      │   Verified Production   │           │ Human-in-the-Loop Review│
      │    Structured Export    │           │    Triage & Approval    │
      └─────────────────────────┘           └─────────────────────────┘
```

---

## Core Capabilities

- **Executive Summary (`SUMMARIZE`)**: Generates structured executive briefs with TL;DR, core highlights, and critical risk flags.
- **Key Entity & Fact Extraction (`EXTRACT_FACTS`)**: Extracts parties, key dates, monetary values, payment terms, and organizational identifiers.
- **Risk & Compliance Verdict (`VERDICT`)**: Multi-category risk assessment (High / Medium / Low) with specific liability, penalty, and regulatory gap analyses.
- **Clause-by-Clause Breakdown (`BREAKDOWN`)**: Segments documents into operational units with plain-language interpretations.
- **Actionable Next Steps (`NEXT_ACTIONS`)**: Formulates an operational checklist categorized by urgency with assigned stakeholders.
- **Standard Baseline Comparison (`COMPARE`)**: Performs diff and deviation analysis against standard templates or previous revisions.
- **Executive Memo Generator (`GENERATE`)**: Crafts stakeholder-ready executive memoranda and negotiation briefings.
- **Grounded Copilot (`CHAT`)**: Interactive contextual chat assistant citing specific line numbers and extracted clauses.

---

## Project Structure

```
/
├── assets/
│   ├── cover.svg              # Primary high-res repository banner
│   └── brand/                 # Vector marks, icons, and badges
├── documind/                  # Python Agentic ReAct Engine
│   ├── agent.py               # ReAct agent loop (Reasoning & Tool Execution)
│   ├── tools.py               # Schema lookup, parsing, validation, scoring, human review
│   ├── gateway.py             # Provider-agnostic LLM gateway abstraction
│   ├── models.py              # Envelope & Extraction dataclasses
│   └── eval.py                # Quantitative evaluation harness
├── src/                       # TypeScript Web UI & Pipeline Services
│   ├── App.tsx                # Dual-pane reactive workbench
│   ├── components/            # DocumentViewer, CapabilityResults, ReviewQueue, Chat
│   ├── services/api.ts        # Express / Gemini API client
│   └── utils/                 # Deterministic fallback execution engine
├── server.ts                  # Local Express + Vite integration server
├── main.py                    # Python agent evaluation entry point
├── BUILD_AGENT_GUIDE.md       # Comprehensive developer build guide
└── package.json               # Full-stack dependencies & scripts
```

---

## Local Development & Setup

### 1. Web Application (TypeScript / Express)

```bash
# Install dependencies
npm install

# Start local development server (Port 3000)
npm run dev
```

Visit `http://localhost:3000` to access the live dual-pane workspace.

### 2. Python ReAct Agent

```bash
# Optional: test the standalone Python agent loop
python3 main.py
```

### Environment Variables

Copy `.env.example` to `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

*(Note: If `GEMINI_API_KEY` is omitted, the platform automatically activates its deterministic heuristic engine to ensure zero downtime).*

---

## Quality Assurance & Evaluation

The system includes a dedicated evaluation harness (`documind/eval.py`) that tests:
- Field-level Precision and Recall.
- Confidence Score Calibration.
- Human-in-the-Loop routing fidelity.

---

## License

This project is licensed under the [MIT License](./LICENSE).
