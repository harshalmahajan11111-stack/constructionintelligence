from pydantic import BaseModel, Field
from typing import List, Optional

class CodeCitation(BaseModel):
    code_standard: str
    section: str
    title: str
    clause_snippet: str
    jurisdiction: str

class KnowledgeQueryRequest(BaseModel):
    query: str
    domain_filter: Optional[str] = "All"
    jurisdiction: Optional[str] = "International (IBC / OSHA / IS)"

class KnowledgeQueryResponse(BaseModel):
    query_id: str
    query: str
    domain_category: str
    direct_answer: str
    engineering_rationale: str
    citations: List[CodeCitation]
    qa_qc_checklist: List[str]
    common_pitfalls_to_avoid: List[str]
    suggested_followups: List[str]
