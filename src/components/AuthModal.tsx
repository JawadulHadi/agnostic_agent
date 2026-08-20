import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Zap, 
  Lock,
  Globe
} from 'lucide-react';
import { AuthUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
  currentUser?: AuthUser;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  currentUser
}) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleMagicLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      
      // Auto-authenticate after simulated magic link dispatch
      setTimeout(() => {
        const username = email.split('@')[0];
        const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
        onLogin({
          id: `usr-${Date.now()}`,
          email,
          name: formattedName,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
          isLoggedIn: true,
          provider: 'magic_link'
        });
        setIsSent(false);
        onClose();
      }, 1200);
    }, 800);
  };

  const handleQuickDemoLogin = (provider: 'google' | 'github' | 'demo') => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin({
        id: 'usr-jawadul',
        email: 'jawadulhadicc@gmail.com',
        name: 'Jawadul Hadi',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
        isLoggedIn: true,
        provider
      });
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        id="auth-modal-dialog"
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close authentication modal"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>DocuMind Notebook</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">v1.0</span>
            </h2>
            <p className="text-xs text-slate-400">Sign in to save notebooks, sources, and agentic workflows</p>
          </div>
        </div>

        {isSent ? (
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-5 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-white">Magic Link Dispatched!</h3>
            <p className="text-xs text-slate-300">
              We dispatched a secure authentication pass to <span className="font-mono text-cyan-300">{email}</span>. Logging you in automatically...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Quick 1-Click Demo Pass */}
            <button
              onClick={() => handleQuickDemoLogin('demo')}
              title="Instant 1-click access without password"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-indigo-950/90 to-cyan-950/90 border border-indigo-500/40 hover:border-cyan-400 text-slate-100 group transition shadow-sm"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition">
                    1-Click Instant Pass
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Sign in as <span className="text-slate-200 font-medium">Jawadul Hadi</span> (Pre-configured)
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase tracking-wider">or sign in with email</span>
            </div>

            {/* Email Magic Link Form */}
            <form onSubmit={handleMagicLinkSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 transition outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email}
                title="Send authentication magic link"
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending secure link...</span>
                ) : (
                  <>
                    <span>Send Magic Link</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* OAuth Secondary Options */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleQuickDemoLogin('google')}
                title="Sign in with Google"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 hover:text-white transition"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Google</span>
              </button>
              <button
                onClick={() => handleQuickDemoLogin('github')}
                title="Sign in with GitHub"
                className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 hover:text-white transition"
              >
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>GitHub</span>
              </button>
            </div>

            {/* Security Guarantee Note */}
            <div className="pt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-knowledge client encryption. No passwords stored.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
