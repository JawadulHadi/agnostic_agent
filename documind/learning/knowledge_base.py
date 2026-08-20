from typing import Dict, Any, List

class KnowledgeBase:
    """In-memory domain knowledge & few-shot examples for agentic grounding"""
    
    @staticmethod
    def get_few_shot_examples(doc_type: str) -> List[Dict[str, Any]]:
        if doc_type == "invoice":
            return [
                {
                    "input": "Invoice # INV-2024-001 issued 01/10/2024 by Acme Services Total $5,000",
                    "output": {"invoice_number": "INV-2024-001", "date": "2024-01-10", "vendor_name": "Acme Services", "total_amount": "$5,000.00"}
                }
            ]
        return [
            {
                "input": "Master Services Agreement between ApexCloud and NexusCorp effective March 15, 2026",
                "output": {"parties": {"provider": "ApexCloud Solutions LLC", "client": "NexusCorp International Inc."}, "effective_date": "2026-03-15"}
            }
        ]
