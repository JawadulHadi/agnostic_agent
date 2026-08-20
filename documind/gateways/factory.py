from typing import Dict, Any
from .base import BaseGateway, ProviderType
from .gemini_gateway import GeminiGateway
from .other_gateways import OpenAIGateway, AnthropicGateway

class GatewayFactory:
    """Factory to instantiate the appropriate LLM provider gateway"""
    
    @staticmethod
    def create(provider_type: ProviderType = ProviderType.GEMINI) -> BaseGateway:
        if provider_type == ProviderType.GEMINI:
            return GeminiGateway()
        elif provider_type == ProviderType.OPENAI:
            return OpenAIGateway()
        elif provider_type == ProviderType.ANTHROPIC:
            return AnthropicGateway()
        else:
            return GeminiGateway()
