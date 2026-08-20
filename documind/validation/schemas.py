from typing import Dict, Any

STANDARD_SCHEMAS: Dict[str, Any] = {
    "msa": {
        "title": "Master Services Agreement",
        "type": "object",
        "required": ["parties", "effective_date", "sla"],
        "properties": {
            "parties": {
                "type": "object",
                "properties": {
                    "provider": {"type": "string"},
                    "client": {"type": "string"}
                },
                "required": ["provider", "client"]
            },
            "effective_date": {"type": "string"},
            "agreement_number": {"type": "string"},
            "sla": {
                "type": "object",
                "properties": {
                    "uptime": {"type": "string"},
                    "credit_rate": {"type": "string"}
                }
            }
        }
    },
    "invoice": {
        "title": "Standard Commercial Invoice",
        "type": "object",
        "required": ["invoice_number", "date", "vendor_name", "total_amount"],
        "properties": {
            "invoice_number": {"type": "string"},
            "date": {"type": "string"},
            "vendor_name": {"type": "string"},
            "total_amount": {"type": "string"}
        }
    },
    "contract": {
        "title": "General Contract",
        "type": "object",
        "required": ["parties", "effective_date"],
        "properties": {
            "parties": {"type": "array"},
            "effective_date": {"type": "string"},
            "term_length": {"type": "string"}
        }
    }
}
