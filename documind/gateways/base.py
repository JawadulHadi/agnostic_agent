from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List
from dataclasses import dataclass, field
from enum import Enum

class ProviderType(str, Enum):
    OPENAI = "openai"
    ANTHROPIC = "anthropic" 
    GEMINI = "gemini"
    GROQ = "groq"
    MOCK = "mock"

@dataclass
class GatewayResponse:
    content: str
    confidence: float
    tokens_used: int
    latency_ms: float
    provider: ProviderType
    raw_response: Optional[Dict[str, Any]] = None

class BaseGateway(ABC):
    """Provider-Agnostic Gateway Interface"""
    
    @abstractmethod
    def initialize(self, config: Dict[str, Any]) -> None:
        """Initialize the gateway with configuration"""
        pass
    
    @abstractmethod
    async def process(self, 
                     prompt: str,
                     system_prompt: Optional[str] = None,
                     temperature: float = 0.3,
                     max_tokens: int = 2000,
                     **kwargs) -> GatewayResponse:
        """Process the request through the gateway"""
        pass
    
    @abstractmethod
    def validate_api_key(self) -> bool:
        """Validate API key is working"""
        pass
    
    @abstractmethod
    def get_model_info(self) -> Dict[str, Any]:
        """Get model capabilities and limitations"""
        pass
