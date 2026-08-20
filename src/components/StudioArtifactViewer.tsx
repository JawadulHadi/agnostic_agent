import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  FileText,
  HelpCircle,
  BarChart3,
  Layers,
  Bot
} from 'lucide-react';
import { StudioArtifactType, Notebook } from '../types';

interface StudioArtifactViewerProps {
  type: StudioArtifactType;
  notebook: Notebook;
  onClose: () => void;
}

export const StudioArtifactViewer: React.FC<StudioArtifactViewerProps> = ({
  type,
  notebook,
  onClose
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const slides = [
    {
      title: notebook.title,
      subtitle: 'DocuMind Executive Synthesis & ReAct Overview',
      points: [
        'Autonomous extraction across multiple grounded document sources',
        'Deterministic JSON schema guardrails preventing LLM hallucination',
        'Service Level Agreement (SLA) & commercial liability breakdown'
      ]
    },
    {
      title: 'Contractual Commitments & SLA Guarantees',
      subtitle: 'ApexCloud Solutions LLC & NexusCorp International',
      points: [
        '99.95% monthly uptime guarantee enforced by automated monitoring',
        '10% invoice credit per hour of outage, capped at 50% monthly limit',
        'Annual contract value: $125,000 / year (Net-30 payment term)'
      ]
    },
    {
      title: 'Agentic Pipeline Performance',
      subtitle: 'Telemetry & Historical Calibration',
      points: [
        'Over 1,247 documents ingested into persistent SQLite memory',
        'Confidence score threshold ≥ 75% for zero-human-intervention pass',
        'Multi-gateway fallback: Gemini 2.5 Flash, OpenAI GPT-4o, Claude 3.5'
      ]
    }
  ];

  const flashcards = [
    {
      front: 'What is the guaranteed SLA uptime in the MSA contract?',
      back: '99.95% monthly uptime. If dropped below, Client receives a 10% invoice credit per hour up to 50% max.'
    },
    {
      front: 'What are the annual contract fees and payment schedules?',
      back: '$125,000 annual subscription fee payable within net-30 days of invoice issuance.'
    },
    {
      front: 'What is the role of the Provider-Agnostic Gateway?',
      back: 'Enables seamless switching between Gemini, OpenAI, Claude, and Groq without changing downstream business logic.'
    },
    {
      front: 'How does DocuMind eliminate hallucinations in legal contracts?',
      back: 'Via deterministic JSON Schema AST validators that enforce exact schema compliance before database commits.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What happens if SLA uptime drops below 99.95% in the MSA contract?',
      options: [
        'Immediate termination of the contract',
        '10% invoice credit per hour of outage, capped at 50%',
        'Free cloud credits for the next 3 years',
        'No penalty applies'
      ],
      correct: 1
    },
    {
      question: 'What is the minimum confidence threshold required before flagging for human review?',
      options: ['50%', '65%', '75%', '90%'],
      correct: 2
    },
    {
      question: 'Which database retains historical learning pattern memory across sessions?',
      options: ['redis_cache.dump', 'documind_history.db (SQLite)', 'mongodb_atlas', 'local_cookie'],
      correct: 1
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7 text-slate-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white capitalize">
                {type.replace(/_/g, ' ')}
              </h2>
              <p className="text-[11px] text-slate-400 truncate max-w-sm">
                Generated from {notebook.sources.length} sources in <span className="text-slate-200 font-medium">{notebook.title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            title="Close studio output"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body based on Studio Type */}
        <div className="flex-1 overflow-y-auto py-5">
          {/* 1. Audio Overview Podcast Player */}
          {type === 'audio_overview' && (
            <div className="space-y-6 text-center max-w-lg mx-auto py-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-xl">
                <Volume2 className="w-10 h-10 animate-pulse" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Deep Dive Podcast: {notebook.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Host 1 (Alex) &amp; Host 2 (Maya) synthesize the key findings</p>
              </div>

              {/* Simulated Waveform */}
              <div className="flex items-center justify-center gap-1 h-12 px-4">
                {[40, 65, 80, 45, 95, 75, 50, 85, 60, 90, 70, 40, 80, 95, 60, 45, 70, 85, 55, 75].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isPlayingAudio ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                    }`}
                    style={{ height: isPlayingAudio ? `${h}%` : '30%' }}
                  />
                ))}
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  title={isPlayingAudio ? 'Pause audio' : 'Play podcast'}
                  className="w-12 h-12 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center shadow-lg transition"
                >
                  {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
              </div>

              <div className="text-left bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <p><span className="font-semibold text-cyan-400">Alex:</span> "Welcome back to the deep dive! Today we're analyzing the enterprise cloud contract and the ReAct architecture."</p>
                <p><span className="font-semibold text-indigo-400">Maya:</span> "That's right! What stood out immediately is the 99.95% uptime guarantee paired with deterministic schema validation."</p>
              </div>
            </div>
          )}

          {/* 2. Slide Deck */}
          {type === 'slide_deck' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 min-h-[280px] flex flex-col justify-between shadow-md">
                <div>
                  <span className="text-[10px] uppercase font-mono text-cyan-400 tracking-wider">
                    Slide {currentSlide + 1} of {slides.length}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{slides[currentSlide].title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{slides[currentSlide].subtitle}</p>

                  <ul className="mt-6 space-y-3">
                    {slides[currentSlide].points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-500">
                  <span>DocuMind Studio</span>
                  <span className="font-mono">{notebook.title.slice(0, 30)}...</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200 disabled:opacity-40 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="flex gap-1">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                        currentSlide === i ? 'bg-cyan-400 scale-125' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                  disabled={currentSlide === slides.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200 disabled:opacity-40 flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 3. Mind Map */}
          {type === 'mind_map' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
                {/* Root Node */}
                <div className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md mb-6">
                  {notebook.title}
                </div>

                {/* Sub Nodes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2">
                    <h4 className="text-xs font-semibold text-cyan-400">1. Legal &amp; SLA</h4>
                    <ul className="text-[11px] text-slate-300 space-y-1">
                      <li>• 99.95% Monthly Uptime</li>
                      <li>• 10% Outage Credits</li>
                      <li>• Delaware Jurisdiction</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2">
                    <h4 className="text-xs font-semibold text-indigo-400">2. Commercial Terms</h4>
                    <ul className="text-[11px] text-slate-300 space-y-1">
                      <li>• $125,000 Annual Fee</li>
                      <li>• Net-30 Invoicing</li>
                      <li>• 3 Milestone Deliverables</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2">
                    <h4 className="text-xs font-semibold text-emerald-400">3. ReAct Intelligence</h4>
                    <ul className="text-[11px] text-slate-300 space-y-1">
                      <li>• Multi-Turn Reasoning</li>
                      <li>• JSON Schema AST Check</li>
                      <li>• SQLite Pattern Memory</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Flashcards */}
          {type === 'flashcards' && (
            <div className="space-y-4 max-w-lg mx-auto">
              <div 
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 min-h-[220px] flex flex-col justify-between cursor-pointer text-center shadow-lg transition"
              >
                <div className="text-[10px] font-mono text-cyan-400 uppercase">
                  Card {currentCard + 1} of {flashcards.length} • {isCardFlipped ? 'Answer (Click to Flip)' : 'Question (Click to Flip)'}
                </div>

                <div className="text-sm sm:text-base font-semibold text-white my-auto">
                  {isCardFlipped ? flashcards[currentCard].back : flashcards[currentCard].front}
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  <span>Click anywhere to flip</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsCardFlipped(false);
                    setCurrentCard(Math.max(0, currentCard - 1));
                  }}
                  disabled={currentCard === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200 disabled:opacity-40 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev Card
                </button>
                <button
                  onClick={() => {
                    setIsCardFlipped(false);
                    setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1));
                  }}
                  disabled={currentCard === flashcards.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200 disabled:opacity-40 flex items-center gap-1"
                >
                  Next Card <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 5. Interactive Quiz */}
          {type === 'quiz' && (
            <div className="space-y-6">
              {quizQuestions.map((q, qIndex) => {
                const selected = selectedQuizAnswers[qIndex];
                return (
                  <div key={qIndex} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs sm:text-sm font-semibold text-white">
                      {qIndex + 1}. {q.question}
                    </h4>

                    <div className="space-y-2">
                      {q.options.map((opt, optIndex) => {
                        const isChosen = selected === optIndex;
                        const isCorrect = optIndex === q.correct;
                        const hasAnswered = selected !== undefined;

                        let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                        if (hasAnswered) {
                          if (isCorrect) style = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-semibold';
                          else if (isChosen) style = 'bg-red-950/80 border-red-500 text-red-300';
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => setSelectedQuizAnswers({ ...selectedQuizAnswers, [qIndex]: optIndex })}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 6. Executive Report & Other Types */}
          {(type === 'report' || type === 'infographic' || type === 'data_table' || type === 'react_trace') && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-xs text-slate-200 space-y-4 font-mono leading-relaxed">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-cyan-400 font-bold">DOCUMIND AI EXECUTIVE SYNTHESIS REPORT</span>
                <button
                  onClick={() => handleCopy('Executive Synthesis Report generated by DocuMind AI...')}
                  className="flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div>
                <h4 className="text-white font-bold mb-1">1. EXECUTIVE SUMMARY</h4>
                <p className="text-slate-300">
                  Grounded multi-source extraction confirmed valid contract execution for enterprise cloud services with guaranteed 99.95% availability and deterministic schema verification.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-1">2. KEY ENTITIES &amp; VALUATION</h4>
                <p className="text-slate-300">
                  • Counterparties: ApexCloud Solutions LLC &amp; NexusCorp International Inc.<br/>
                  • Effective Date: March 15, 2026<br/>
                  • Annual Fee: $125,000 / year<br/>
                  • SLA: 99.95% with 10% hourly credit cap up to 50%
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-1">3. REACT REASONING &amp; CALIBRATION</h4>
                <p className="text-slate-300">
                  Confidence calibrated at 92.4% (Threshold: ≥75%). Status: Zero human review required.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
