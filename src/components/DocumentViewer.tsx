import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Copy, 
  Check, 
  FileCode, 
  Hash, 
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { InputEnvelope } from '../types';

interface DocumentViewerProps {
  doc: InputEnvelope | null;
  onRunActiveCapability: () => void;
  isRunning: boolean;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  doc,
  onRunActiveCapability,
  isRunning
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!doc) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-950/30 rounded-xl border border-slate-850">
        <FileText className="w-12 h-12 text-slate-700 mb-3 stroke-[1.5]" />
        <p className="text-sm font-medium text-slate-400">No document selected</p>
        <p className="text-xs text-slate-600 mt-1 max-w-xs">
          Select a sample document or upload a file to begin automated AI understanding.
        </p>
      </div>
    );
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(doc.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = doc.text.split('\n');

  // Highlight search term in lines
  const renderLineContent = (line: string) => {
    if (!searchQuery.trim()) return line || ' ';
    const parts = line.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-amber-400/30 text-amber-200 px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div 
      id="document-viewer-container"
      className={`h-full flex flex-col rounded-xl bg-slate-900/90 border border-slate-800/80 overflow-hidden shadow-sm transition-all duration-200 ${
        isExpanded ? 'fixed inset-4 z-50 bg-slate-950 shadow-2xl' : 'relative'
      }`}
    >
      {/* Document Top Bar */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-semibold text-slate-200 truncate max-w-xs sm:max-w-sm" title={doc.name}>
                {doc.name}
              </h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-slate-800 text-indigo-300 border border-slate-700/60">
                {doc.documentType}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
              <span>{doc.wordCount.toLocaleString()} words</span>
              <span>•</span>
              <span>~{doc.pageCountEstimate} page{doc.pageCountEstimate > 1 ? 's' : ''}</span>
              <span>•</span>
              <span>{(doc.sizeBytes / 1024).toFixed(1)} KB</span>
            </div>
          </div>
        </div>

        {/* Toolbar items */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search in text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 w-32 sm:w-44"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Toggle line numbers */}
          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              showLineNumbers 
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' 
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle line numbers"
          >
            <Hash className="w-3.5 h-3.5" />
          </button>

          {/* Copy document text */}
          <button
            onClick={handleCopyText}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Copy full document text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Fullscreen Expand */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title={isExpanded ? 'Minimize' : 'Expand viewer'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Document Text Display */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-slate-950/80 font-mono-code text-xs leading-relaxed text-slate-300 select-text">
        <div className="max-w-4xl mx-auto space-y-1">
          {lines.map((line, idx) => (
            <div key={idx} className="flex items-start hover:bg-slate-900/60 rounded px-1 -mx-1 group">
              {showLineNumbers && (
                <span className="w-8 shrink-0 select-none text-[10px] text-slate-600 font-mono text-right pr-3 pt-0.5 group-hover:text-slate-500">
                  {idx + 1}
                </span>
              )}
              <span className="flex-1 whitespace-pre-wrap break-words">
                {renderLineContent(line)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
