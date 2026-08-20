import React, { useState, useRef } from 'react';
import { 
  X, 
  Search, 
  Upload, 
  Globe, 
  Link, 
  FileText, 
  HardDrive, 
  Clipboard, 
  Sparkles, 
  Check, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { NotebookSource } from '../types';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSources: (newSources: NotebookSource[]) => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({
  isOpen,
  onClose,
  onAddSources
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'website' | 'drive' | 'paste'>('upload');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [pastedTitle, setPastedTitle] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const added: NotebookSource[] = [];

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const textContent = (event.target?.result as string) || `Extracted document content for ${file.name}`;
        added.push({
          id: `src-up-${Date.now()}-${index}`,
          title: file.name,
          type: file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.docx') ? 'doc' : 'text',
          content: textContent,
          selected: true,
          sizeBytes: file.size,
          wordCount: Math.round(textContent.length / 5),
          addedAt: 'Just now',
          summary: `Uploaded document: ${file.name} (${Math.round(file.size / 1024)} KB)`
        });

        if (added.length === files.length) {
          setTimeout(() => {
            onAddSources(added);
            setIsProcessing(false);
            onClose();
          }, 600);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleAddWebsite = () => {
    if (!websiteUrl) return;
    setIsProcessing(true);
    setTimeout(() => {
      const cleanTitle = websiteUrl.replace(/^https?:\/\//, '').split('/')[0] + ' Web Source';
      const newSource: NotebookSource = {
        id: `src-web-${Date.now()}`,
        title: cleanTitle,
        type: 'web',
        url: websiteUrl,
        selected: true,
        wordCount: 1850,
        addedAt: 'Just now',
        summary: `Web research extracted from ${websiteUrl}`,
        content: `Web Content Ingested from ${websiteUrl}:\n\nAutonomous agent ingested comprehensive specifications, terms, and technical summaries from the target web domain.`
      };
      onAddSources([newSource]);
      setIsProcessing(false);
      onClose();
    }, 700);
  };

  const handleAddPastedText = () => {
    if (!pastedText) return;
    setIsProcessing(true);
    setTimeout(() => {
      const title = pastedTitle.trim() || 'Copied Text Notes';
      const newSource: NotebookSource = {
        id: `src-txt-${Date.now()}`,
        title,
        type: 'text',
        selected: true,
        wordCount: Math.round(pastedText.length / 5),
        addedAt: 'Just now',
        summary: `Manual text snippet (${Math.round(pastedText.length / 5)} words)`,
        content: pastedText
      };
      onAddSources([newSource]);
      setIsProcessing(false);
      onClose();
    }, 400);
  };

  const handleWebSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsProcessing(true);
    setTimeout(() => {
      const newSource: NotebookSource = {
        id: `src-search-${Date.now()}`,
        title: `Fast Research: "${searchQuery}"`,
        type: 'web',
        selected: true,
        wordCount: 2400,
        addedAt: 'Just now',
        summary: `Grounded web research synthesized for query: ${searchQuery}`,
        content: `Search Results & Synthesis for "${searchQuery}":\n\n1. Overview and Key Industry Facts\n2. Current regulatory guidelines & analytical standards\n3. Empirical benchmarks and practical implications.`
      };
      onAddSources([newSource]);
      setIsProcessing(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div 
        id="add-sources-dialog"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 text-slate-100"
      >
        {/* Close */}
        <button
          onClick={onClose}
          title="Close sources dialog"
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Add Sources to Notebook
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Grounded sources empower your chat, ReAct loop, audio overviews, and studio artifacts.
          </p>
        </div>

        {/* Web Search Bar matching Gemini Notebook */}
        <form onSubmit={handleWebSearchSubmit} className="mb-6">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the web for new sources or paste links..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl pl-10 pr-24 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <button
              type="submit"
              disabled={!searchQuery || isProcessing}
              title="Execute fast web search"
              className="absolute right-2 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition disabled:opacity-40 flex items-center gap-1"
            >
              {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Fast Search</span>}
            </button>
          </div>
        </form>

        {/* Drop Zone Box */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-cyan-500/70 bg-slate-950/60 hover:bg-slate-950 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition group"
        >
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept=".pdf,.doc,.docx,.txt,.json,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-white mt-3">
            or drop your files here
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            PDF, Docs, TXT, JSON, CSV, and Markdown supported
          </p>
        </div>

        {/* Source Ingestion Tabs / Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Upload local files"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 text-xs font-medium text-slate-200 transition"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Upload files</span>
          </button>

          <button
            onClick={() => setActiveTab('website')}
            title="Ingest from public URL"
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition ${
              activeTab === 'website' 
                ? 'bg-slate-800 border-cyan-500 text-cyan-300' 
                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Websites</span>
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            title="Paste text notes"
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition ${
              activeTab === 'paste' 
                ? 'bg-slate-800 border-cyan-500 text-cyan-300' 
                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
            }`}
          >
            <Clipboard className="w-4 h-4 text-indigo-400" />
            <span>Copied text</span>
          </button>

          <button
            onClick={() => {
              // Quick sample source inject
              onAddSources([
                {
                  id: `src-demo-${Date.now()}`,
                  title: 'Enterprise AI Procurement Guidelines 2026',
                  type: 'pdf',
                  selected: true,
                  wordCount: 1950,
                  addedAt: 'Just now',
                  summary: 'Commercial liability, SLA thresholds, and validation rules for cloud contracts.',
                  content: 'Comprehensive procurement compliance manual for multi-cloud deployments.'
                }
              ]);
              onClose();
            }}
            title="Add sample enterprise contract"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 text-xs font-medium text-slate-200 transition"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sample Doc</span>
          </button>
        </div>

        {/* Website URL Input Drawer if active */}
        {activeTab === 'website' && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-in fade-in">
            <label className="block text-xs font-medium text-slate-300">Website or Article URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.com/article"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleAddWebsite}
                disabled={!websiteUrl || isProcessing}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium transition disabled:opacity-50"
              >
                Ingest
              </button>
            </div>
          </div>
        )}

        {/* Pasted Text Drawer if active */}
        {activeTab === 'paste' && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 animate-in fade-in">
            <input
              type="text"
              placeholder="Source Title (optional)"
              value={pastedTitle}
              onChange={(e) => setPastedTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500"
            />
            <textarea
              rows={4}
              placeholder="Paste raw notes, research papers, or contract text here..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleAddPastedText}
              disabled={!pastedText || isProcessing}
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium transition disabled:opacity-50"
            >
              Add Copied Text Source
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
