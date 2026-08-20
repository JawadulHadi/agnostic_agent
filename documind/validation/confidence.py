from typing import Dict, Any

class ConfidenceCalculator:
    """Calculates granular extraction confidence scores based on validation and metadata"""
    
    @staticmethod
    def calculate(
        validation_passed: bool,
        field_count: int,
        historical_accuracy: float,
        gateway_confidence: float = 0.85
    ) -> float:
        score = 0.0
        
        # 1. Validation weight (35%)
        if validation_passed:
            score += 0.35
        else:
            score += 0.10
            
        # 2. Completeness weight (25%)
        completeness = min(1.0, field_count / 5.0)
        score += completeness * 0.25
        
        # 3. Gateway / Model confidence (20%)
        score += gateway_confidence * 0.20
        
        # 4. Historical memory calibration (20%)
        score += historical_accuracy * 0.20
        
        return round(min(0.99, max(0.10, score)), 3)
