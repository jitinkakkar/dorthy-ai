"""
DorthyAssistantServer implements the ChatKitServer interface for home buyer assistance.
"""

from __future__ import annotations

import logging
import os
from datetime import datetime
from typing import Any, AsyncIterator

from chatkit.agents import AgentContext
from chatkit.server import ChatKitServer
from chatkit.types import (
    Action,
    AssistantMessageContent,
    AssistantMessageItem,
    Attachment,
    ThreadItemDoneEvent,
    ThreadMetadata,
    ThreadStreamEvent,
    UserMessageItem,
    WidgetItem,
)
from dotenv import load_dotenv
from openai.types.responses import ResponseInputContentParam

from .memory_store import MemoryStore
from .thread_item_converter import BasicThreadItemConverter

# Load environment variables
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DorthyAssistantServer(ChatKitServer[dict[str, Any]]):
    """ChatKit server for Dorthy AI home buyer assistant."""

    def __init__(self) -> None:
        self.store: MemoryStore = MemoryStore()
        super().__init__(self.store)
        self.thread_item_converter = BasicThreadItemConverter()

        # Verify API key is set
        if not os.getenv("OPENAI_API_KEY"):
            logger.warning("OPENAI_API_KEY not found in environment variables")

    # -- Required overrides ----------------------------------------------------
    async def action(
        self,
        thread: ThreadMetadata,
        action: Action[str, Any],
        sender: WidgetItem | None,
        context: dict[str, Any],
    ) -> AsyncIterator[ThreadStreamEvent]:
        """Handle custom actions from widgets."""
        # Placeholder for future actions (e.g., email submission)
        logger.info(f"Action received: {action.type}")
        return
        yield  # Make this an async generator

    async def respond(
        self,
        thread: ThreadMetadata,
        item: UserMessageItem | None,
        context: dict[str, Any],
    ) -> AsyncIterator[ThreadStreamEvent]:
        """Generate a response to the user's message."""
        # Import here to avoid circular dependency issues
        from .dorthy_workflow import run_dorthy_workflow_streamed

        from agents import Runner
        from chatkit.agents import stream_agent_response

        # Create agent context
        agent_context = AgentContext(
            thread=thread,
            store=self.store,
            request_context=context,
        )

        # Load conversation history from the thread
        items_page = await self.store.load_thread_items(
            thread.id,
            after=None,
            limit=50,  # Load more history for better context
            order="desc",
            context=context,
        )

        # Runner expects the most recent message to be last
        items = list(reversed(items_page.data))

        # Translate ChatKit thread items into agent input
        input_items = await self.thread_item_converter.to_agent_input(items)

        # Update thread title on first interaction
        if not thread.title or thread.title == "New chat":
            thread.title = "Home Buying Journey"
            await self.store.save_thread(thread, context)

        # Run the complete workflow to determine which agent to use
        # This runs completeness_check and returns the appropriate agent
        stage, agent_to_stream = await run_dorthy_workflow_streamed(input_items)
        
        logger.info(f"Workflow routing to stage: {stage}")

        # Stream the selected agent's response
        result = Runner.run_streamed(
            agent_to_stream,
            input_items,
        )

        # Stream the response back to the client
        async for event in stream_agent_response(agent_context, result):
            yield event
        return

    async def to_message_content(self, _input: Attachment) -> ResponseInputContentParam:
        """Handle file attachments - not supported in this demo."""
        raise RuntimeError("File attachments are not currently supported.")


def create_chatkit_server() -> DorthyAssistantServer | None:
    """Return a configured ChatKit server instance for Dorthy AI."""
    try:
        return DorthyAssistantServer()
    except Exception as e:
        logger.error(f"Failed to create Dorthy assistant server: {e}")
        return None

