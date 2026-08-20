import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  ShieldAlert, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { ReviewQueueItem } from '../types';

interface ReviewQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ReviewQueueItem[];
  onResolveItem: (id: string, approvedValue: any) => void;
  onRejectItem: (id: string) => void;
}

export const ReviewQueueModal: React.FC<ReviewQueueModalProps> = ({
  isOpen,
  onClose,
  items,
  onResolveItem,
  onRejectItem
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  if (!isOpen) return null;

  const unresolvedItems = items.filter(i => !i.resolved);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white font-display">
                Human-in-the-Loop Review Queue
              </h3>
              <p className="text-xs text-slate-400">
                {unresolvedItems.length} field{unresolvedItems.length === 1 ? '' : 's'} fell below the required confidence threshold (&lt; 85%).
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {unresolvedItems.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-200">Review Queue Cleared</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                All extracted entities and critical data fields have met the automated confidence threshold or been verified.
              </p>
            </div>
          ) : (
            unresolvedItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">
                      Low Confidence Extraction
                    </span>
                    <h4 className="text-xs font-semibold text-slate-200 mt-0.5">{item.fieldName}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      {(item.actualConfidence * 100).toFixed(0)}%
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono"> / 85% req</span>
                  </div>
                </div>

                {/* Value display or inline edit */}
                {editingId === item.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-indigo-500 text-xs text-white focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        onResolveItem(item.id, editValue);
                        setEditingId(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-mono-code text-indigo-300">
                      {String(item.value)}
                    </span>
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditValue(String(item.value));
                      }}
                      className="text-slate-400 hover:text-indigo-300 text-xs flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}

                {item.reason && (
                  <p className="text-[11px] text-slate-400 italic">
                    Reason: {item.reason}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-850">
                  <button
                    onClick={() => onRejectItem(item.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 border border-slate-800 transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => onResolveItem(item.id, item.value)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Value</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
