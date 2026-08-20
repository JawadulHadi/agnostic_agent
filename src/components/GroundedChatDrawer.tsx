import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  BookOpen, 
  X, 
  MessageSquare, 
  CornerDownLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ChatMessage, InputEnvelope } from '../types';
import { sendGroundedChatMessage } from '../services/api';

interface GroundedChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  doc: InputEnvelope;
  onUpdateChatHistory: (messages: ChatMessage[]) => void;
}

export const GroundedChatDrawer: React.FC<GroundedChatDrawerProps> = ({
  isOpen,
  onClose,
  doc,
  onUpdateChatHistory
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([
    'What are the critical termination conditions?',
    'What are the payment milestones and total cost?',
    'Are there automatic renewal clauses or notice windows?'
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [doc.chatHistory, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...doc.chatHistory, userMsg];
    onUpdateChatHistory(updatedHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendGroundedChatMessage(doc, updatedHistory, textToSend);

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toISOString(),
        citations: response.citations,
        suggestedPrompts: response.suggestedPrompts
      };

      onUpdateChatHistory([...updatedHistory, assistantMsg]);
      if (response.suggestedPrompts && response.suggestedPrompts.length > 0) {
        setSuggestedPrompts(response.suggestedPrompts);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `Error responding: ${err.message || 'Could not reach reasoning model.'}`,
        timestamp: new Date().toISOString()
      };
      onUpdateChatHistory([...updatedHistory, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      id="grounded-chat-sidebar"
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col animate-slideInRight"
    >
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white font-display">Grounded Copilot Q&A</h3>
            <p className="text-[11px] text-slate-400 truncate max-w-[260px]">
              Grounded in: <strong>{doc.name}</strong>
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {doc.chatHistory.length === 0 ? (
          <div className="text-center py-10 px-4 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200 font-display">Ask Questions Directly</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              Ask about contractual liabilities, payment schedules, technical terms, or missing clauses. Every response is strictly grounded with citations.
            </p>
          </div>
        ) : (
          doc.chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 space-y-2 ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-br-xs'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                    <BookOpen className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] text-slate-400">Citations:</span>
                    {msg.citations.map((cite, i) => (
                      <span key={i} className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-indigo-300">
                        {cite}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-slate-700">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3 text-xs items-center text-slate-400">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-500/30">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>Analyzing document and generating citation-backed response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/50">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Suggested Inquiries</p>
        <div className="flex flex-col gap-1">
          {suggestedPrompts.slice(0, 3).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-left text-[11px] text-slate-400 hover:text-indigo-300 hover:bg-slate-900 px-2 py-1 rounded transition-colors truncate flex items-center gap-1.5"
            >
              <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="truncate">{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything about this document..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
