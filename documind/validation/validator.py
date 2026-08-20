from typing import Dict, Any, List, Optional
from datetime import datetime
from .schemas import STANDARD_SCHEMAS

class Validator:
    """Deterministic JSON Schema & Business Logic Validation Layer"""
    
    def __init__(self):
        self.schemas = STANDARD_SCHEMAS.copy()
        self.version = "1.0.0"
        self.validation_history = []
        
    def load_schemas(self, schema_config: Dict[str, Any]) -> None:
        """Merge additional custom JSON schemas"""
        if schema_config:
            self.schemas.update(schema_config)
        
    def validate(self, 
                data: Dict[str, Any],
                schema_name: Optional[str] = None) -> Dict[str, Any]:
        results = {
            "is_valid": True,
            "errors": [],
            "warnings": [],
            "validation_time": datetime.now().isoformat(),
            "schema_used": schema_name or "auto-detected",
            "field_validations": {},
            "missing_required": []
        }
        
        if not data or not isinstance(data, dict):
            results["is_valid"] = False
            results["errors"].append("Data envelope is empty or malformed")
            return results
            
        target_schema_name = schema_name or self._detect_schema(data)
        schema = self.schemas.get(target_schema_name, self.schemas["msa"])
        results["schema_used"] = target_schema_name
        
        required_fields = schema.get("required", [])
        for field in required_fields:
            if field not in data or data[field] is None:
                results["missing_required"].append(field)
                results["is_valid"] = False
                results["errors"].append(f"Missing mandatory field '{field}'")
            else:
                results["field_validations"][field] = "passed"
                
        total_fields = len(required_fields) or 1
        passed_fields = total_fields - len(results["missing_required"])
        results["field_confidence"] = max(0.1, passed_fields / total_fields)
        
        self.validation_history.append(results)
        return results
    
    def _detect_schema(self, data: Dict[str, Any]) -> str:
        keys = set(data.keys())
        if "invoice_number" in keys or "vendor_name" in keys:
            return "invoice"
        if "sla" in keys or "uptime" in str(data):
            return "msa"
        return "contract"
