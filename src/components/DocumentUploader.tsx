import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  FileCheck, 
  FileSpreadsheet, 
  AlertCircle, 
  ArrowRight,
  ClipboardPaste,
  Shield
} from 'lucide-react';
import { SAMPLE_DOCUMENTS, SampleDoc } from '../data/sampleDocuments';
import { DocumentType, InputEnvelope } from '../types';
import { uploadDocumentFile } from '../services/api';
import { detectDocumentType } from '../utils/deterministicEngine';

interface DocumentUploaderProps {
  onDocumentLoaded: (doc: InputEnvelope) => void;
  isOpen: boolean;
  onClose: () => void;
  canClose: boolean;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onDocumentLoaded,
  isOpen,
  onClose,
  canClose
}) => {
  const [activeTab, setActiveTab] = useState<'samples' | 'upload' | 'paste'>('samples');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [pasteTitle, setPasteTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSelectSample = (sample: SampleDoc) => {
    const wordCount = sample.text.split(/\s+/).filter(Boolean).length;
    const newDoc: InputEnvelope = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      tenantId: 'tenant-enterprise-01',
      name: sample.name,
      documentType: sample.type,
      mimeType: 'text/plain',
      sizeBytes: sample.text.length,
      text: sample.text,
      previewText: sample.text.slice(0, 500) + '...',
      wordCount,
      charCount: sample.text.length,
      pageCountEstimate: Math.max(1, Math.ceil(sample.text.length / 2800)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      results: {},
      reviewQueue: [],
      chatHistory: []
    };
    onDocumentLoaded(newDoc);
    onClose();
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    try {
      const uploadRes = await uploadDocumentFile(file);
      const docType = detectDocumentType(uploadRes.text, uploadRes.name);

      const newDoc: InputEnvelope = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        tenantId: 'tenant-enterprise-01',
        name: uploadRes.name,
        documentType: docType,
        mimeType: uploadRes.mimeType,
        sizeBytes: uploadRes.sizeBytes,
        text: uploadRes.text,
        previewText: uploadRes.text.slice(0, 500) + '...',
        wordCount: uploadRes.wordCount,
        charCount: uploadRes.charCount,
        pageCountEstimate: uploadRes.pageCountEstimate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        results: {},
        reviewQueue: [],
        chatHistory: []
      };

      onDocumentLoaded(newDoc);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to process document');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePasteSubmit = () => {
    if (!pasteText.trim()) {
      setError('Please enter or paste document text.');
      return;
    }

    const title = pasteTitle.trim() || 'Pasted_Document_' + new Date().toISOString().slice(0, 10) + '.txt';
    const docType = detectDocumentType(pasteText, title);
    const wordCount = pasteText.split(/\s+/).filter(Boolean).length;

    const newDoc: InputEnvelope = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      tenantId: 'tenant-enterprise-01',
      name: title,
      documentType: docType,
      mimeType: 'text/plain',
      sizeBytes: pasteText.length,
      text: pasteText,
      previewText: pasteText.slice(0, 500) + '...',
      wordCount,
      charCount: pasteText.length,
      pageCountEstimate: Math.max(1, Math.ceil(pasteText.length / 2800)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      results: {},
      reviewQueue: [],
      chatHistory: []
    };

    onDocumentLoaded(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-semibold text-white font-display">Ingest & Select Document</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose a pre-formatted benchmark sample, upload a file (PDF, DOCX, Image, TXT), or paste raw text.
            </p>
          </div>
          {canClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/30">
          <button
            onClick={() => setActiveTab('samples')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'samples'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sample Documents (4)</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload File (PDF / DOCX / Image)</span>
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'paste'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            <span>Paste Raw Text</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* SAMPLES TAB */}
          {activeTab === 'samples' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SAMPLE_DOCUMENTS.map((sample) => (
                <div
                  key={sample.id}
                  id={`sample-doc-card-${sample.id}`}
                  onClick={() => handleSelectSample(sample)}
                  className="group relative p-4 rounded-xl bg-slate-950/60 hover:bg-indigo-950/20 border border-slate-800/80 hover:border-indigo-500/50 cursor-pointer transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-slate-800 text-indigo-300 border border-slate-700">
                        {sample.type}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-200 group-hover:text-white line-clamp-1">
                      {sample.name.replace(/\.txt$/, '')}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {sample.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800/50 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{sample.text.split(/\s+/).length} words</span>
                    <span className="text-indigo-400 font-medium group-hover:underline">Load Document →</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* UPLOAD TAB */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />

              <div
                id="file-dropzone"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-500/10 scale-[0.99]'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/70'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-medium text-slate-200">
                  {isUploading ? 'Extracting & Parsing Document Structure...' : 'Drop PDF, DOCX, Scanned Image, or TXT here'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Supports contracts, invoices, resumes, medical protocols, and scans up to 30 MB.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">PDF (.pdf)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Word (.docx)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Images (PNG/JPG)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Text (.txt/.md)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Zero-retention inference. Files are processed in-memory and never cached across tenants.</span>
              </div>
            </div>
          )}

          {/* PASTE TAB */}
          {activeTab === 'paste' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Document Title (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Master Consulting Agreement 2026.txt"
                  value={pasteTitle}
                  onChange={(e) => setPasteTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Paste Document Content</label>
                <textarea
                  rows={8}
                  placeholder="Paste legal contract text, invoice line items, clinical protocol, or unstructured document text here..."
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono-code leading-relaxed"
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  id="process-pasted-doc-btn"
                  onClick={handlePasteSubmit}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ingest & Process Text</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
