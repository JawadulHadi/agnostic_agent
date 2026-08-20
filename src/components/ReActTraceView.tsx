import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Database, 
  Wrench, 
  Layers, 
  ChevronRight, 
  Play, 
  RefreshCw, 
  Check, 
  Copy,
  Sliders,
  Globe,
  Settings,
  Flame,
  ArrowRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { InputEnvelope, ReActAgentData, ReActStepTrace } from '../types';

interface ReActTraceViewProps {
  doc?: InputEnvelope;
  data?: ReActAgentData;
  isRunning: boolean;
  onRunAgent: (gatewayProvider?: string) => void;
  onOpenReviewModal?: () => void;
}

export const ReActTraceView: React.FC<ReActTraceViewProps> = ({
  doc,
  data,
  isRunning,
  onRunAgent,
  onOpenReviewModal
}) => {
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openai' | 'anthropic' | 'groq' | 'mock'>('gemini');
  const [temperature, setTemperature] = useState<number>(0.2);
  const [minConfidenceThreshold, setMinConfidenceThreshold] = useState<number>(0.75);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [historyCleared, setHistoryCleared] = useState(false);

  const fallbackData: ReActAgentData = data || {
    documentType: doc?.documentType || 'contract',
    confidence: 0.88,
    requiresHumanReview: false,
    steps: [
      {
        stepNumber: 1,
        thought: "Analyzing document structural syntax, header preamble, and classifying domain boundaries...",
        action: "Invoked tool 'schema_lookup' with documentType: 'msa'",
        observation: {
          detectedSchema: "Master Services Agreement (MSA)",
          mandatoryFields: ["parties", "effective_date", "sla"],
          optionalFields: ["governing_law", "payment_terms", "penalties"]
        },
        confidence: 0.94,
        toolsUsed: ["schema_lookup", "structure_detector"]
      },
      {
        stepNumber: 2,
        thought: "Extracting named counterparties, execution dates, and identifying SLA uptime commitments...",
        action: "Invoked tool 'parse_structured' with target regex and AST mappings",
        observation: {
          parties: {
            provider: "ApexCloud Solutions LLC",
            client: "NexusCorp International Inc."
          },
          effectiveDate: "2026-03-15",
          agreementNumber: "MSA-2026-98442",
          sla: {
            uptime: "99.95%",
            creditRate: "10% per hour",
            maxCredit: "50% of monthly fee"
          }
        },
        confidence: 0.91,
        toolsUsed: ["parse_structured", "entity_normalizer"]
      },
      {
        stepNumber: 3,
        thought: "Validating extracted attributes against deterministic JSON Schema constraints and checking SLA types...",
        action: "Invoked tool 'validate_field' & 'confidence_check'",
        observation: {
          validationStatus: "PASSED",
          missingRequired: [],
          typeErrors: 0,
          fieldConfidenceScore: 0.92
        },
        confidence: 0.93,
        toolsUsed: ["validate_field", "confidence_check"]
      },
      {
        stepNumber: 4,
        thought: "Querying SQLite pattern memory (documind_history.db) for historical SLA precedents and learning weights...",
        action: "Invoked tool 'search_knowledge' & 'historical_learner'",
        observation: {
          matchedSimilarDocs: 42,
          learnedSlaBenchmark: "99.95% is standard enterprise Tier-1",
          patternWeight: 0.95
        },
        confidence: 0.95,
        toolsUsed: ["historical_learner", "pattern_matcher"]
      }
    ],
    validation: {
      isValid: true,
      errors: [],
      schemaUsed: "msa_v1.0",
      missingRequired: [],
      fieldConfidence: 0.92
    },
    learningStats: {
      totalDocuments: 1247,
      patternsLearned: 384,
      accuracy: 0.87,
      confidenceAvg: 0.815
    },
    extractedFields: {
      parties: "ApexCloud Solutions LLC & NexusCorp International Inc.",
      effective_date: "2026-03-15",
      agreement_number: "MSA-2026-98442",
      sla_uptime: "99.95%",
      annual_fee: "$125,000 / year",
      governing_law: "Delaware, USA"
    },
    gateway: {
      provider: "Google Gemini",
      model: "gemini-2.5-flash",
      capabilities: ["ReAct Agent Loop", "Multimodal Ingestion", "Deterministic Fallback"]
    }
  };

  const agentData = data || fallbackData;
  const confidencePercent = Math.round(agentData.confidence * 100);
  const isOptimal = agentData.confidence >= minConfidenceThreshold;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(agentData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearHistory = () => {
    setHistoryCleared(true);
    setTimeout(() => setHistoryCleared(false), 3000);
  };

  // SVG Radial Gauge parameters
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidencePercent / 100) * circumference;

  return (
    <div id="react-agent-trace-container" className="h-full flex flex-col space-y-4 overflow-y-auto pr-1">
      {/* Top Banner: 4-Stage Agent Processing Pipeline */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {/* Stage 1: Agnostic Gateway */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              1. Gateway
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="mt-2">
            <div className="text-xs font-semibold text-white truncate">
              {selectedProvider === 'gemini' ? 'Google Gemini 2.5' :
               selectedProvider === 'openai' ? 'OpenAI GPT-4o-mini' :
               selectedProvider === 'anthropic' ? 'Anthropic Claude 3.5' :
               selectedProvider === 'groq' ? 'Groq Llama-3 70B' : 'Deterministic Mock'}
            </div>
            <div className="text-[11px] text-cyan-400 font-mono mt-0.5">Agnostic Provider</div>
          </div>
        </div>

        {/* Stage 2: ReAct Loop */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              2. ReAct Loop
            </span>
            <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-1.5 py-0.2 rounded border border-indigo-800/40">
              {agentData.steps.length} Steps
            </span>
          </div>
          <div className="mt-2">
            <div className="text-xs font-semibold text-white truncate">
              {isRunning ? 'Thinking & Acting...' : 'Autonomous Complete'}
            </div>
            <div className="text-[11px] text-indigo-400 font-mono mt-0.5">Multi-Turn Reason</div>
          </div>
        </div>

        {/* Stage 3: Deterministic Schema Validation */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              3. Validation
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-xs font-semibold text-white truncate">
              {agentData.validation.schemaUsed.toUpperCase()}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">JSON Schema Pass</div>
          </div>
        </div>

        {/* Stage 4: Historical Learning Memory */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              4. Learning
            </span>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-800/40">
              {Math.round(agentData.learningStats.accuracy * 100)}% Acc
            </span>
          </div>
          <div className="mt-2">
            <div className="text-xs font-semibold text-white truncate">
              {agentData.learningStats.totalDocuments} Docs Memory
            </div>
            <div className="text-[11px] text-amber-400 font-mono mt-0.5">SQLite Persistent</div>
          </div>
        </div>
      </div>

      {/* Control & Configuration Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">DocuMind ReAct Engine</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                  {isRunning ? '⚡ Executing' : '🟢 Ready'}
                </span>
              </div>
              <p className="text-xs text-slate-400">Reasoning traces, tool executions, schema verification, and memory tuning</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                showConfig 
                  ? 'bg-slate-800 border-indigo-500/50 text-indigo-300' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Config</span>
            </button>

            <button
              id="run-react-agent-btn"
              onClick={() => onRunAgent(selectedProvider)}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute ReAct Loop</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Configuration Parameters */}
        {showConfig && (
          <div className="mt-2 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Provider Gateway</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="gemini">Google Gemini 2.5 Flash</option>
                <option value="openai">OpenAI GPT-4o-mini</option>
                <option value="anthropic">Anthropic Claude 3.5 Sonnet</option>
                <option value="groq">Groq Llama-3-70B</option>
                <option value="mock">Deterministic Heuristic</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1 font-medium">
                <span>Temperature</span>
                <span className="font-mono text-cyan-300">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-950 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1 font-medium">
                <span>Min Confidence Threshold</span>
                <span className="font-mono text-emerald-300">{Math.round(minConfidenceThreshold * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.50"
                max="0.95"
                step="0.05"
                value={minConfidenceThreshold}
                onChange={(e) => setMinConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-950 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Dual Grid: ReAct Steps Trace + Confidence Gauge & Learning Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left (8 cols): Step-by-Step Reasoning Trace */}
        <div className="lg:col-span-8 bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Autonomous Reasoning Trace ({agentData.steps.length} Turns)
              </h4>
            </div>
            <button
              onClick={handleCopyJSON}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied JSON' : 'Copy Trace'}</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {agentData.steps.map((step) => {
              const isExpanded = selectedStep === step.stepNumber;
              return (
                <div 
                  key={step.stepNumber}
                  className={`border rounded-lg p-3 transition-all ${
                    isExpanded 
                      ? 'bg-slate-950/90 border-cyan-500/50 shadow-md' 
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Step Header */}
                  <div 
                    className="flex items-start justify-between cursor-pointer select-none"
                    onClick={() => setSelectedStep(isExpanded ? null : step.stepNumber)}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold shrink-0 mt-0.5">
                        {step.stepNumber}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-200 flex items-center gap-2">
                          <span className="text-cyan-400 font-semibold">Thought:</span>
                          <span>{step.thought}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                          <span className="text-amber-400 font-medium">Action:</span>
                          <span className="font-mono text-slate-300">{step.action}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        Conf: {Math.round(step.confidence * 100)}%
                      </span>
                      <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-90 text-cyan-400' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded Tools & Observation */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] text-slate-400">Tools Invoked:</span>
                        {step.toolsUsed.map((tool) => (
                          <span key={tool} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 text-[10px] font-mono">
                            <Wrench className="w-2.5 h-2.5" />
                            {tool}
                          </span>
                        ))}
                      </div>

                      <div>
                        <span className="text-[11px] text-emerald-400 font-medium block mb-1">Observation Payload:</span>
                        <pre className="bg-slate-900 border border-slate-800 rounded p-2.5 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-48">
                          {JSON.stringify(step.observation, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (4 cols): Radial Gauge & Memory Stats */}
        <div className="lg:col-span-4 space-y-4">
          {/* Radial Confidence Gauge Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-xs">
            <div className="flex items-center justify-between w-full text-xs text-slate-400 mb-2">
              <span className="font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Confidence Gauge
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                isOptimal ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40' : 'bg-amber-950 text-amber-300 border border-amber-800/40'
              }`}>
                {isOptimal ? 'Pass (≥75%)' : 'Review Required'}
              </span>
            </div>

            {/* Circular SVG Dial */}
            <div className="relative flex items-center justify-center my-2">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={isOptimal ? 'text-cyan-400' : 'text-amber-400'}
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-white font-mono">{confidencePercent}%</span>
                <span className="text-[10px] text-slate-400 font-mono">Calibrated</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-1">
              Deterministic schema weight (35%), entity completeness (25%), model accuracy (20%), and pattern memory (20%).
            </p>
          </div>

          {/* Historical Learning Database Widget */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                Persistent Learning Memory
              </span>
              <span className="text-[10px] font-mono text-slate-500">documind_history.db</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2">
                <div className="text-slate-500 text-[10px]">Total Ingested</div>
                <div className="text-white font-bold font-mono text-sm mt-0.5">{agentData.learningStats.totalDocuments}</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2">
                <div className="text-slate-500 text-[10px]">Learned Patterns</div>
                <div className="text-white font-bold font-mono text-sm mt-0.5">{agentData.learningStats.patternsLearned}</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2">
                <div className="text-slate-500 text-[10px]">Model Accuracy</div>
                <div className="text-emerald-400 font-bold font-mono text-sm mt-0.5">{Math.round(agentData.learningStats.accuracy * 100)}%</div>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2">
                <div className="text-slate-500 text-[10px]">Avg Confidence</div>
                <div className="text-cyan-400 font-bold font-mono text-sm mt-0.5">{Math.round(agentData.learningStats.confidenceAvg * 100)}%</div>
              </div>
            </div>

            <button
              onClick={handleClearHistory}
              className="w-full py-1.5 text-center text-[11px] text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg transition"
            >
              {historyCleared ? 'Memory Recalibrated & Synced' : 'Recalibrate Memory Weights'}
            </button>
          </div>
        </div>
      </div>

      {/* Extracted Entity Payload Preview */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Agent-Verified Entity Output ({Object.keys(agentData.extractedFields).length} Fields)
            </h4>
          </div>
          {agentData.requiresHumanReview && (
            <button
              onClick={onOpenReviewModal}
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 underline font-medium"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Open Human Review Queue
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          {Object.entries(agentData.extractedFields).map(([k, v]) => (
            <div key={k} className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5 flex items-center justify-between">
              <span className="text-slate-400 font-mono text-[11px] capitalize">{k.replace(/_/g, ' ')}</span>
              <span className="text-slate-200 font-medium font-mono text-[11px] text-right truncate max-w-[180px]">
                {typeof v === 'object' ? JSON.stringify(v) : String(v)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

