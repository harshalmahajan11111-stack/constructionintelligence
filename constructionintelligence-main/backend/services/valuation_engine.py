import uuid
from backend.models.valuation_schemas import (
    RealEstateValuationRequest,
    RealEstateValuationResponse,
    ValuationFactor,
    ComparableProperty
)

class ValuationEngine:
    def estimate_valuation(self, request: RealEstateValuationRequest) -> RealEstateValuationResponse:
        valuation_id = f"VAL-{uuid.uuid4().hex[:8].upper()}"
        area = request.built_up_area_sqft

        # Base rate according to location tier
        tier_base_rates = {
            "Tier 1 Prime CBD": 420.0,
            "Tier 2 Suburban Hub": 260.0,
            "Tier 3 Emerging Urban": 165.0
        }
        base_rate = tier_base_rates.get(request.location_tier, 320.0)

        # Construction grade multiplier
        grade_multipliers = {
            "Grade A+ Luxury Commercial": 1.45,
            "Grade A Standard": 1.20,
            "Grade B Semi-Commercial": 1.00,
            "Grade C Budget": 0.82
        }
        grade_mult = grade_multipliers.get(request.construction_grade, 1.25)

        # Stage multiplier
        stage_multipliers = {
            "Pre-construction": 0.35,
            "Earthwork": 0.50,
            "Structural Framework 75% Complete": 0.85,
            "MEP & Finishing": 0.95,
            "Ready for Occupancy": 1.00
        }
        stage_mult = stage_multipliers.get(request.current_stage, 0.88)

        # Floor rise bonus: taller commercial buildings in CBD command higher per-sqft floor premiums
        floor_rise_premium_rate = max(0, (request.number_of_floors - 5) * 1.8)

        # ESG LEED certification premium
        leed_premiums = {
            "None": 0.0,
            "LEED Silver": 18.0,
            "LEED Gold Candidate": 35.0,
            "LEED Gold": 42.0,
            "LEED Platinum": 65.0,
            "BREEAM": 30.0
        }
        leed_rate = leed_premiums.get(request.smart_building_certification, 25.0)

        # Effective per sqft rate
        final_price_per_sqft = round((base_rate * grade_mult * stage_mult) + floor_rise_premium_rate + leed_rate, 2)
        total_value = round(final_price_per_sqft * area, 2)

        # Range bounds (+/- 6.5%)
        range_min = round(total_value * 0.935, 2)
        range_max = round(total_value * 1.065, 2)

        # Detailed valuation factor decomposition
        base_contrib = round(base_rate * area * stage_mult, 2)
        quality_contrib = round((grade_mult - 1.0) * base_rate * area * stage_mult, 2)
        floor_contrib = round(floor_rise_premium_rate * area, 2)
        leed_contrib = round(leed_rate * area, 2)
        parking_contrib = round(request.parking_bays * 28000.0, 2)

        factors = [
            ValuationFactor(
                factor_name="Base Geographic Location Index",
                weight_percentage=42.0,
                contribution_amount_usd=base_contrib,
                description=f"Reflects prime metropolitan asset valuation in {request.location_tier}."
            ),
            ValuationFactor(
                factor_name="Construction Spec & Grade A+ Premium",
                weight_percentage=26.0,
                contribution_amount_usd=quality_contrib,
                description="Enhanced architectural facade, high-strength concrete, seismic dampening, and high-speed elevators."
            ),
            ValuationFactor(
                factor_name="Vertical Elevation / Floor Rise Premium",
                weight_percentage=12.0,
                contribution_amount_usd=floor_contrib,
                description=f"Appreciation curve across {request.number_of_floors} storeys with skyline panoramic visibility."
            ),
            ValuationFactor(
                factor_name="ESG & Smart Building Energy Rating",
                weight_percentage=8.0,
                contribution_amount_usd=leed_contrib,
                description=f"Net zero carbon operational efficiency premium for {request.smart_building_certification} status."
            ),
            ValuationFactor(
                factor_name="Dedicated Subterranean Parking Assets",
                weight_percentage=12.0,
                contribution_amount_usd=parking_contrib,
                description=f"Structured valuation for {request.parking_bays} multi-level EV-ready parking stalls."
            )
        ]

        comparables = [
            ComparableProperty(
                property_name="Equinox Financial Tower",
                distance_km=0.8,
                built_up_area_sqft=210000,
                sale_price_usd=108500000,
                price_per_sqft=516.67,
                completion_year=2024,
                similarity_index=0.94
            ),
            ComparableProperty(
                property_name="Aurora Sky Plaza",
                distance_km=1.4,
                built_up_area_sqft=175000,
                sale_price_usd=87200000,
                price_per_sqft=498.28,
                completion_year=2023,
                similarity_index=0.91
            ),
            ComparableProperty(
                property_name="Vanguard Technology Hub",
                distance_km=2.1,
                built_up_area_sqft=240000,
                sale_price_usd=114000000,
                price_per_sqft=475.00,
                completion_year=2025,
                similarity_index=0.87
            )
        ]

        verdict = (
            f"Asset demonstrates superior capital retention and strong absorption potential. "
            f"At ${final_price_per_sqft:,.2f}/sqft, the property is priced competitively within prime comps while "
            f"securing an 8.2% cap rate upon full tenancy."
        )

        risk_assessment = (
            "LOW-TO-MODERATE: Market fundamentals in CBD remain resilient. Key sensitivity is completion timeline "
            "and material inflation on MEP packages."
        )

        return RealEstateValuationResponse(
            valuation_id=valuation_id,
            project_title=request.property_title,
            estimated_total_value_usd=total_value,
            value_range_min_usd=range_min,
            value_range_max_usd=range_max,
            price_per_sqft_usd=final_price_per_sqft,
            construction_cost_ratio=0.58,
            land_value_contribution_usd=round(total_value * 0.32, 2),
            depreciation_deduction_usd=round(total_value * 0.04, 2),
            esg_leed_premium_usd=leed_contrib,
            factors_breakdown=factors,
            comparables=comparables,
            roi_projection_5yr_annualized=14.2,
            valuation_verdict=verdict,
            risk_assessment=risk_assessment
        )

valuation_engine = ValuationEngine()
