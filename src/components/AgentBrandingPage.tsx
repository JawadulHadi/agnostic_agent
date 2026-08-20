import React, { useState } from 'react';
import { 
  Bot, 
  BrainCircuit, 
  Sparkles, 
  ShieldCheck, 
  Database, 
  Zap, 
  ArrowRight, 
  Play, 
  Code2, 
  Cpu, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  FileText,
  Workflow,
  Radio,
  BookOpen
} from 'lucide-react';
import { ThemeMode } from '../types';

interface AgentBrandingPageProps {
  onEnterWorkspace: () => void;
  onOpenAuth: () => void;
  currentTheme: ThemeMode;
}

export const AgentBrandingPage: React.FC<AgentBrandingPageProps> = ({
  onEnterWorkspace,
  onOpenAuth,
  currentTheme
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'react_loop' | 'gateways' | 'benchmarks'>('react_loop');
  const [testPrompt, setTestPrompt] = useState('Extract SLA uptime, credit penalties, and payment terms from MSA contract');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedSteps, setSimulatedSteps] = useState<any[]>([
    {
      step: 1,
      thought: 'Classifying document taxonomy and locating contractual indemnity & SLA clauses...',
      action: 'Invoked tool: schema_lookup(type="msa")',
      observation: 'Detected Master Services Agreement schema (v1.0.4)',
      confidence: 0.94
    },
    {
      step: 2,
      thought: 'Extracting SLA uptime guarantee (99.95%) and net-30 billing cycle...',
      action: 'Invoked tool: parse_structured(entities=["parties", "sla", "penalty"])',
      observation: 'Entities resolved: ApexCloud (Provider), NexusCorp (Client), 99.95% SLA',
      confidence: 0.92
    },
    {
      step: 3,
      thought: 'Deterministic JSON Schema AST verification check...',
      action: 'Invoked tool: validate_field(schema="msa_strict")',
      observation: 'Zero schema errors. Confidence gate ≥75% satisfied (94.2% calibrated)',
      confidence: 0.96
    }
  ]);

  const handleRunSimulatedPulse = () => {
    setIsSimulating(true);
    setSimulatedSteps([]);
    setTimeout(() => {
      setSimulatedSteps([
        {
          step: 1,
          thought: `Analyzing input: "${testPrompt.slice(0, 45)}..."`,
          action: 'Invoked tool: router_gateway(model="gemini-2.5-flash")',
          observation: 'Context length 1,420 tokens. Domain identified: Legal & Commercial',
          confidence: 0.95
        }
      ]);
      setTimeout(() => {
        setSimulatedSteps(prev => [
          ...prev,
          {
            step: 2,
            thought: 'Extracting structured key-value entities and calculating confidence weights...',
            action: 'Invoked tool: react_extractor(mode="autonomous_loop")',
            observation: 'Parsed 6 mandatory fields with 0 validation violations.',
            confidence: 0.93
          }
        ]);
        setTimeout(() => {
          setSimulatedSteps(prev => [
            ...prev,
            {
              step: 3,
              thought: 'Syncing confidence score to SQLite pattern memory (documind_history.db)...',
              action: 'Invoked tool: memory_sync(db="documind_history.db")',
              observation: 'Historical accuracy recalibrated to 87.4% across 1,248 documents.',
              confidence: 0.98
            }
          ]);
          setIsSimulating(false);
        }, 600);
      }, 600);
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] overflow-y-auto px-4 py-8 sm:px-8 max-w-7xl mx-auto flex flex-col space-y-12">
      {/* Hero Section with High-Tech Glow */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-black shadow-2xl text-center flex flex-col items-center">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-20 right-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Tech Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-mono font-medium mb-6 shadow-sm">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>DOCUMIND AGENTIC CORE • MULTI-GATEWAY v1.0</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          Next-Generation{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
            ReAct Document Intelligence
          </span>{' '}
          in a Notebook Workspace
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          DocuMind AI combines multi-turn autonomous reasoning, provider-agnostic LLM gateways, deterministic JSON Schema validation, and persistent memory into a streamlined NotebookLM-style workspace.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onEnterWorkspace}
            title="Launch the 3-column NotebookLM interactive workbench"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Notebook Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAuth}
            title="Sign in with Magic Link or 1-Click Fast Pass"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-sm font-medium transition cursor-pointer"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Sign In / 1-Click Pass</span>
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl pt-8 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 text-center">
            <div className="text-2xl font-bold font-mono text-cyan-400">99.95%</div>
            <div className="text-[11px] text-slate-400 mt-1">Schema Compliance</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 text-center">
            <div className="text-2xl font-bold font-mono text-indigo-400">&lt; 420ms</div>
            <div className="text-[11px] text-slate-400 mt-1">ReAct Loop Latency</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 text-center">
            <div className="text-2xl font-bold font-mono text-emerald-400">1,247+</div>
            <div className="text-[11px] text-slate-400 mt-1">Ingested Documents</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 text-center">
            <div className="text-2xl font-bold font-mono text-purple-400">4 Gateways</div>
            <div className="text-[11px] text-slate-400 mt-1">Gemini • OpenAI • Claude • Groq</div>
          </div>
        </div>
      </div>

      {/* Interactive ReAct Engine Playground Showcase */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">Live ReAct Autonomous Loop Showcase</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Observe multi-turn Thought $\rightarrow$ Action $\rightarrow$ Observation execution</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunSimulatedPulse}
              disabled={isSimulating}
              title="Trigger a live ReAct reasoning cycle"
              className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-sm transition disabled:opacity-50"
            >
              {isSimulating ? <Zap className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Reasoning...' : 'Test Reason Pulse'}</span>
            </button>
          </div>
        </div>

        {/* Input prompt sandbox */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            placeholder="Type a contract or document understanding task..."
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
          />
        </div>

        {/* Simulated Steps Visualizer */}
        <div className="space-y-3">
          {simulatedSteps.map((s, idx) => (
            <div 
              key={idx}
              className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-4 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-semibold text-cyan-400 font-mono">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center justify-center text-[10px]">
                    {s.step}
                  </span>
                  Thought Stream
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  Confidence: {Math.round(s.confidence * 100)}%
                </span>
              </div>
              <p className="text-xs text-slate-300 pl-7">{s.thought}</p>
              
              <div className="pl-7 pt-1 flex flex-col gap-1 text-[11px]">
                <div className="text-amber-400 font-mono flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  <span>{s.action}</span>
                </div>
                <div className="text-slate-400 font-mono bg-slate-900/80 p-2 rounded border border-slate-800/60 mt-1">
                  {s.observation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Architectural Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-cyan-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Provider Agnostic</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Switch seamlessly between Google Gemini 2.5, OpenAI GPT-4o, Anthropic Claude 3.5, and Groq with unified fallback heuristics.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-indigo-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Workflow className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Autonomous ReAct Loop</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-turn tool orchestration invoking schema lookups, structure detectors, normalizers, and regex AST fallback parsers.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-emerald-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Deterministic Guardrails</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            JSON Schema validators prevent AI hallucinations, automatically flagging extractions below the 75% confidence gate for human review.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-amber-500/40 transition">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Historical Memory</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Embedded SQLite memory (<span className="font-mono text-[11px] text-amber-300">documind_history.db</span>) retains document patterns and continuously improves accuracy.
          </p>
        </div>
      </div>
    </div>
  );
};
