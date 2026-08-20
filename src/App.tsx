import React, { useState, useEffect } from 'react';
import { 
  ViewPage, 
  ThemeMode, 
  AuthUser, 
  Notebook, 
  NotebookSource,
  ChatMessage
} from './types';
import { SEED_NOTEBOOKS } from './data/seedNotebooks';
import { Header } from './components/Header';
import { NotebooksHubView } from './components/NotebooksHubView';
import { NotebookWorkspaceView } from './components/NotebookWorkspaceView';
import { AgentBrandingPage } from './components/AgentBrandingPage';
import { AuthModal } from './components/AuthModal';

const DEFAULT_USER: AuthUser = {
  id: 'usr-fastpass-01',
  email: 'jawadulhadicc@gmail.com',
  name: 'Jawadul Hadi',
  isLoggedIn: true,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  provider: 'demo'
};

export function App() {
  // Navigation & View Page
  const [currentPage, setCurrentPage] = useState<ViewPage>('notebooks_hub');
  const [activeNotebookId, setActiveNotebookId] = useState<string>('nb-cloud-msa-2026');
  
  // Theme state: dark, light, sepia
  const [theme, setTheme] = useState<ThemeMode>('dark');

  // Auth state
  const [user, setUser] = useState<AuthUser>(() => {
    const saved = localStorage.getItem('documind_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_USER;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Notebooks Collection
  const [notebooks, setNotebooks] = useState<Notebook[]>(() => {
    const saved = localStorage.getItem('documind_notebooks_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return SEED_NOTEBOOKS;
  });

  // Sync theme class to body
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Persist notebooks on change
  useEffect(() => {
    localStorage.setItem('documind_notebooks_v1', JSON.stringify(notebooks));
  }, [notebooks]);

  // Persist auth user
  useEffect(() => {
    localStorage.setItem('documind_auth_user', JSON.stringify(user));
  }, [user]);

  const activeNotebook = notebooks.find(n => n.id === activeNotebookId) || notebooks[0];

  const handleSelectNotebook = (id: string) => {
    setActiveNotebookId(id);
    setCurrentPage('notebook_workspace');
  };

  const handleCreateNewNotebook = () => {
    const newId = `nb-${Date.now()}`;
    const newNotebook: Notebook = {
      id: newId,
      title: 'Untitled notebook',
      description: 'Add sources or ask questions to start analyzing documents with DocuMind ReAct Agent.',
      createdAt: 'Today',
      updatedAt: 'Just now',
      sources: [],
      notes: [],
      chatHistory: [],
      studioArtifacts: [],
      reactAgentData: {
        documentType: 'general',
        confidence: 0.88,
        steps: [
          {
            stepNumber: 1,
            thought: 'Analyze input document structure and classify document type',
            action: 'Awaiting source ingestion to map JSON schema.',
            observation: { status: 'initialized' },
            confidence: 0.90,
            toolsUsed: ['schema_lookup']
          }
        ],
        validation: {
          isValid: true,
          errors: [],
          schemaUsed: 'general_v1.0',
          missingRequired: [],
          fieldConfidence: 0.90
        },
        learningStats: {
          totalDocuments: 1248,
          patternsLearned: 384,
          accuracy: 0.87,
          confidenceAvg: 0.815
        },
        extractedFields: {},
        gateway: {
          provider: 'Google Gemini',
          model: 'gemini-2.5-flash',
          capabilities: ['ReAct Agent Loop', 'Deterministic Fallback']
        },
        requiresHumanReview: false
      }
    };

    setNotebooks([newNotebook, ...notebooks]);
    setActiveNotebookId(newId);
    setCurrentPage('notebook_workspace');
  };

  const handleUpdateNotebook = (updated: Notebook) => {
    setNotebooks(prev => prev.map(n => n.id === updated.id ? updated : n));
  };

  const handleDeleteNotebook = (id: string) => {
    setNotebooks(prev => prev.filter(n => n.id !== id));
    if (activeNotebookId === id && notebooks.length > 1) {
      const remaining = notebooks.filter(n => n.id !== id);
      setActiveNotebookId(remaining[0].id);
    }
  };

  const handleLogin = (newUser: AuthUser) => {
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser({
      id: '',
      email: '',
      name: '',
      avatar: '',
      isLoggedIn: false,
      provider: 'demo'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors">
      {/* Global Brand Header with Theme Switcher, Navigation & Auth */}
      <Header
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        theme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* VIEW 1: Notebooks Gallery / Hub */}
        {currentPage === 'notebooks_hub' && (
          <NotebooksHubView
            notebooks={notebooks}
            onSelectNotebook={handleSelectNotebook}
            onCreateNotebook={handleCreateNewNotebook}
            onOpenBrandingPage={() => setCurrentPage('agent_branding')}
            onDeleteNotebook={handleDeleteNotebook}
            theme={theme}
          />
        )}

        {/* VIEW 2: 3-Column Gemini Notebook / NotebookLM Workspace */}
        {currentPage === 'notebook_workspace' && activeNotebook && (
          <NotebookWorkspaceView
            notebook={activeNotebook}
            onBackToHub={() => setCurrentPage('notebooks_hub')}
            onUpdateNotebook={handleUpdateNotebook}
            theme={theme}
            onOpenBrandingPage={() => setCurrentPage('agent_branding')}
          />
        )}

        {/* VIEW 3: Tech Style Animated ReAct Agent Showcase */}
        {currentPage === 'agent_branding' && (
          <AgentBrandingPage
            onEnterWorkspace={() => {
              setCurrentPage('notebook_workspace');
            }}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            currentTheme={theme}
          />
        )}
      </main>

      {/* Magic Link / Fast-Pass Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
