# DocuMind_AI  (Agentic Prototype)

> **A lightweight Python prototype for agentic document parsing, inspired by TypeScript. Implements a provider-agnostic gateway, ReAct agent loop, deterministic validation, confidence scoring, and historical learning.**

## Core Components

- `documind/gateway.py` — Provider-agnostic LLM gateway abstraction plus a deterministic mock implementation for offline execution.
- `documind/tools.py` — Tool suite for schema lookup, OCR/text extraction, structured parsing, validation, confidence scoring, knowledge lookups, review queues, and persistence.
- `documind/agent.py` — ReAct runner and pipeline for processing a document end-to-end.
- `documind/eval.py` — Lightweight evaluation utility for measuring field-level extraction accuracy.
- `main.py` — Demo entry point that processes a sample invoice.

## Running the Demo

```bash
python main.py
```

## Design Alignment with SDLC Standards

The system follows the specification goals:
- Provider-agnostic gateway layer
- Tool-based ReAct loop
- High-confidence validation and human review fallback
- Historical and knowledge retrieval for similar fields
- Observability through structured outputs and review queues
- Deterministic local behavior for tests and demos
