import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Bot, 
  Sun, 
  Moon, 
  Coffee, 
  User, 
  LogOut, 
  Zap, 
  ShieldCheck, 
  ChevronDown,
  Layers,
  HelpCircle
} from 'lucide-react';
import { ThemeMode, ViewPage, AuthUser } from '../types';

interface HeaderProps {
  currentPage: ViewPage;
  onNavigate: (page: ViewPage) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  user: AuthUser;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  theme,
  onThemeChange,
  user,
  onOpenAuth,
  onLogout
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  return (
    <header 
      id="app-header" 
      className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-2.5 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => onNavigate('notebooks_hub')}
            title="DocuMind Notebook Home"
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition">
                  DocuMind
                </span>
                <span className="text-xs font-semibold text-cyan-400">Notebook</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                  v1.0
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => onNavigate('notebooks_hub')}
              title="Browse all notebooks"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'notebooks_hub' || currentPage === 'notebook_workspace'
                  ? 'bg-slate-800 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Notebooks</span>
            </button>

            <button
              onClick={() => onNavigate('agent_branding')}
              title="DocuMind ReAct Engine & Architecture Showcase"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'agent_branding'
                  ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tech Showcase</span>
            </button>
          </nav>
        </div>

        {/* Right Tools: Theme Converter + Live Agent Badge + Auth User */}
        <div className="flex items-center gap-2.5">
          {/* Theme Converter Switcher */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              title="Switch visual theme & typography"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs transition"
            >
              {theme === 'dark' && <Moon className="w-3.5 h-3.5 text-cyan-400" />}
              {theme === 'light' && <Sun className="w-3.5 h-3.5 text-amber-400" />}
              {theme === 'sepia' && <Coffee className="w-3.5 h-3.5 text-amber-600" />}
              <span className="capitalize hidden md:inline">{theme}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-40 bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-1 z-50 animate-in fade-in">
                <button
                  onClick={() => {
                    onThemeChange('dark');
                    setThemeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition ${
                    theme === 'dark' ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dark (Slate)</span>
                </button>

                <button
                  onClick={() => {
                    onThemeChange('light');
                    setThemeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition ${
                    theme === 'light' ? 'bg-slate-800 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light (Editorial)</span>
                </button>

                <button
                  onClick={() => {
                    onThemeChange('sepia');
                    setThemeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition ${
                    theme === 'sepia' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5 text-amber-600" />
                  <span>Sepia (Coffee)</span>
                </button>
              </div>
            )}
          </div>

          {/* AI Status Badge */}
          <div 
            title="Google Gemini 2.5 Flash ReAct Gateway Active"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-800/40 text-cyan-300"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden lg:inline">Gemini ReAct Loop</span>
          </div>

          {/* Auth Button or User Profile Dropdown */}
          {user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title={`Signed in as ${user.email}`}
                className="flex items-center gap-2 p-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-6 h-6 rounded-full object-cover" 
                />
                <span className="text-xs font-medium text-slate-200 hidden sm:inline pr-2">
                  {user.name}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-2 z-50 animate-in fade-in space-y-2">
                  <div className="px-2.5 py-1.5 border-b border-slate-800">
                    <div className="text-xs font-semibold text-white truncate">{user.name}</div>
                    <div className="text-[11px] text-slate-400 truncate font-mono">{user.email}</div>
                  </div>

                  <button
                    onClick={() => {
                      onLogout();
                      setUserDropdownOpen(false);
                    }}
                    title="Sign out of your session"
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-950/40 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              title="Sign in with Magic Link or 1-Click Fast Pass"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium shadow-xs transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
