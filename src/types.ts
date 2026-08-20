export type ThemeMode = 'dark' | 'light' | 'sepia';

export type ViewPage = 'notebooks_hub' | 'notebook_workspace' | 'agent_branding';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  isLoggedIn: boolean;
  provider: 'magic_link' | 'google' | 'github' | 'demo';
}

export interface NotebookSource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'web' | 'text' | 'audio';
  content: string;
  summary?: string;
  selected: boolean;
  url?: string;
  sizeBytes?: number;
  addedAt: string;
  wordCount?: number;
}

export interface NotebookNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export type StudioArtifactType = 
  | 'audio_overview' 
  | 'slide_deck' 
  | 'mind_map' 
  | 'report' 
  | 'flashcards' 
  | 'quiz' 
  | 'infographic' 
  | 'data_table'
  | 'react_trace';

export interface StudioArtifact {
  id: string;
  type: StudioArtifactType;
  title: string;
  description: string;
  data: any;
  status: 'ready' | 'generating' | 'error';
  createdAt: string;
}

export interface Notebook {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  category?: 'featured' | 'recent' | 'my_notebook' | 'collection';
  publisher?: string;
  sources: NotebookSource[];
  notes: NotebookNote[];
  chatHistory: ChatMessage[];
  studioArtifacts: StudioArtifact[];
  reactAgentData?: ReActAgentData;
  createdAt: string;
  updatedAt: string;
  isFeatured?: boolean;
}

export type DocumentType = 'invoice' | 'contract' | 'resume' | 'report' | 'receipt' | 'general';

export type CapabilityId = 
  | 'REACT_AGENT'
  | 'SUMMARIZE' 
  | 'EXTRACT_FACTS' 
  | 'VERDICT' 
  | 'COMPARE' 
  | 'BREAKDOWN' 
  | 'NEXT_ACTIONS' 
  | 'GENERATE';

export interface ReActStepTrace {
  stepNumber: number;
  thought: string;
  action: string;
  observation: any;
  confidence: number;
  toolsUsed: string[];
}

export interface ReActAgentData {
  documentType: string;
  confidence: number;
  requiresHumanReview: boolean;
  steps: ReActStepTrace[];
  validation: {
    isValid: boolean;
    errors: string[];
    schemaUsed: string;
    missingRequired: string[];
    fieldConfidence: number;
  };
  learningStats: {
    totalDocuments: number;
    patternsLearned: number;
    accuracy: number;
    confidenceAvg: number;
  };
  extractedFields: Record<string, any>;
  gateway: {
    provider: string;
    model: string;
    capabilities: string[];
  };
}

export interface ExtractedField {
  fieldName: string;
  value: any;
  confidence: number;
  source: string;
  valid: boolean;
  errors: string[];
}

export interface ReviewQueueItem {
  id: string;
  fieldName: string;
  value: any;
  requiredThreshold: number;
  actualConfidence: number;
  reason?: string;
  resolved: boolean;
  resolvedValue?: any;
}

export interface CapabilityResult<T = any> {
  capabilityId: CapabilityId;
  status: 'success' | 'fallback' | 'error';
  confidence: number;
  provider: 'gemini' | 'rule-based';
  executionTimeMs: number;
  data: T;
  rawText?: string;
  reviewQueue?: ReviewQueueItem[];
}

export interface InputEnvelope {
  id: string;
  tenantId: string;
  userId?: string | null;
  name: string;
  documentType: DocumentType;
  mimeType: string;
  sizeBytes: number;
  text: string;
  previewText: string;
  wordCount: number;
  charCount: number;
  pageCountEstimate: number;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
  results: Partial<Record<CapabilityId, CapabilityResult>>;
  reviewQueue: ReviewQueueItem[];
  chatHistory: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: string[];
  suggestedPrompts?: string[];
}

export interface CapabilityDefinition {
  id: CapabilityId;
  name: string;
  description: string;
  category: 'analysis' | 'extraction' | 'risk' | 'synthesis';
  icon: string;
  confidenceGate: number;
  supportedTypes: DocumentType[];
}

export type UIShell = 'workspace' | 'docked' | 'floating';

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface TenantContext {
  tenantId: string;
  tier: 'free' | 'pro' | 'enterprise';
  rateLimitPerMin: number;
}
