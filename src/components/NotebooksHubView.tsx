import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Sparkles, 
  Layers, 
  Clock, 
  FileText, 
  MoreVertical, 
  Trash2, 
  Copy, 
  Share2, 
  Check, 
  Grid, 
  List,
  Compass,
  Zap,
  ArrowRight,
  ExternalLink,
  Bot
} from 'lucide-react';
import { Notebook, ThemeMode } from '../types';

interface NotebooksHubViewProps {
  notebooks: Notebook[];
  onSelectNotebook: (notebookId: string) => void;
  onCreateNotebook: () => void;
  onOpenBrandingPage: () => void;
  onDeleteNotebook: (notebookId: string) => void;
  theme: ThemeMode;
}

export const NotebooksHubView: React.FC<NotebooksHubViewProps> = ({
  notebooks,
  onSelectNotebook,
  onCreateNotebook,
  onOpenBrandingPage,
  onDeleteNotebook,
  theme
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'featured' | 'collections'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const featuredNotebooks = notebooks.filter(n => n.isFeatured || n.category === 'featured');
  
  const filteredNotebooks = notebooks.filter(nb => {
    const matchesSearch = nb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nb.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'my') return !nb.isFeatured;
    if (activeTab === 'featured') return nb.isFeatured;
    return true;
  });

  const handleShare = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in">
      {/* Top Filter & Search Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Filter Pills matching Screenshot 2 */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            title="View all available notebooks"
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-200 text-slate-900 font-semibold shadow-xs'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('my')}
            title="View only notebooks created by you"
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
              activeTab === 'my'
                ? 'bg-slate-200 text-slate-900 font-semibold shadow-xs'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            My notebooks
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            title="View curated research & benchmark notebooks"
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
              activeTab === 'featured'
                ? 'bg-slate-200 text-slate-900 font-semibold shadow-xs'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            Featured notebooks
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            title="View organized subject collections"
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
              activeTab === 'collections'
                ? 'bg-slate-200 text-slate-900 font-semibold shadow-xs'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            Collections
          </button>
        </div>

        {/* Right Tools: Search Bar & Create Notebook CTA */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notebooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded-full pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition"
            />
          </div>

          <button
            onClick={onCreateNotebook}
            title="Initialize an empty notebook workspace"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-white text-slate-900 text-xs font-semibold shadow-sm transition whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create new</span>
          </button>
        </div>
      </div>

      {/* Featured Notebooks Horizontal Showcase (Matching Screenshot 2) */}
      {(activeTab === 'all' || activeTab === 'featured') && featuredNotebooks.length > 0 && !searchQuery && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Featured notebooks</span>
            </h2>
            <span className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer">
              View all
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {featuredNotebooks.slice(0, 6).map((nb) => (
              <div
                key={nb.id}
                onClick={() => onSelectNotebook(nb.id)}
                title={`Open notebook: ${nb.title}`}
                className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden cursor-pointer flex flex-col transition shadow-xs transform hover:-translate-y-0.5"
              >
                {/* Thumbnail Banner */}
                <div className="h-24 w-full relative overflow-hidden bg-slate-950">
                  {nb.coverImage ? (
                    <img 
                      src={nb.coverImage} 
                      alt={nb.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-cyan-950 to-indigo-950 text-cyan-400">
                      <BookOpen className="w-6 h-6" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="text-[10px] text-cyan-400 font-medium truncate">
                      {nb.publisher || 'Curated Source'}
                    </div>
                    <h3 className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300 transition line-clamp-2 leading-snug">
                      {nb.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>{nb.sources.length} sources</span>
                    <span className="font-mono">{nb.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Notebooks Grid (Matching Screenshot 2) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Recent notebooks</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* Card 1: Create New Notebook Action Tile */}
          <div
            onClick={onCreateNotebook}
            title="Create and start a new blank notebook"
            className="bg-slate-900/40 hover:bg-slate-900/80 border border-dashed border-slate-800 hover:border-cyan-500/70 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer group min-h-[160px] transition"
          >
            <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-cyan-500/20 text-slate-300 group-hover:text-cyan-400 flex items-center justify-center transition-transform group-hover:scale-110 mb-2">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition">
              Create new notebook
            </span>
          </div>

          {/* Existing Notebook Cards */}
          {filteredNotebooks.map((nb) => (
            <div
              key={nb.id}
              onClick={() => onSelectNotebook(nb.id)}
              title={`Open notebook: ${nb.title}`}
              className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 flex flex-col justify-between cursor-pointer min-h-[160px] transition shadow-xs transform hover:-translate-y-0.5"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                    <BookOpen className="w-4 h-4" />
                  </div>

                  <div className="flex items-center gap-1 text-slate-500">
                    <button
                      onClick={(e) => handleShare(e, nb.id)}
                      title="Copy notebook link"
                      className="p-1 hover:text-slate-300 transition"
                    >
                      {copiedId === nb.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
                    </button>
                    {!nb.isFeatured && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteNotebook(nb.id);
                        }}
                        title="Delete notebook"
                        className="p-1 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300 transition line-clamp-2 leading-snug">
                    {nb.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {nb.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60 mt-2">
                <span>{nb.sources.length} sources</span>
                <span>{nb.updatedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Architecture Agent Banner (Link to Branding Showcase) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
              <span>DocuMind ReAct Engine Architecture</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">Agnostic Core</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Explore autonomous multi-turn reasoning traces, tool executions, and SQLite pattern memory.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenBrandingPage}
          title="Open interactive agent tech showcase"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600/90 hover:bg-cyan-500 text-white text-xs font-medium transition cursor-pointer shrink-0"
        >
          <span>View Tech Showcase</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
