from dataclasses import dataclass, field
from typing import Dict, Any, List, Optional
from ..agents.react_agent import AgentStatus, ReActStep

@dataclass
class AgentState:
    document_id: str
    status: AgentStatus = AgentStatus.IDLE
    steps: List[ReActStep] = field(default_factory=list)
    confidence: float = 0.0
    extracted_data: Dict[str, Any] = field(default_factory=dict)
    errors: List[str] = field(default_factory=list)
