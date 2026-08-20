import React from 'react';
import { 
  Bot,
  FileText, 
  KeyRound, 
  ShieldAlert, 
  GitCompare, 
  SplitSquareVertical, 
  CheckSquare, 
  Wand2,
  Loader2
} from 'lucide-react';
import { CapabilityId } from '../types';

interface CapabilityToolbarProps {
  activeCapability: CapabilityId;
  onSelectCapability: (cap: CapabilityId) => void;
  isRunning: boolean;
  resultsMap: Record<string, any>;
}

interface CapabilityItem {
  id: CapabilityId;
  label: string;
  shortDesc: string;
  icon: React.ElementType;
  badge?: string;
}

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'REACT_AGENT',
    label: 'ReAct Agent Loop',
    shortDesc: 'Thought • Action • Trace',
    icon: Bot,
    badge: 'Agentic'
  },
  {
    id: 'SUMMARIZE',
    label: 'Executive Summary',
    shortDesc: 'TL;DR & Takeaways',
    icon: FileText
  },
  {
    id: 'EXTRACT_FACTS',
    label: 'Fact Extraction',
    shortDesc: 'Entities & Metadata',
    icon: KeyRound
  },
  {
    id: 'VERDICT',
    label: 'Risk Verdict',
    shortDesc: 'Audit & Red Flags',
    icon: ShieldAlert
  },
  {
    id: 'BREAKDOWN',
    label: 'Clause Breakdown',
    shortDesc: 'Section Hierarchy',
    icon: SplitSquareVertical
  },
  {
    id: 'NEXT_ACTIONS',
    label: 'Next Actions',
    shortDesc: 'Tasks & Deadlines',
    icon: CheckSquare
  },
  {
    id: 'COMPARE',
    label: 'Standard Diff',
    shortDesc: 'Market Baseline',
    icon: GitCompare
  },
  {
    id: 'GENERATE',
    label: 'Executive Memo',
    shortDesc: 'Draft Synthesis',
    icon: Wand2
  }
];

export const CapabilityToolbar: React.FC<CapabilityToolbarProps> = ({
  activeCapability,
  onSelectCapability,
  isRunning,
  resultsMap
}) => {
  return (
    <div id="capability-navigation-bar" className="w-full border-b border-slate-800 bg-slate-950/70 backdrop-blur-xs px-4 lg:px-8 py-2 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
        {CAPABILITIES.map((cap) => {
          const Icon = cap.icon;
          const isActive = activeCapability === cap.id;
          const hasResult = Boolean(resultsMap[cap.id]);

          return (
            <button
              key={cap.id}
              id={`capability-tab-${cap.id}`}
              onClick={() => onSelectCapability(cap.id)}
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 relative ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-500'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {isRunning && isActive ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              ) : (
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
              )}
              
              <div className="text-left">
                <div className="leading-tight flex items-center gap-1">
                  <span>{cap.label}</span>
                  {hasResult && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
