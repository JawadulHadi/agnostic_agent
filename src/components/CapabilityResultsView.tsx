import React, { useState } from 'react';
import { 
  CapabilityId, 
  CapabilityResult, 
  InputEnvelope, 
  ExtractedField 
} from '../types';
import { ReActTraceView } from './ReActTraceView';
import { 
  FileText, 
  KeyRound, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  Sparkles, 
  RotateCw, 
  ArrowRight,
  TrendingUp,
  Award,
  ListTodo,
  FileCheck2,
  Share2,
  HelpCircle
} from 'lucide-react';

interface CapabilityResultsViewProps {
  activeCapability: CapabilityId;
  doc: InputEnvelope;
  result?: CapabilityResult;
  isRunning: boolean;
  onRunCapability: (customPrompt?: string) => void;
  onOpenReviewItem: (field: ExtractedField) => void;
}

export const CapabilityResultsView: React.FC<CapabilityResultsViewProps> = ({
  activeCapability,
  doc,
  result,
  isRunning,
  onRunCapability,
  onOpenReviewItem
}) => {
  const [copied, setCopied] = useState(false);
  const [generatePreset, setGeneratePreset] = useState('Executive Memo');

  const handleCopyResult = () => {
    if (!result?.data) return;
    navigator.clipboard.writeText(JSON.stringify(result.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dedicated ReAct Agent View
  if (activeCapability === 'REACT_AGENT') {
    return (
      <div id="react-agent-panel" className="h-full rounded-xl bg-slate-900/90 border border-slate-800 p-4 overflow-hidden">
        <ReActTraceView
          doc={doc}
          data={result?.data}
          isRunning={isRunning}
          onRunAgent={(provider) => onRunCapability(provider)}
        />
      </div>
    );
  }

  if (isRunning) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 mb-4 animate-pulse">
          <Sparkles className="w-8 h-8 text-indigo-400 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <h3 className="text-base font-semibold text-slate-200 font-display">
          Running {activeCapability.replace('_', ' ')} Pipeline...
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
          Ingesting text representations, running capability verifiers, and generating structured intelligence.
        </p>
      </div>
    );
  }

  if (!result || !result.data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800">
        <div className="p-3 rounded-xl bg-slate-800/80 text-indigo-400 mb-3 border border-slate-700">
          <Sparkles className="w-7 h-7" />
        </div>
        <h3 className="text-sm font-semibold text-slate-200 font-display">
          Ready to Execute {activeCapability.replace('_', ' ')}
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs mb-4 leading-relaxed">
          Extract structured insights, calculate risk confidence metrics, and audit document clauses.
        </p>
        <button
          id="run-capability-btn"
          onClick={() => onRunCapability()}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Execute Capability Now</span>
        </button>
      </div>
    );
  }

  const { data, provider, executionTimeMs, confidence } = result;

  return (
    <div id="capability-results-panel" className="h-full flex flex-col rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden">
      {/* Execution Meta Bar */}
      <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            <span>{(confidence * 100).toFixed(0)}% Confidence</span>
          </span>
          <span className="text-slate-400 text-[11px]">
            via <strong className="text-slate-300 capitalize">{provider}</strong> ({executionTimeMs}ms)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyResult}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 px-2 border border-slate-800"
            title="Copy structured JSON data"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span className="text-[11px]">{copied ? 'Copied' : 'JSON'}</span>
          </button>
          <button
            onClick={() => onRunCapability()}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 px-2 border border-slate-800"
            title="Re-run capability"
          >
            <RotateCw className="w-3 h-3" />
            <span className="text-[11px]">Re-run</span>
          </button>
        </div>
      </div>

      {/* Result Container */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-5">
        {/* SUMMARIZE VIEW */}
        {activeCapability === 'SUMMARIZE' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                  Executive Brief
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {data.readingTimeMinutes || 2} min read
                </span>
              </div>
              <h2 className="text-base font-semibold text-white font-display">
                {data.title || doc.name}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {data.executiveSummary}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {data.tone && (
                  <span className="px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-800 text-slate-300">
                    Tone: <strong>{data.tone}</strong>
                  </span>
                )}
                {data.targetAudience && (
                  <span className="px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-800 text-slate-300">
                    Audience: <strong>{data.targetAudience}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Key Strategic Takeaways
              </h3>
              <div className="space-y-2">
                {(data.keyPoints || []).map((point: string, idx: number) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 text-[10px] font-bold border border-indigo-500/20">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EXTRACT_FACTS VIEW */}
        {activeCapability === 'EXTRACT_FACTS' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Extracted Metadata & Entities</h3>
                <p className="text-xs text-slate-400">Structured field extraction with confidence scores & verification gates.</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 font-medium">
                {data.fields?.length || 0} fields identified
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-medium">
                    <th className="py-2.5 px-3">Field Name</th>
                    <th className="py-2.5 px-3">Extracted Value</th>
                    <th className="py-2.5 px-3 w-28">Confidence</th>
                    <th className="py-2.5 px-3 w-24 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {(data.fields || []).map((field: ExtractedField, idx: number) => {
                    const isLow = field.confidence < 0.85;
                    return (
                      <tr key={idx} className="hover:bg-slate-900/50 transition-colors group">
                        <td className="py-2.5 px-3 font-medium text-slate-200">
                          {field.fieldName}
                        </td>
                        <td className="py-2.5 px-3 text-indigo-200 font-mono-code break-words">
                          {typeof field.value === 'object' ? JSON.stringify(field.value) : String(field.value)}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${isLow ? 'bg-amber-400' : 'bg-emerald-400'}`}
                                style={{ width: `${(field.confidence * 100)}%` }}
                              />
                            </div>
                            <span className={`text-[10px] font-mono ${isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                              {(field.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {isLow ? (
                            <button
                              onClick={() => onOpenReviewItem(field)}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors inline-flex items-center gap-1"
                            >
                              <AlertTriangle className="w-2.5 h-2.5" />
                              <span>Verify</span>
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Valid</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VERDICT VIEW */}
        {activeCapability === 'VERDICT' && (
          <div className="space-y-4">
            {/* Risk Gauge Header Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Compliance & Risk Audit
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <h2 className="text-lg font-bold text-white font-display">
                      Verdict: {data.verdict?.replace(/_/g, ' ')}
                    </h2>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold font-mono ${
                    data.riskScore > 50 ? 'text-rose-400' : data.riskScore > 25 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {data.riskScore}
                  </span>
                  <span className="text-slate-500 text-xs font-mono"> / 100</span>
                  <p className="text-[10px] text-slate-400">{data.riskLevel}</p>
                </div>
              </div>

              {/* Progress meter */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    data.riskScore > 50 ? 'bg-rose-500' : data.riskScore > 25 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.max(5, data.riskScore)}%` }}
                />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {data.summaryVerdict}
              </p>
            </div>

            {/* Flagged Clauses & Red Flags */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Flagged Clauses & Issues ({(data.flags || []).length})</span>
                <span className="text-[11px] text-amber-400">{data.criticalIssuesCount || 0} Priority Items</span>
              </h3>

              <div className="space-y-2.5">
                {(data.flags || []).map((flag: any, idx: number) => {
                  const isHigh = flag.severity === 'critical' || flag.severity === 'high';
                  return (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isHigh 
                          ? 'bg-rose-950/20 border-rose-800/40 text-rose-200' 
                          : 'bg-slate-950 border-slate-800/80 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            isHigh 
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {flag.severity}
                          </span>
                          <h4 className="text-xs font-semibold text-white">{flag.title}</h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-2">
                        {flag.description}
                      </p>

                      {flag.clause && (
                        <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] font-mono-code text-slate-400 mb-2 italic">
                          "{flag.clause}"
                        </div>
                      )}

                      <div className="flex items-start gap-1.5 text-[11px] text-indigo-300 font-medium">
                        <Award className="w-3.5 h-3.5 shrink-0 mt-0.5 text-indigo-400" />
                        <span>Action: {flag.recommendation}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* BREAKDOWN VIEW */}
        {activeCapability === 'BREAKDOWN' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Section-by-Section Structure</h3>
              <span className="text-xs text-slate-400">{data.totalSections || 0} Sections Analyzed</span>
            </div>

            <div className="space-y-2">
              {(data.sections || []).map((sec: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-200">{sec.title}</h4>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-mono ${
                      sec.risk === 'high' ? 'bg-rose-500/20 text-rose-300' : sec.risk === 'medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {sec.risk || 'standard'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {sec.keySummary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEXT_ACTIONS VIEW */}
        {activeCapability === 'NEXT_ACTIONS' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Operational Action Items</h3>
                <p className="text-xs text-slate-400">Extracted obligations, filings, and milestone tasks.</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300">
                {data.actions?.length || 0} Tasks
              </span>
            </div>

            <div className="space-y-2">
              {(data.actions || []).map((act: any, idx: number) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <p className="text-xs text-slate-200 font-medium leading-relaxed">{act.task}</p>
                      <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 mt-1.5">
                        <span>Assignee: <strong className="text-slate-400">{act.assignee}</strong></span>
                        <span>•</span>
                        <span>Deadline: <strong className="text-indigo-400">{act.deadline}</strong></span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    act.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {act.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMPARE VIEW */}
        {activeCapability === 'COMPARE' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {data.comparisonTitle || 'Market Baseline Diff'}
                </h3>
                <span className="text-xs font-mono text-emerald-400">
                  {data.alignmentScore || 85}% Standard Alignment
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Discrepancies detected between this document and standard industry counterpart norms.
              </p>
            </div>

            <div className="space-y-2.5">
              {(data.discrepancies || []).map((disc: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-semibold text-indigo-300">{disc.clause}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase block">Standard Baseline</span>
                      <p className="text-slate-300 text-[11px] mt-0.5">{disc.standardTerms}</p>
                    </div>
                    <div className="p-2 rounded bg-indigo-950/30 border border-indigo-900/50">
                      <span className="text-[10px] font-semibold text-indigo-400 uppercase block">This Document</span>
                      <p className="text-indigo-200 text-[11px] mt-0.5">{disc.documentTerms}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-300/90 font-medium">Impact: {disc.impact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GENERATE VIEW */}
        {activeCapability === 'GENERATE' && (
          <div className="space-y-4">
            {/* Custom generation prompt controls */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Template:</span>
                {['Executive Memo', 'Amendment Clause', 'Counter-Proposal Letter'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setGeneratePreset(preset);
                      onRunCapability(preset);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      generatePreset === preset
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono-code text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
              {data.executiveMemo || 'No memo content generated.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
