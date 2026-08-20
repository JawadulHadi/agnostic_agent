import asyncio
import sys
import os

# Add root directory to python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from documind.agents.react_agent import ReActAgent
from documind.gateways.base import ProviderType

async def test_react_agent():
    print("Testing DocuMind Agentic ReAct Engine...")
    agent = ReActAgent(gateway_type=ProviderType.GEMINI)
    agent.initialize({
        "model": "gemini-2.5-flash"
    })
    
    sample_text = """
    Master Services Agreement (MSA)
    Effective Date: March 15, 2026
    Agreement Number: MSA-2026-98442
    Parties: ApexCloud Solutions LLC (Provider) and NexusCorp International Inc. (Client)
    Scope: Enterprise Managed Cloud Infrastructure & Data Ingestion Pipeline.
    Service Level Agreement (SLA): Provider guarantees 99.95% monthly uptime.
    Payment: Annual subscription fee of $125,000 payable net-30 days.
    """
    
    result = await agent.process_document(sample_text, document_type="msa")
    
    print("\n--- REASONING TRACE (ReAct Steps) ---")
    for step in result["steps"]:
        print(f"Step {step['step_number']}: {step['thought']}")
        print(f"  Action: {step['action']}")
        print(f"  Confidence: {step['confidence']}")
        
    print("\n--- EXTRACTION RESULTS ---")
    print(f"Document Type: {result['document_type']}")
    print(f"Overall Confidence: {result['confidence'] * 100}%")
    print(f"Requires Human Review: {result['requires_human_review']}")
    print(f"Learning Database Stats: {result['metadata']['learning_stats']}")
    assert result["confidence"] > 0.70
    assert len(result["steps"]) >= 2
    print("\n✅ Agent test passed successfully!")

if __name__ == "__main__":
    asyncio.run(test_react_agent())
