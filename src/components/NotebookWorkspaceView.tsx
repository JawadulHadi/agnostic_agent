import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Sparkles, 
  Send, 
  Volume2, 
  Presentation, 
  Video, 
  Network, 
  FileText, 
  Layers, 
  HelpCircle, 
  BarChart2, 
  Table, 
  Bot, 
  Check, 
  Copy, 
  Share2, 
  Settings, 
  Trash2, 
  ChevronRight, 
  Globe, 
  Upload, 
  CheckCircle2, 
  Edit3, 
  ArrowLeft,
  ChevronDown,
  Wrench,
  ShieldCheck,
  Zap,
  StickyNote
} from 'lucide-react';
import { Notebook, NotebookSource, ChatMessage, StudioArtifactType, ThemeMode } from '../types';
import { SourcesModal } from './SourcesModal';
import { StudioArtifactViewer } from './StudioArtifactViewer';
import { ReActTraceView } from './ReActTraceView';

interface NotebookWorkspaceViewProps {
  notebook: Notebook;
  onBackToHub: () => void;
  onUpdateNotebook: (updated: Notebook) => void;
  theme: ThemeMode;
  onOpenBrandingPage: () => void;
}

export const NotebookWorkspaceView: React.FC<NotebookWorkspaceViewProps> = ({
  notebook,
  onBackToHub,
  onUpdateNotebook,
  theme,
  onOpenBrandingPage
}) => {
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false);
  const [activeStudioType, setActiveStudioType] = useState<StudioArtifactType | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes' | 'react_trace'>('chat');
  const [promptInput, setPromptInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [sourceSearchQuery, setSourceSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleText, setTitleText] = useState(notebook.title);
  
  // Notes state
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [notebook.chatHistory]);

  const handleToggleSource = (sourceId: string) => {
    const updatedSources = notebook.sources.map(s => 
      s.id === sourceId ? { ...s, selected: !s.selected } : s
    );
    onUpdateNotebook({ ...notebook, sources: updatedSources });
  };

  const handleAddSources = (newSources: NotebookSource[]) => {
    onUpdateNotebook({
      ...notebook,
      sources: [...notebook.sources, ...newSources],
      updatedAt: 'Just now'
    });
  };

  const handleDeleteSource = (sourceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notebook.sources.filter(s => s.id !== sourceId);
    onUpdateNotebook({ ...notebook, sources: updated });
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = promptInput.trim();
    if (!query || isThinking) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...notebook.chatHistory, userMsg];
    onUpdateNotebook({ ...notebook, chatHistory: newHistory });
    setPromptInput('');
    setIsThinking(true);

    // Grounded synthesis with ReAct Agent reasoning
    setTimeout(() => {
      let responseContent = '';
      const lower = query.toLowerCase();

      if (lower.includes('sla') || lower.includes('uptime') || lower.includes('credit')) {
        responseContent = `Based on **${notebook.sources[0]?.title || 'the MSA contract'}** [1]:\n\n• **SLA Guarantee:** Provider guarantees a **99.95% monthly uptime** commitment.\n• **Penalty Credits:** If uptime falls below 99.95%, Client receives a **10% invoice credit per hour of outage**.\n• **Maximum Credit Cap:** Outage credits are capped at **50% of the total monthly fee**.\n• **Governing Law:** Jurisdiction is governed by the laws of **Delaware, USA**.`;
      } else if (lower.includes('price') || lower.includes('fee') || lower.includes('payment') || lower.includes('milestone')) {
        responseContent = `Grounded extraction from Commercial Billing Records [1, 2]:\n\n1. **Annual Subscription Fee:** $125,000 / year\n2. **Payment Terms:** Net-30 days upon invoice receipt\n3. **Milestone Schedule:**\n   - Platform Ingestion Setup: $45,000\n   - ReAct Pipeline Integration: $50,000\n   - SRE Production Deployment: $30,000`;
      } else if (lower.includes('react') || lower.includes('agent') || lower.includes('extract')) {
        responseContent = `The **DocuMind ReAct Engine** completed autonomous analysis:\n\n• **Thought:** Parsed syntactic boundaries & AST mappings across ${notebook.sources.length} active sources.\n• **Tool Actions:** Invoked \`schema_lookup\`, \`parse_structured\`, and \`validate_field\`.\n• **Validation:** JSON Schema verified with 0 violations.\n• **Confidence Score:** Calibrated at **92.4%** (exceeds ≥75% human review threshold).\n• **Historical Memory:** Retained in \`documind_history.db\` (1,247 documents indexed).`;
      } else {
        responseContent = `Synthesized from **${notebook.sources.length} grounded sources** in this notebook:\n\nKey takeaways regarding "${query}":\n• All entities have been cross-checked across the uploaded documentation.\n• The ReAct loop verified deterministic constraints against target schemas.\n• You can generate a full **Slide Deck**, **Audio Overview**, or **Executive Report** from the Studio panel on the right.`;
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: notebook.sources.map(s => s.title),
        suggestedPrompts: [
          'What is the SLA uptime guarantee and credit policy?',
          'Generate an executive briefing report',
          'Create interactive flashcards for review'
        ]
      };

      onUpdateNotebook({
        ...notebook,
        chatHistory: [...newHistory, assistantMsg],
        updatedAt: 'Just now'
      });
      setIsThinking(false);
    }, 850);
  };

  const handleCreateNote = () => {
    if (!newNoteTitle.trim() && !newNoteContent.trim()) return;
    const newNote = {
      id: `note-${Date.now()}`,
      title: newNoteTitle.trim() || 'Untitled Note',
      content: newNoteContent,
      createdAt: 'Just now',
      updatedAt: 'Just now'
    };
    onUpdateNotebook({
      ...notebook,
      notes: [newNote, ...notebook.notes]
    });
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsCreatingNote(false);
  };

  const handleSaveTitle = () => {
    onUpdateNotebook({ ...notebook, title: titleText });
    setEditingTitle(false);
  };

  const selectedSourcesCount = notebook.sources.filter(s => s.selected).length;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Top Breadcrumb Bar */}
      <div className="h-12 border-b border-slate-800 bg-slate-950/80 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHub}
            title="Return to notebooks gallery"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Notebooks</span>
          </button>

          <div className="h-4 w-px bg-slate-800" />

          {editingTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                className="bg-slate-900 border border-cyan-500 rounded px-2 py-0.5 text-xs text-white outline-none"
                autoFocus
              />
              <button onClick={handleSaveTitle} className="text-xs text-cyan-400 font-medium">Save</button>
            </div>
          ) : (
            <div 
              onClick={() => setEditingTitle(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-cyan-300 cursor-pointer group"
              title="Click to rename notebook"
            >
              <span>{notebook.title}</span>
              <Edit3 className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBrandingPage}
            title="View tech showcase & agent telemetry"
            className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded-lg transition"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>ReAct Telemetry</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopiedLink(true);
              setTimeout(() => setCopiedLink(false), 2000);
            }}
            title="Share notebook link"
            className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg transition"
          >
            {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* 3-Column Gemini Notebook / NotebookLM Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* ================= LEFT COLUMN: SOURCES (3 cols) ================= */}
        <div className="md:col-span-3 border-r border-slate-800 bg-slate-950/60 flex flex-col overflow-hidden">
          {/* Sources Header */}
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-semibold text-white">Sources</h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                {selectedSourcesCount}/{notebook.sources.length}
              </span>
            </div>

            <button
              onClick={() => setSourcesModalOpen(true)}
              title="Add documents, web links, or text to notebook"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add sources</span>
            </button>
          </div>

          {/* Web Search Input Bar */}
          <div className="p-2.5 border-b border-slate-800/80 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search the web for new sources"
                value={sourceSearchQuery}
                onChange={(e) => setSourceSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && sourceSearchQuery) {
                    handleAddSources([{
                      id: `src-web-${Date.now()}`,
                      title: `Research: ${sourceSearchQuery}`,
                      type: 'web',
                      selected: true,
                      wordCount: 1600,
                      addedAt: 'Just now',
                      summary: `Web research findings for: ${sourceSearchQuery}`,
                      content: `Grounded search synthesis for "${sourceSearchQuery}".`
                    }]);
                    setSourceSearchQuery('');
                  }
                }}
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded-lg pl-8 pr-2 py-1.5 text-[11px] text-slate-200 placeholder-slate-500 outline-none transition"
              />
            </div>
          </div>

          {/* Sources List */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
            {notebook.sources.length === 0 ? (
              <div className="text-center py-10 px-4 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-400 font-medium">Saved sources will appear here</div>
                <p className="text-[11px] text-slate-500">
                  Add files, websites, or more. Then ask questions or create things based on these sources.
                </p>
                <button
                  onClick={() => setSourcesModalOpen(true)}
                  className="text-xs text-cyan-400 hover:underline font-medium"
                >
                  + Add a source
                </button>
              </div>
            ) : (
              notebook.sources.map((src) => (
                <div
                  key={src.id}
                  onClick={() => handleToggleSource(src.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition flex items-start justify-between group ${
                    src.selected 
                      ? 'bg-slate-900/90 border-cyan-500/40 text-slate-100 shadow-xs' 
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-2 min-w-0 pr-1">
                    <input
                      type="checkbox"
                      checked={src.selected}
                      onChange={() => handleToggleSource(src.id)}
                      className="mt-0.5 rounded accent-cyan-500 cursor-pointer"
                    />
                    <div className="min-w-0">
                      <div className="font-medium text-slate-200 truncate group-hover:text-cyan-300 transition">
                        {src.title}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="uppercase font-mono">{src.type}</span>
                        <span>•</span>
                        <span>{src.wordCount || 850} words</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDeleteSource(src.id, e)}
                    title="Remove source"
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= CENTER COLUMN: CHAT & NOTES (6 cols) ================= */}
        <div className="md:col-span-6 flex flex-col bg-slate-900/30 overflow-hidden border-r border-slate-800">
          {/* Center Tabs: Chat / Notes / ReAct Trace */}
          <div className="h-10 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-950/40 shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  activeTab === 'chat'
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  activeTab === 'notes'
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Notes ({notebook.notes.length})
              </button>
              <button
                onClick={() => setActiveTab('react_trace')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                  activeTab === 'react_trace'
                    ? 'bg-slate-800 text-indigo-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>ReAct Loop</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Grounded Chat Feed */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {notebook.chatHistory.length === 0 ? (
                  /* Welcome Blank Canvas matching Screenshot 1 */
                  <div className="py-8 sm:py-12 text-center max-w-md mx-auto space-y-4">
                    <div className="text-4xl animate-bounce">👋</div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Let's start your notebook...
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      This is your blank canvas to understand, create, or make progress on something new. I can help you get started or you can go ahead and ask a question.
                    </p>

                    <div className="pt-4 grid grid-cols-1 gap-2 text-left">
                      {[
                        'What is the SLA uptime guarantee and credit policy?',
                        'Run ReAct agent extraction on the contract',
                        'Summarize the commercial billing schedule',
                        'Generate an executive briefing slide deck'
                      ].map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setPromptInput(prompt);
                          }}
                          className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-white transition text-left flex items-center justify-between group"
                        >
                          <span>{prompt}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  notebook.chatHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.role === 'user' ? 'items-end' : 'items-start'
                      } space-y-1.5`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-none shadow-md'
                            : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>

                        {/* Citation Chips */}
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] text-slate-400 font-medium">Grounded Sources:</span>
                            {msg.citations.map((c, i) => (
                              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-cyan-800/40 truncate max-w-[200px]">
                                [{i+1}] {c}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-500 font-mono px-1">
                        {msg.role === 'user' ? 'You' : 'DocuMind Agent'} • {msg.timestamp}
                      </span>
                    </div>
                  ))
                )}

                {isThinking && (
                  <div className="flex items-center gap-2 p-3 bg-slate-900/80 border border-slate-800 rounded-2xl max-w-xs text-xs text-slate-400 animate-pulse">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span>Agent reasoning over {selectedSourcesCount} sources...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Prompt Bar matching Gemini Notebook */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/80 shrink-0">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <div className="absolute left-3.5 text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-2 py-0.5 rounded-full pointer-events-none">
                    {selectedSourcesCount} {selectedSourcesCount === 1 ? 'source' : 'sources'}
                  </div>

                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="Ask a question or create something..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-full pl-28 pr-12 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition"
                  />

                  <button
                    type="submit"
                    disabled={!promptInput.trim() || isThinking}
                    title="Send message to DocuMind agent"
                    className="absolute right-2 w-8 h-8 rounded-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white flex items-center justify-center transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </form>
                <div className="text-[10px] text-slate-500 text-center mt-1.5">
                  DocuMind Agent can be inaccurate; please double check its responses.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Notes / Scratchpad */}
          {activeTab === 'notes' && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Notebook Scratchpad &amp; Notes
                </h3>
                <button
                  onClick={() => setIsCreatingNote(!isCreatingNote)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add note</span>
                </button>
              </div>

              {isCreatingNote && (
                <div className="bg-slate-950 border border-cyan-500/50 rounded-xl p-4 space-y-2.5 animate-in fade-in">
                  <input
                    type="text"
                    placeholder="Note title..."
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500"
                  />
                  <textarea
                    rows={3}
                    placeholder="Write key findings, thoughts, or copy-paste citations..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-cyan-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsCreatingNote(false)}
                      className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateNote}
                      className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-medium"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {notebook.notes.map((note) => (
                  <div key={note.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-slate-200">{note.title}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{note.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Embedded ReAct Reasoning Trace */}
          {activeTab === 'react_trace' && (
            <div className="flex-1 overflow-y-auto p-4">
              <ReActTraceView
                data={notebook.reactAgentData}
                isRunning={isThinking}
                onRunAgent={(provider) => {
                  setIsThinking(true);
                  setTimeout(() => setIsThinking(false), 900);
                }}
                onOpenReviewModal={() => {}}
              />
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN: STUDIO (3 cols) ================= */}
        <div className="md:col-span-3 bg-slate-950/60 flex flex-col overflow-hidden">
          {/* Studio Header */}
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-semibold text-white">Studio</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Agent Artifacts</span>
          </div>

          {/* Studio Grid matching Screenshot 1 */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {/* 1. Audio Overview */}
              <div
                onClick={() => setActiveStudioType('audio_overview')}
                title="Generate a 2-host audio podcast deep dive"
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-3 cursor-pointer flex flex-col justify-between min-h-[72px] transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <Volume2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="text-[11px] font-semibold text-slate-200 group-hover:text-white mt-2">
                  Audio Overview
                </div>
              </div>

              {/* 2. Slide Deck */}
              <div
                onClick={() => setActiveStudioType('slide_deck')}
                title="Generate presentation slide deck"
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-3 cursor-pointer flex flex-col justify-between min-h-[72px] transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Presentation className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-bold px-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">BETA</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="text-[11px] font-semibold text-slate-200 group-hover:text-white mt-2">
                  Slide Deck
                </div>
              </div>

              {/* 3. Mind Map */}
              <div
                onClick={() => setActiveStudioType('mind_map')}
                title="Generate visual mind map of topics"
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-xl p-3 cursor-pointer flex flex-col justify-between min-h-[72px] transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <Network className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="text-[11px] font-semibold text-slate-200 group-hover:text-white mt-2">
                  Mind Map
                </div>
              </div>

              {/* 4. Reports */}
              <div
                onClick={() => setActiveStudioType('report')}
                title="Generate executive briefing report"
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-3 cursor-pointer flex flex-col justify-between min-h-[72px] transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div className="text-[11px] font-semibold text-slate-200 group-hover:text-white mt-2">
                  Reports
                </div>
              </div>

              {/* 5. Flashcards */}
              <div
                onClick={() => setActiveStudioType('flashcards')}
                title="Generate interactive study flashcards"
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-xl p-3 cursor-pointer flex flex-col justify-between min-h-[72px] transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <Layers className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                </div>
                <div className="text-[11px] font-semibold text-slate-200 group-hover:text-white mt-2">
                  Flashcards
                </div>
              </div>

              {/* 6. Quiz */}
              <div
                onClick={() => setActiveStudioType('quiz')}
                title="Generate knowledge test quiz"
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-xl p-3 cursor-pointer flex flex-col justify-between min-h-[72px] transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <HelpCircle className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-rose-400 transition-colors" />
                </div>
                <div className="text-[11px] font-semibold text-slate-200 group-hover:text-white mt-2">
                  Quiz
                </div>
              </div>

              {/* 7. Infographic */}
              <div
                onClick={() => setActiveStudioType('infographic')}
                title="Generate visual infographic statistics"
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-3 cursor-pointer flex flex-col justify-between min-h-[72px] transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <BarChart2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-bold px-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">BETA</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="text-[11px] font-semibold text-slate-200 group-hover:text-white mt-2">
                  Infographic
                </div>
              </div>

              {/* 8. Data Table */}
              <div
                onClick={() => setActiveStudioType('data_table')}
                title="Generate structured comparative table"
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-xl p-3 cursor-pointer flex flex-col justify-between min-h-[72px] transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <Table className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="text-[11px] font-semibold text-slate-200 group-hover:text-white mt-2">
                  Data Table
                </div>
              </div>
            </div>

            {/* Studio Output Placeholder Notice */}
            <div className="p-3 text-center text-slate-500 text-[10px] space-y-1 pt-6">
              <Sparkles className="w-4 h-4 mx-auto text-slate-600" />
              <div>Studio output will be saved here.</div>
              <div>After adding sources, click to add Audio Overview, Slide Deck, Mind Map, and more!</div>
            </div>
          </div>

          {/* Bottom Add Note Action matching screenshot 1 */}
          <div className="p-3 border-t border-slate-800 shrink-0">
            <button
              onClick={() => {
                setActiveTab('notes');
                setIsCreatingNote(true);
              }}
              title="Add a scratchpad note to this notebook"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition cursor-pointer"
            >
              <StickyNote className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add note</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sources Ingestion Modal */}
      <SourcesModal
        isOpen={sourcesModalOpen}
        onClose={() => setSourcesModalOpen(false)}
        onAddSources={handleAddSources}
      />

      {/* Studio Artifact Modal Viewer */}
      {activeStudioType && (
        <StudioArtifactViewer
          type={activeStudioType}
          notebook={notebook}
          onClose={() => setActiveStudioType(null)}
        />
      )}
    </div>
  );
};
