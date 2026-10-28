from fastapi import APIRouter
from backend.models.knowledge_schemas import KnowledgeQueryRequest, KnowledgeQueryResponse
from backend.services.knowledge_engine import knowledge_engine

router = APIRouter(prefix="/knowledge", tags=["Construction Knowledge Assistant"])

@router.post("/query", response_model=KnowledgeQueryResponse)
async def query_knowledge_base(request: KnowledgeQueryRequest):
    """Answers construction queries with building code citations and QA/QC checklists."""
    return knowledge_engine.answer_query(request)
