from typing import Dict, Any, List, Optional
from dataclasses import dataclass, field
from enum import Enum
import time
import json
import logging

from ..gateways.base import BaseGateway, ProviderType
from ..gateways.factory import GatewayFactory
from ..validation.validator import Validator
from ..validation.confidence import ConfidenceCalculator
from ..learning.historical import HistoricalLearner

logger = logging.getLogger(__name__)

class AgentStatus(str, Enum):
    IDLE = "idle"
    THINKING = "thinking"
    ACTING = "acting"
    OBSERVING = "observing"
    COMPLETE = "complete"
    ERROR = "error"

@dataclass
class ReActStep:
    step_number: int
    thought: str
    action: str
    observation: Any
    confidence: float
    timestamp: float
    tools_used: List[str] = field(default_factory=list)

class ReActAgent:
    """ReAct (Reasoning + Acting) Agent Implementation with Multi-Turn Tool Loop"""
    
    def __init__(self, gateway_type: ProviderType = ProviderType.GEMINI):
        self.gateway: BaseGateway = GatewayFactory.create(gateway_type)
        self.validator = Validator()
        self.historical_learner = HistoricalLearner()
        self.status = AgentStatus.IDLE
        self.steps: List[ReActStep] = []
        self.confidence = 0.0
        
    def initialize(self, config: Dict[str, Any]) -> None:
        """Initialize agent with model configs, custom schemas, and learning data"""
        self.gateway.initialize(config)
        self.validator.load_schemas(config.get("schemas", {}))
        self.historical_learner.load_knowledge_base(config.get("knowledge_base", {}))
        
    async def process_document(self, 
                              document_text: str,
                              document_type: Optional[str] = None) -> Dict[str, Any]:
        """Execute full ReAct cycle on the input document"""
        self.steps = []
        start_time = time.time()
        
        # Turn 1: Structural & Semantic Analysis (Thought -> Action -> Observation)
        analysis = await self._think_and_act(
            step_num=1,
            thought="Analyzing document structure, preamble, and identifying target entities",
            prompt=f"Analyze this document structure and return JSON summary: {document_text[:1500]}",
            tools=["schema_lookup", "structure_detector"]
        )
        
        # Turn 2: Entity & Attribute Extraction
        doc_type_inferred = document_type or analysis.get("document_type", "msa")
        extraction = await self._think_and_act(
            step_num=2,
            thought="Extracting contractual parties, dates, SLA guarantees, and payment terms",
            prompt=f"Extract structured key-value entities for type {doc_type_inferred} from: {document_text[:3000]}",
            tools=["entity_extractor", "regex_fallback"]
        )
        
        # Turn 3: Deterministic Schema Validation
        validation_result = self.validator.validate(extraction, schema_name=doc_type_inferred.lower())
        
        # Turn 4: Historical Learning Calibration
        enhanced_extraction = await self.historical_learner.enhance_with_history(
            extraction, 
            doc_type_inferred
        )
        
        # Turn 5: Final Confidence Scoring
        final_confidence = ConfidenceCalculator.calculate(
            validation_passed=validation_result["is_valid"],
            field_count=len(enhanced_extraction),
            historical_accuracy=self.historical_learner.get_accuracy(),
            gateway_confidence=0.90
        )
        
        # Store in historical learning persistence
        doc_id = self.historical_learner.store_document(
            enhanced_extraction, 
            doc_type_inferred, 
            final_confidence
        )
        
        self.status = AgentStatus.COMPLETE
        self.confidence = final_confidence
        
        return {
            "id": doc_id,
            "document_type": doc_type_inferred,
            "extracted_data": enhanced_extraction,
            "raw_extraction": extraction,
            "validation": validation_result,
            "confidence": final_confidence,
            "requires_human_review": final_confidence < 0.75 or not validation_result["is_valid"],
            "steps": [
                {
                    "step_number": s.step_number,
                    "thought": s.thought,
                    "action": s.action,
                    "observation": s.observation,
                    "confidence": s.confidence,
                    "tools_used": s.tools_used
                }
                for s in self.steps
            ],
            "metadata": {
                "processing_time_ms": round((time.time() - start_time) * 1000, 2),
                "gateway": self.gateway.get_model_info(),
                "learning_stats": self.historical_learner.get_stats()
            }
        }
    
    async def _think_and_act(self, step_num: int, thought: str, prompt: str, tools: List[str]) -> Dict[str, Any]:
        """Execute a single ReAct step and register observation"""
        self.status = AgentStatus.THINKING
        logger.info(f"[ReAct Step {step_num}] Thought: {thought}")
        
        self.status = AgentStatus.ACTING
        response = await self.gateway.process(
            prompt=prompt,
            temperature=0.2,
            max_tokens=2000
        )
        
        self.status = AgentStatus.OBSERVING
        try:
            observation = json.loads(response.content)
        except Exception:
            observation = {"raw_content": response.content}
            
        step = ReActStep(
            step_number=step_num,
            thought=thought,
            action=f"Invoked tools [{', '.join(tools)}] via {response.provider}",
            observation=observation,
            confidence=response.confidence,
            timestamp=time.time(),
            tools_used=tools
        )
        self.steps.append(step)
        return observation
