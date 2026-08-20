import { DocumentType } from '../types';

export interface SampleDoc {
  id: string;
  name: string;
  type: DocumentType;
  description: string;
  text: string;
}

export const SAMPLE_DOCUMENTS: SampleDoc[] = [
  {
    id: 'sample-msa-contract',
    name: 'Master Services Agreement (MSA) — ApexCloud & NexusCorp.txt',
    type: 'contract',
    description: 'Enterprise B2B Software & Cloud Infrastructure SLA with limitation of liability and auto-renewal clauses.',
    text: `MASTER SERVICES AGREEMENT (MSA)
Effective Date: March 15, 2026
Agreement Number: MSA-2026-98442

PARTIES:
1. ApexCloud Solutions LLC, a Delaware limited liability company, having its principal place of business at 500 Technology Square, Suite 800, Cambridge, MA 02139 ("Service Provider").
2. NexusCorp International Inc., a California corporation, having its principal place of business at 101 Innovation Parkway, San Francisco, CA 94105 ("Client").

RECITALS:
WHEREAS, Service Provider provides enterprise-grade AI document processing and cloud infrastructure services; and
WHEREAS, Client desires to retain Service Provider to provide such services under the terms and conditions outlined herein.

1. SCOPE OF SERVICES & SERVICE LEVEL AGREEMENT (SLA)
1.1 Service Provider shall maintain 99.95% system uptime across all production inference endpoints.
1.2 In the event of system downtime exceeding 0.05% in any calendar month, Service Provider shall credit Client 10% of monthly subscription fees per hour of downtime, capped at 50% of the monthly fee.

2. FEES, BILLING & PAYMENT TERMS
2.1 Client shall pay an annual platform base licensing fee of $120,000 USD, billed quarterly in advance ($30,000 per quarter).
2.2 Variable consumption charges ($0.002 per processed document unit) shall be invoiced monthly in arrears.
2.3 Payment terms: Net 30 days from date of invoice. Late payments shall accrue interest at 1.5% per month or the maximum rate permitted by law.

3. TERM AND AUTOMATIC RENEWAL
3.1 Initial Term: This Agreement commences on March 15, 2026 and continues for twenty-four (24) months until March 14, 2028.
3.2 Automatic Renewal: This Agreement shall AUTOMATICALLY RENEW for successive 12-month periods UNLESS either party delivers written notice of non-renewal at least ninety (90) days prior to the expiration of the current term.

4. LIMITATION OF LIABILITY & INDEMNIFICATION
4.1 NEITHER PARTY SHALL BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM THIS AGREEMENT.
4.2 TOTAL AGGREGATE LIABILITY OF EITHER PARTY SHALL BE STRICTLY CAPPED AT THE TOTAL AMOUNT ACTUALLY PAID BY CLIENT IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
4.3 EXCEPTION: The liability cap shall NOT apply to breaches of Section 5 (Confidentiality & Data Protection) or Section 7 (Gross Negligence and Willful Misconduct).

5. DATA PRIVACY, SECURITY & INTELLECTUAL PROPERTY
5.1 Client retains all right, title, and interest in and to Client Data.
5.2 Service Provider complies with SOC 2 Type II, ISO 27001, and GDPR standards. Service Provider will NOT train public foundation models using Client's proprietary uploaded documents.

6. TERMINATION
6.1 Termination for Cause: Either party may terminate this Agreement immediately upon written notice if the other party materially breaches any provision and fails to cure such breach within thirty (30) days.
6.2 Termination for Convenience: Client may terminate for convenience with 60 days' written notice, subject to an early termination fee equal to 25% of the remaining contract value.

7. GOVERNING LAW & DISPUTE RESOLUTION
7.1 This Agreement shall be governed by and construed under the laws of the State of Delaware without regard to conflict of law principles.
7.2 Any controversy or claim arising out of or relating to this contract shall be settled by binding arbitration in Dover, Delaware before the American Arbitration Association (AAA).

IN WITNESS WHEREOF, the authorized representatives have executed this Agreement as of the Effective Date.

ApexCloud Solutions LLC:
By: Elena Rostova, VP of Enterprise Sales
Date: March 15, 2026

NexusCorp International Inc.:
By: Marcus Vance, Chief Information Officer
Date: March 15, 2026`
  },
  {
    id: 'sample-invoice-cloud',
    name: 'Invoice_INV-2026-08819_DataCore_Systems.txt',
    type: 'invoice',
    description: 'B2B Cloud Computing & GPU Cluster Monthly Billing Invoice with itemized breakdown and payment instructions.',
    text: `INVOICE: INV-2026-08819
DataCore Systems Global Ltd.
100 Silicon Way, Tech Park 4, Austin, TX 78701
Tax ID / EIN: 84-9920194 | VAT ID: US-TX884920

BILL TO:
Acme BioHealth Analytics LLC
Attn: Accounts Payable
450 Research Boulevard, Suite 300, Boston, MA 02115
Client ID: CL-77291
Purchase Order: PO-2026-4401

Invoice Date: August 01, 2026
Payment Due Date: August 31, 2026 (Net 30)
Billing Period: July 01, 2026 - July 31, 2026
Currency: USD ($)

LINE ITEM BREAKDOWN:
Item # | Description | Quantity | Unit Price | Total Amount
1. H100 GPU Dedicated Cluster (8x SXM5) - 744 hrs | 744.0 hrs | $24.50/hr | $18,228.00
2. High-Performance NVMe Shared Storage (50 TB) | 1.0 month | $1,250.00 | $1,250.00
3. Egress Bandwidth Data Transfer (Tier 1 Global) | 14,200 GB | $0.05/GB | $710.00
4. Managed Kubernetes Control Plane (Dedicated HA) | 2 clusters | $350.00 | $700.00
5. Priority 24/7 SRE Enterprise Support Package | 1.0 month | $2,500.00 | $2,500.00

SUBTOTAL: $23,388.00
Discount (Annual Partner Discount 5%): -$1,169.40
Taxable Amount: $22,218.60
Sales Tax (MA State Tax 6.25%): $1,388.66
TOTAL BALANCE DUE: $23,607.26

PAYMENT REMITTANCE INSTRUCTIONS:
Bank: Silicon Valley Commercial Bank
Account Name: DataCore Systems Global Ltd
Account Number: 8830-1928-4491
Routing / ABA: 121000358
SWIFT / BIC: SVCBUS6SXXX
Wire Reference: INV-2026-08819 / CL-77291

Questions? Contact billing@datacoresystems.io or call +1 (800) 555-0199.`
  },
  {
    id: 'sample-resume-engineer',
    name: 'Executive_Resume_Dr_Sophia_Chen_AI_Lead.txt',
    type: 'resume',
    description: 'Senior Staff AI / Machine Learning Architect resume with accomplishments, education, patents, and skills.',
    text: `DR. SOPHIA CHEN, Ph.D.
Principal AI Architect & Distributed Systems Researcher
San Francisco, CA | sophia.chen.ai@example.com | (415) 555-0182 | linkedin.com/in/sophia-chen-ai-eval

EXECUTIVE SUMMARY:
Visionary AI Systems Architect with 12+ years of leadership in designing multi-tenant foundation model inference pipelines, agentic workflow orchestration, and multimodal document understanding engines. Authored 9 peer-reviewed IEEE/NeurIPS papers and granted 4 US patents in distributed transformer caching and low-latency quantization.

CORE COMPETENCIES:
• AI/ML Architecture: LLM Agent Frameworks, Mixture-of-Experts (MoE), Gemini 2.5/3.0, RLHF, Vector Search (pgvector, Qdrant).
• Infrastructure & Distributed Systems: PyTorch, vLLM, TensorRT-LLM, Kubernetes, Ray, Triton Inference Server, CUDA C++.
• Full Stack & Cloud: Python (FastAPI/AnyIO), TypeScript (React, Node.js), Go, GCP (Vertex AI, Cloud Run), AWS (SageMaker), Terraform.

PROFESSIONAL EXPERIENCE:

STAFF PRINCIPAL ARCHITECT | OmniCognition Labs (2022 - Present | San Francisco, CA)
• Spearheaded the design and deployment of an enterprise multi-modal agentic platform processing over 45 million unstructured documents and contracts per quarter with 99.98% SLA compliance.
• Reduced inference latency by 42% and GPU operating cost by $3.4M annually via speculative decoding and flash-attention v3 integration.
• Led a high-performing cross-functional engineering team of 18 PhD researchers, data engineers, and full-stack software architects.

SENIOR LEAD MACHINE LEARNING ENGINEER | DeepVertex Systems (2018 - 2022 | Mountain View, CA)
• Developed automated financial document extraction pipeline extracting 120+ key financial ratios from SEC 10-K and 10-Q filings with 98.6% precision.
• Built low-latency search retrieval system across 100M+ vector embeddings with sub-15ms p99 query latency.

EDUCATION:
• Ph.D. in Computer Science (Artificial Intelligence & Neural Networks) — Stanford University (2014 - 2018)
  Dissertation: "Efficient Context Compression and Retrieval in Multi-Hop Transformer Architectures"
• B.S. in Electrical Engineering & Computer Science (Summa Cum Laude) — UC Berkeley (2010 - 2014)

SELECTED PATENTS & PUBLICATIONS:
• US Patent 11,842,109: "System and Method for Asynchronous Streaming Document Understanding using Hybrid Attention Masks" (Granted 2025)
• NeurIPS 2024: "Self-Verifying Agentic Verification Networks for High-Stakes Contract Adjudication"`
  },
  {
    id: 'sample-clinical-report',
    name: 'Clinical_Trial_Safety_Protocol_Evaluation_Report.txt',
    type: 'report',
    description: 'Biopharmaceutical Phase III Oncology Drug Trial interim safety and biomarker monitoring report.',
    text: `CLINICAL STUDY INTERIM SAFETY MONITORING REPORT
Protocol ID: ONCO-2026-PHASE3-DX8
Study Title: Multicenter, Double-Blind, Randomized Phase III Evaluation of Veltranzib (DX-844) in Advanced Solid Tumors
Date of Review: July 20, 2026
Data Cutoff Date: June 30, 2026
Sponsor: Aeterna Therapeutics Inc.
Monitoring Board: Independent Data Monitoring Committee (IDMC)

1. EXECUTIVE SUMMARY & TRIAL STATUS
• Total Enrolled Patients: 620 across 44 clinical trial sites in North America, Western Europe, and Japan.
• Active Cohort: 412 patients currently receiving treatment (Arm A: Veltranzib 150mg QD + Standard Care, n=208; Arm B: Placebo + Standard Care, n=204).
• Primary Endpoint: Overall Progression-Free Survival (PFS) evaluated by RECIST v1.1.
• Key Secondary Endpoints: Overall Survival (OS), Objective Response Rate (ORR), and Toxicity Profiles.

2. EFFICACY SIGNALS & INTERIM METRICS
• Progression-Free Survival Hazard Ratio (HR): 0.62 (95% CI: 0.49 - 0.78, p < 0.0001), indicating a 38% reduction in risk of disease progression in Arm A compared to Arm B.
• Confirmed Objective Response Rate: 48.6% in Arm A vs 24.1% in Arm B.
• Median Duration of Response: 14.8 months vs 7.2 months.

3. SAFETY & ADVERSE EVENTS (AEs) PROFILE
• Treatment-Emergent Adverse Events (TEAEs): Observed in 88.2% of patients in Arm A vs 79.4% in Arm B.
• Grade 3/4 AEs: 28.4% in Arm A vs 21.6% in Arm B.
  - Most common Grade 3/4 events in Arm A: Thrombocytopenia (8.2%), Fatigue (6.1%), Elevated ALT/AST (5.3%).
• Serious Adverse Events (SAEs) attributed to study drug: 4.3% (9 patients). No Grade 5 (fatal) drug-related toxicities observed.
• Discontinuation due to drug-related toxicity: 5.8% in Arm A vs 3.4% in Arm B.

4. IDMC VERDICT AND RECOMMENDATIONS
• Verdict: The IDMC unanimously recommends that Study ONCO-2026-PHASE3-DX8 CONTINUE WITHOUT PROTOCOL MODIFICATION.
• The benefit-risk profile remains substantially positive and meets pre-specified efficacy hurdle thresholds.
• Next scheduled IDMC Safety Review: January 15, 2027.`
  }
];
