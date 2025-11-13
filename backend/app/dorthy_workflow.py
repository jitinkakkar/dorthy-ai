"""
Complete Dorthy AI workflow with multi-agent routing.
This implements the full workflow from your Agent Builder design.
"""

from __future__ import annotations

import logging
import os
from pathlib import Path
from typing import Any

from agents import Runner, RunConfig
from dotenv import load_dotenv
from openai.types.responses import ResponseInputItemParam

from .dorthy_agent import (
    completeness_check,
    gather_more_information,
    program_teaser_agent,
    ask_email,
)

# Load environment variables
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

logger = logging.getLogger(__name__)


async def run_dorthy_workflow(
    conversation_history: list[ResponseInputItemParam],
) -> dict[str, Any]:
    """
    Run the complete Dorthy AI workflow with multi-agent routing.
    
    Workflow:
    1. Run completeness_check to extract user information
    2. If info is complete:
       - Run program_teaser_agent to show potential programs
       - (Future) Offer detailed report via ask_email
    3. If info is incomplete:
       - Run gather_more_information (Dorthy asks questions)
    
    Args:
        conversation_history: List of previous messages in agent input format
        
    Returns:
        Dictionary containing:
        - stage: "gathering_info" | "program_teaser" | "ask_email"
        - response: The agent's response text
        - completeness: The completeness check result (optional)
    """
    
    try:
        # Step 1: Run completeness check to extract user information
        logger.info("Running completeness check...")
        completeness_result = await Runner.run(
            completeness_check,
            input=conversation_history,
            run_config=RunConfig(
                trace_metadata={
                    "__trace_source__": "chatkit",
                    "workflow": "dorthy-ai",
                    "step": "completeness_check",
                }
            ),
        )
        
        # Extract the completeness data
        completeness_data = completeness_result.final_output.model_dump()
        completed_info = completeness_data.get("completed_info", False)
        
        logger.info(f"Completeness check result: completed_info={completed_info}")
        
        # Step 2: Route based on completeness
        if completed_info:
            # Information is complete - show program teaser
            logger.info("Info complete - running program teaser agent...")
            
            program_result = await Runner.run(
                program_teaser_agent,
                input=conversation_history,
                run_config=RunConfig(
                    trace_metadata={
                        "__trace_source__": "chatkit",
                        "workflow": "dorthy-ai",
                        "step": "program_teaser",
                    }
                ),
            )
            
            response_text = program_result.final_output_as(str)
            
            return {
                "stage": "program_teaser",
                "response": response_text,
                "completeness": completeness_data,
            }
            
        else:
            # Information is incomplete - gather more info
            logger.info("Info incomplete - running gather more information agent...")
            
            gather_result = await Runner.run(
                gather_more_information,
                input=conversation_history,
                run_config=RunConfig(
                    trace_metadata={
                        "__trace_source__": "chatkit",
                        "workflow": "dorthy-ai",
                        "step": "gather_info",
                    }
                ),
            )
            
            response_text = gather_result.final_output_as(str)
            
            return {
                "stage": "gathering_info",
                "response": response_text,
                "completeness": completeness_data,
            }
            
    except Exception as e:
        logger.error(f"Error in Dorthy workflow: {e}", exc_info=True)
        raise


async def run_dorthy_workflow_streamed(
    conversation_history: list[ResponseInputItemParam],
) -> tuple[str, Any]:
    """
    Run the workflow and determine which agent to stream.
    
    Returns:
        Tuple of (stage, agent_to_stream) where agent is the Agent object
    """
    
    try:
        # Step 1: Run completeness check (non-streamed, it's fast)
        logger.info("Running completeness check...")
        completeness_result = await Runner.run(
            completeness_check,
            input=conversation_history,
            run_config=RunConfig(
                trace_metadata={
                    "__trace_source__": "chatkit",
                    "workflow": "dorthy-ai",
                    "step": "completeness_check",
                }
            ),
        )
        
        # Extract the completeness data
        completeness_data = completeness_result.final_output.model_dump()
        completed_info = completeness_data.get("completed_info", False)
        
        logger.info(f"Completeness check result: completed_info={completed_info}")
        
        # Step 2: Determine which agent to stream
        if completed_info:
            logger.info("Info complete - will stream program teaser agent")
            return ("program_teaser", program_teaser_agent)
        else:
            logger.info("Info incomplete - will stream gather more information agent")
            return ("gathering_info", gather_more_information)
            
    except Exception as e:
        logger.error(f"Error in Dorthy workflow routing: {e}", exc_info=True)
        raise

