import { Notebook } from '../types';

export const SEED_NOTEBOOKS: Notebook[] = [
  {
    id: 'nb-documind-agent',
    title: 'DocuMind AI: Agentic Document Ingestion & ReAct Loop',
    description: 'Autonomous multi-turn document understanding engine combining agnostic gateways, deterministic JSON schema validation, and SQLite pattern memory.',
    category: 'featured',
    isFeatured: true,
    publisher: 'DocuMind Research Labs',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    createdAt: 'Aug 20, 2026',
    updatedAt: 'Just now',
    sources: [
      {
        id: 'src-1',
        title: 'Master Services Agreement (MSA) - ApexCloud & NexusCorp',
        type: 'pdf',
        selected: true,
        wordCount: 1420,
        addedAt: 'Aug 20, 2026',
        summary: 'Enterprise cloud infrastructure agreement with 99.95% SLA uptime commitments and $125,000 annual fee.',
        content: `Master Services Agreement (MSA)
Effective Date: March 15, 2026
Agreement Number: MSA-2026-98442
Parties: ApexCloud Solutions LLC (Provider) and NexusCorp International Inc. (Client)

1. Scope of Services:
Provider shall furnish enterprise managed cloud infrastructure, data ingestion pipelines, and 24/7 dedicated site reliability engineering.

2. Service Level Agreement (SLA):
Provider guarantees 99.95% monthly uptime. If uptime drops below 99.95%, Client receives a 10% invoice credit per hour of outage, capped at 50% of the monthly fee.

3. Payment Terms:
Annual subscription fee of $125,000 payable net-30 days upon invoice issuance.

4. Governing Law & Jurisdiction:
This Agreement shall be governed by the laws of the State of Delaware, USA.`
      },
      {
        id: 'src-2',
        title: 'DocuMind ReAct Engine Architecture Whitepaper',
        type: 'doc',
        selected: true,
        wordCount: 2850,
        addedAt: 'Aug 20, 2026',
        summary: 'Technical specification for ReAct multi-turn reasoning, confidence gating (≥75%), and historical learning calibration.',
        content: `DocuMind AI Technical Specification
The ReAct Agent architecture decouples reasoning from external model lock-in using a Provider-Agnostic Gateway (supporting Gemini, OpenAI, Claude, and Groq).
Deterministic validation layers execute JSON Schema AST validation on raw LLM outputs to eliminate hallucinations in mission-critical legal and financial contracts.`
      },
      {
        id: 'src-3',
        title: 'Commercial Invoicing & Payment Schedules 2026',
        type: 'doc',
        selected: true,
        wordCount: 890,
        addedAt: 'Aug 19, 2026',
        summary: 'Invoicing milestones, penalty clauses, and net-30 payment requirements.',
        content: `Commercial Billing Schedule:
- Milestone 1: Platform Ingestion Setup ($45,000)
- Milestone 2: ReAct Pipeline Integration ($50,000)
- Milestone 3: SRE Production Deployment ($30,000)`
      }
    ],
    notes: [
      {
        id: 'note-1',
        title: 'Key SLA & Liability Risk Notes',
        content: '• Provider guarantees 99.95% uptime.\n• Service credits max out at 50%.\n• Governing jurisdiction is Delaware, USA.',
        createdAt: 'Aug 20, 2026, 6:30 AM',
        updatedAt: 'Aug 20, 2026, 6:30 AM',
        tags: ['SLA', 'Legal']
      }
    ],
    chatHistory: [
      {
        id: 'msg-1',
        role: 'assistant',
        content: 'Hello! I am DocuMind AI, your agentic notebook assistant. I have grounded access to all 3 sources in this notebook. What would you like to explore or synthesize today?',
        timestamp: 'Aug 20, 2026, 6:31 AM',
        suggestedPrompts: [
          'What is the SLA uptime guarantee and credit policy?',
          'Run ReAct agent extraction on the MSA contract',
          'Summarize the commercial payment milestones',
          'Generate an executive briefing report'
        ]
      }
    ],
    studioArtifacts: [],
    reactAgentData: {
      documentType: 'msa',
      confidence: 0.92,
      requiresHumanReview: false,
      steps: [
        {
          stepNumber: 1,
          thought: 'Analyzing document structure, preamble, and identifying target entities in MSA...',
          action: "Invoked tool 'schema_lookup' with documentType: 'msa'",
          observation: {
            detectedSchema: 'Master Services Agreement',
            mandatoryFields: ['parties', 'effective_date', 'sla'],
            optionalFields: ['governing_law', 'payment_terms', 'penalties']
          },
          confidence: 0.94,
          toolsUsed: ['schema_lookup', 'structure_detector']
        },
        {
          stepNumber: 2,
          thought: 'Extracting counterparties, execution dates, and SLA uptime commitments...',
          action: "Invoked tool 'parse_structured' with pattern AST mappings",
          observation: {
            parties: 'ApexCloud Solutions LLC & NexusCorp International Inc.',
            effectiveDate: '2026-03-15',
            sla_uptime: '99.95%',
            annual_fee: '$125,000'
          },
          confidence: 0.92,
          toolsUsed: ['parse_structured', 'entity_normalizer']
        },
        {
          stepNumber: 3,
          thought: 'Validating extracted attributes against deterministic JSON Schema constraints...',
          action: "Invoked tool 'validate_field' & 'confidence_check'",
          observation: {
            validationStatus: 'PASSED',
            missingRequired: [],
            typeErrors: 0,
            fieldConfidenceScore: 0.95
          },
          confidence: 0.95,
          toolsUsed: ['validate_field', 'confidence_check']
        },
        {
          stepNumber: 4,
          thought: 'Querying SQLite pattern memory (documind_history.db) for historical SLA precedents...',
          action: "Invoked tool 'search_knowledge' & 'historical_learner'",
          observation: {
            matchedSimilarDocs: 42,
            learnedSlaBenchmark: '99.95% is standard enterprise Tier-1',
            patternWeight: 0.95
          },
          confidence: 0.96,
          toolsUsed: ['historical_learner', 'pattern_matcher']
        }
      ],
      validation: {
        isValid: true,
        errors: [],
        schemaUsed: 'msa_v1.0',
        missingRequired: [],
        fieldConfidence: 0.95
      },
      learningStats: {
        totalDocuments: 1247,
        patternsLearned: 384,
        accuracy: 0.87,
        confidenceAvg: 0.815
      },
      extractedFields: {
        parties: 'ApexCloud Solutions LLC & NexusCorp International Inc.',
        effective_date: '2026-03-15',
        agreement_number: 'MSA-2026-98442',
        sla_uptime: '99.95%',
        annual_fee: '$125,000 / year',
        governing_law: 'Delaware, USA'
      },
      gateway: {
        provider: 'Google Gemini',
        model: 'gemini-2.5-flash',
        capabilities: ['ReAct Agent Loop', 'Multimodal Ingestion', 'Deterministic Fallback']
      }
    }
  },
  {
    id: 'nb-stories-progress',
    title: 'Stories on Progress, from The Atlantic',
    description: 'Deep investigative reporting and economic essays on human progress, scientific breakthroughs, and modern industrialization.',
    category: 'featured',
    isFeatured: true,
    publisher: 'The Atlantic',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    createdAt: 'Apr 11, 2026',
    updatedAt: 'Apr 11, 2026',
    sources: [
      {
        id: 'src-sp-1',
        title: 'The Great Stagnation and the Coming Revival',
        type: 'web',
        selected: true,
        wordCount: 3400,
        addedAt: 'Apr 11, 2026',
        summary: 'Analysis of technological productivity cycles from 1970 to 2026.',
        content: 'Technological progress in software, AI reasoning engines, and clean fusion energy is creating unprecedented gains in global living standards.'
      },
      {
        id: 'src-sp-2',
        title: 'Why Human Progress Is Accelerating',
        type: 'doc',
        selected: true,
        wordCount: 2100,
        addedAt: 'Apr 11, 2026',
        summary: 'Historical metrics on infant mortality, literacy, and global energy access.',
        content: 'Over the last 200 years, global extreme poverty declined from 90% to less than 8.5%, driven by scientific sanitation, antibiotics, and market globalization.'
      }
    ],
    notes: [],
    chatHistory: [],
    studioArtifacts: []
  },
  {
    id: 'nb-digital-health',
    title: 'The Future of Digital Health & AI Diagnostics',
    description: 'Clinical trials, wearable biosensors, and autonomous pathology models revolutionizing preventative medicine.',
    category: 'featured',
    isFeatured: true,
    publisher: 'Axios Healthcare',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    createdAt: 'Apr 9, 2026',
    updatedAt: 'Apr 9, 2026',
    sources: [
      {
        id: 'src-dh-1',
        title: 'FDA Approvals for Agentic Medical Reasoning 2026',
        type: 'pdf',
        selected: true,
        wordCount: 4200,
        addedAt: 'Apr 9, 2026',
        summary: 'Regulatory frameworks for multi-agent diagnostic second opinions in radiology.',
        content: 'New FDA guidance clarifies liability and deterministic validation rules for hospital clinical AI deployments.'
      }
    ],
    notes: [],
    chatHistory: [],
    studioArtifacts: []
  },
  {
    id: 'nb-openstax-biology',
    title: 'OpenStax Biology: Genetics & Cellular Respiration',
    description: 'Standard collegiate curriculum on molecular biology, ATP synthesis, CRISPR-Cas9 gene editing, and cell division.',
    category: 'featured',
    isFeatured: true,
    publisher: 'OpenStax',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
    createdAt: 'Jul 31, 2025',
    updatedAt: 'Jul 31, 2025',
    sources: [
      {
        id: 'src-bio-1',
        title: 'Chapter 7: Cellular Respiration and Glycolysis',
        type: 'doc',
        selected: true,
        wordCount: 5600,
        addedAt: 'Jul 31, 2025',
        summary: 'Aerobic vs anaerobic respiration, citric acid cycle, and oxidative phosphorylation.',
        content: 'Glucose is oxidized to produce 30-32 ATP molecules per cycle through the mitochondrial electron transport chain.'
      }
    ],
    notes: [],
    chatHistory: [],
    studioArtifacts: []
  },
  {
    id: 'nb-earnings-top50',
    title: 'Earnings Reports For Top 50 Tech Companies Q2',
    description: 'Consolidated SEC 10-Q filings, margin expansions, cloud revenue growth rates, and capital expenditure forecasts.',
    category: 'featured',
    isFeatured: true,
    publisher: 'Wall Street Research',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    createdAt: 'Apr 18, 2025',
    updatedAt: 'Apr 18, 2025',
    sources: [
      {
        id: 'src-fin-1',
        title: 'Q2 2026 Mega-Cap Cloud Infrastructure CaPex Analysis',
        type: 'doc',
        selected: true,
        wordCount: 3100,
        addedAt: 'Apr 18, 2025',
        summary: 'Cloud compute capital expenditures surged 44% year-over-year.',
        content: 'Hyperscalers allocated $88B in quarterly CaPex towards next-generation accelerators and optical data center switching.'
      }
    ],
    notes: [],
    chatHistory: [],
    studioArtifacts: []
  },
  {
    id: 'nb-jawad-profile',
    title: 'Professional Profile of Jawad Ul Hadi (AI & Full-Stack)',
    description: 'Curriculum Vitae, architecture design portfolios, ReAct agent prototypes, and production machine learning engineering work.',
    category: 'recent',
    isFeatured: false,
    publisher: 'Personal Portfolio',
    createdAt: 'Aug 19, 2026',
    updatedAt: 'Aug 19, 2026',
    sources: [
      {
        id: 'src-jawad-1',
        title: 'Jawad Ul Hadi - Executive Engineering Resume',
        type: 'pdf',
        selected: true,
        wordCount: 1200,
        addedAt: 'Aug 19, 2026',
        summary: 'Full-stack AI architect specializing in agentic workflows, deterministic validation, TypeScript, and Python.',
        content: 'Senior AI Engineer & Architect with extensive experience delivering agentic ReAct pipelines, multimodal document parsing, and enterprise cloud solutions.'
      }
    ],
    notes: [],
    chatHistory: [],
    studioArtifacts: []
  },
  {
    id: 'nb-claude5-agents',
    title: 'Anthropic Claude 5 Agentic Models & Tool Loops',
    description: 'Research synthesis on reasoning tokens, multi-modal function calling, and structured JSON output guarantees.',
    category: 'recent',
    isFeatured: false,
    publisher: 'Anthropic Research',
    createdAt: 'Aug 12, 2026',
    updatedAt: 'Aug 12, 2026',
    sources: [
      {
        id: 'src-cl5-1',
        title: 'Tool Use & Deterministic JSON Schema Compliance',
        type: 'web',
        selected: true,
        wordCount: 2200,
        addedAt: 'Aug 12, 2026',
        summary: 'Comparing strict schema enforcement vs fallback parsing in LLM agent tool loops.',
        content: 'Strict JSON schema verification guarantees 99.9% error-free downstream database ingestion for agent tool calls.'
      }
    ],
    notes: [],
    chatHistory: [],
    studioArtifacts: []
  }
];
