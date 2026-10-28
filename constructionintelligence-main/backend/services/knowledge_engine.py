import uuid
from typing import Dict, Any, List
from backend.models.knowledge_schemas import (
    KnowledgeQueryRequest,
    KnowledgeQueryResponse,
    CodeCitation
)

class KnowledgeEngine:
    def answer_query(self, request: KnowledgeQueryRequest) -> KnowledgeQueryResponse:
        qid = f"KNOW-{uuid.uuid4().hex[:8].upper()}"
        q_lower = request.query.lower()

        # Construction knowledge base with domain patterns
        if "slump" in q_lower or "workability" in q_lower or "concrete mix" in q_lower:
            category = "Concrete Materials & QA/QC (ACI / ASTM / IS 456)"
            direct_ans = (
                "For heavily reinforced structural columns and pumpable high-rise concrete (M35 to M50 / C35-45), "
                "the standard design slump is 140 mm to 180 mm (or a slump flow spread of 550 - 650 mm if Self-Consolidating Concrete - SCC is used). "
                "Water-cementitious materials ratio (w/cm) must not exceed 0.40 to prevent bleeding and segregation."
            )
            rationale = (
                "Dense vertical rebar cages require high plastic fluidity to prevent honeycombing and voids around "
                "mechanical couplers. High-range water reducers (polycarboxylate ether superplasticizers) achieve this "
                "without adding excess water, preserving compressive strength and lowering permeability."
            )
            citations = [
                CodeCitation(
                    code_standard="ACI 211.1-91 / ACI 304R-00",
                    section="Section 4.3",
                    title="Guide for Selecting Proportions for Normal and Heavyweight Concrete",
                    clause_snippet="Slump for reinforced foundation walls and columns should range between 100 mm to 175 mm after plasticizer addition.",
                    jurisdiction="United States / International"
                ),
                CodeCitation(
                    code_standard="ASTM C143 / C143M",
                    section="Test Method",
                    title="Standard Test Method for Slump of Hydraulic-Cement Concrete",
                    clause_snippet="Conduct test in 3 equal volume layers, rodding each layer 25 times with standard 16mm tamping rod.",
                    jurisdiction="International Standard"
                ),
                CodeCitation(
                    code_standard="IS 456:2000",
                    section="Table 2, Clause 7.1",
                    title="Workability of Concrete for Heavily Reinforced Sections",
                    clause_snippet="Medium to high workability required: 100-150 mm slump for pumped concrete; 50-100 mm for lightly reinforced sections.",
                    jurisdiction="India (Bureau of Indian Standards)"
                )
            ]
            qa_qc = [
                "Verify delivery ticket timestamp: Discharging must conclude within 90 minutes of initial batch water addition (ASTM C94).",
                "Measure slump on first discharge after 0.25 m³ has been poured.",
                "Take a minimum of 6 compressive strength cylinders (150x300mm or 100x200mm) per 100 m³ pour (test 2 at 7 days, 3 at 28 days, 1 reserve).",
                "Check concrete temperature: Must remain between 10°C and 32°C at point of placement."
            ]
            pitfalls = [
                "Never permit drivers or site crew to add unmetered tempering water to increase slump on-site; this destroys f'c strength.",
                "Avoid over-vibration with needle vibrators which drives coarse aggregate down and bleeds paste to top surfaces."
            ]
            followups = [
                "What is the acceptable tolerance for concrete compressive strength under ACI 318 Section 26.12?",
                "How do mineral admixtures like Fly Ash Class F or Silica Fume influence 56-day strength gain?",
                "What are the stripping time criteria for column formwork versus soffit props?"
            ]

        elif "scaffold" in q_lower or "fall protection" in q_lower or "osha" in q_lower or "safety" in q_lower:
            category = "Construction Site Safety & OSHA Regulations"
            direct_ans = (
                "OSHA 1926.501 requires fall protection (guardrail systems, safety net systems, or personal fall arrest systems - PFAS) "
                "for each employee on a walking/working surface with an unprotected side or edge that is 6 feet (1.8 m) or more above a lower level. "
                "For supported scaffolding (OSHA 1926.451), fall protection is mandatory at 10 feet (3.1 m)."
            )
            rationale = (
                "Falls remain the leading cause of construction fatalities ('Fatal Four'). Compliance requires structural anchors "
                "rated for 5,000 lbs (22.2 kN) per employee attached, or engineered systems designed by a Qualified Person with a safety factor of 2."
            )
            citations = [
                CodeCitation(
                    code_standard="OSHA 29 CFR 1926.501(b)(1)",
                    section="Subpart M",
                    title="Duty to Have Fall Protection - Unprotected Sides and Edges",
                    clause_snippet="Each employee on a walking/working surface with an unprotected side or edge 6 feet or more above lower level shall be protected by guardrail, safety net, or personal fall arrest.",
                    jurisdiction="United States OSHA"
                ),
                CodeCitation(
                    code_standard="OSHA 29 CFR 1926.451(g)(1)",
                    section="Subpart L",
                    title="General Requirements for Scaffolds - Fall Protection",
                    clause_snippet="Each employee on a scaffold more than 10 feet above a lower level shall be protected from falling.",
                    jurisdiction="United States OSHA"
                ),
                CodeCitation(
                    code_standard="IBC 2024 (International Building Code)",
                    section="Section 3306",
                    title="Protection of Pedestrians and Construction Safeguards",
                    clause_snippet="Walkways and protective barriers must withstand minimum lateral impact and falling debris screens.",
                    jurisdiction="International Model Code"
                )
            ]
            qa_qc = [
                "Daily pre-shift scaffolding tag inspection by Competent Person (Green = Safe, Yellow = Caution/Harness Required, Red = Do Not Use).",
                "Ensure guardrails include top rail (42 in ± 3 in), mid-rail (21 in), and minimum 3.5 in toe-board.",
                "Ensure maximum deflection of top rail under 200 lb downward/outward force does not drop below 39 inches.",
                "Inspect synthetic web lanyards for burns, fraying, chemical tears, and ensure snap hooks have double-locking gates."
            ]
            pitfalls = [
                "Attaching fall arrest lanyards to conduit pipes, sprinkler lines, or unsecured scaffolding uprights instead of rated structural anchorages.",
                "Allowing plank spans to overhang scaffold ledgers by more than 12 inches (creates teeter-totter tip hazards)."
            ]
            followups = [
                "What is the required training documentation for employees exposed to fall hazards under 1926.503?",
                "What are the load rating classifications for light-duty vs heavy-duty scaffolding (25 vs 75 lbs/sqft)?",
                "How frequently must personal fall arrest harnesses undergo manufacturer inspection?"
            ]

        elif "curing" in q_lower or "cure time" in q_lower or "stripping" in q_lower:
            category = "Curing Practices & Formwork Removal Times"
            direct_ans = (
                "Under ACI 308R and IS 456, structural concrete must be continuously moist-cured for a minimum of 7 days "
                "for Ordinary Portland Cement (OPC), extended to 10 to 14 days when blended with fly ash, GGBS slag, or pozzolans. "
                "Vertical column forms may be struck at 16 - 24 hours provided ambient temp >= 15°C and concrete reaches 2.5 to 3.0 MPa."
            )
            rationale = (
                "Hydration of alite (C3S) and belite (C2S) requires ongoing water saturation. Premature desiccation causes surface micro-cracking, "
                "loss of abrasion resistance, and drastically elevates carbonation depth over the asset lifecycle."
            )
            citations = [
                CodeCitation(
                    code_standard="ACI 308R-16",
                    section="Section 3.1",
                    title="Guide to External Curing of Concrete",
                    clause_snippet="Curing should begin immediately after finishing before the surface begins to dry. Maintain continuous saturation for at least 7 days.",
                    jurisdiction="United States / International"
                ),
                CodeCitation(
                    code_standard="IS 456:2000",
                    section="Clause 13.5 & Table 11",
                    title="Curing & Period of Removal of Formwork",
                    clause_snippet="Vertical formwork to columns, walls, beams: 16-24 hours. Soffit formwork to slabs: 3 days (props left under 14 days for spans > 4.5m).",
                    jurisdiction="India"
                )
            ]
            qa_qc = [
                "Deploy temperature and maturity sensors (ASTM C1074) within core slabs to track real-time equivalent age and strength gain.",
                "Check that curing membranes comply with ASTM C309 Type 2 white-pigmented liquid membrane forming compounds.",
                "Verify prop re-shoring is never removed until concrete achieves at least 70% of 28-day design compressive strength (f'ck)."
            ]
            pitfalls = [
                "Intermittent wet-and-dry cycling with hoses; thermal shock causes surface crazing and hair-checking.",
                "Stripping slab forms prematurely without re-shoring under high cantilever zones."
            ]
            followups = [
                "How does the Nurse-Saul maturity equation calculate in-place concrete strength for fast stripping?",
                "What is the threshold temperature for cold-weather curing under ACI 306R?"
            ]

        else:
            # Generic civil engineering query handler
            category = "General Civil & Structural Engineering Architecture"
            direct_ans = (
                f"Engineering analysis for: '{request.query}'. Structural building codes mandate compliance with "
                "limit state design criteria (Ultimate Limit State for stability and Serviceability Limit State for deflection/crack width). "
                "Key international benchmarks include IBC 2024, ACI 318-19, AISC 360-16, and EN 1990."
            )
            rationale = (
                "Ensuring structural integrity across environmental load cases (dead, live, seismic, and wind gust pressures) "
                "requires validated material property testing, strict QA/QC compliance, and licensed PE/SE sign-off."
            )
            citations = [
                CodeCitation(
                    code_standard="International Building Code (IBC 2024)",
                    section="Chapter 16 - Structural Design",
                    title="Structural Load Combinations & Risk Categories",
                    clause_snippet="Buildings and structures shall be designed to resist basic load combinations per Section 1605.",
                    jurisdiction="International / North America"
                ),
                CodeCitation(
                    code_standard="ACI 318-19",
                    section="Chapter 26",
                    title="Building Code Requirements for Structural Concrete",
                    clause_snippet="Construction documents shall specify concrete strength, exposure classes, and inspection tolerances.",
                    jurisdiction="International"
                )
            ]
            qa_qc = [
                "Verify structural drawings carry PE/SE registered stamp with current year revision tag.",
                "Review daily non-conformance reports (NCRs) and ensure all engineering deviations have approved RFIs.",
                "Conduct field slump and air-content tests for every ready-mix concrete batch."
            ]
            pitfalls = [
                "Proceeding with construction before receiving formal approved-for-construction (AFC) stamped drawings.",
                "Overlooking local geological and seismic zone micro-zonation adjustments."
            ]
            followups = [
                "What are the specific seismic design category requirements for this site?",
                "What are the required soil compaction tests (ASTM D1557 modified Proctor) for backfill?"
            ]

        return KnowledgeQueryResponse(
            query_id=qid,
            query=request.query,
            domain_category=category,
            direct_answer=direct_ans,
            engineering_rationale=rationale,
            citations=citations,
            qa_qc_checklist=qa_qc,
            common_pitfalls_to_avoid=pitfalls,
            suggested_followups=followups
        )

knowledge_engine = KnowledgeEngine()
