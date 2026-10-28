from pydantic import BaseModel, Field
from typing import List, Optional

class SubcontractorTradeCount(BaseModel):
    trade_name: str
    workers_present: int
    shift_hours: float
    work_location: str
    supervisor_in_charge: str

class EquipmentLogItem(BaseModel):
    equipment_tag: str
    equipment_type: str
    hours_operating: float
    hours_idle: float
    diesel_fuel_liters: float
    maintenance_issues: Optional[str] = "None"

class MaterialDeliveryLog(BaseModel):
    material: str
    quantity: str
    supplier: str
    delivery_ticket_no: str
    quality_inspection_status: str

class DailySiteLogRequest(BaseModel):
    project_id: str = "PRJ-901"
    log_date: str
    shift: str = "Day Shift (07:00 - 16:30)"
    weather_summary: str = "Sunny, 28°C, Wind 12 km/h"
    raw_supervisor_notes: str
    subcontractor_headcounts: Optional[List[SubcontractorTradeCount]] = None
    equipment_deployed: Optional[List[EquipmentLogItem]] = None
    material_deliveries: Optional[List[MaterialDeliveryLog]] = None

class DailySiteLogResponse(BaseModel):
    log_id: str
    project_id: str
    log_date: str
    shift: str
    total_manhours_logged: float
    ai_generated_executive_summary: str
    key_milestones_achieved: List[str]
    critical_blockers_and_risks: List[str]
    safety_observations: List[str]
    trades_summary: List[SubcontractorTradeCount]
    equipment_summary: List[EquipmentLogItem]
    materials_received: List[MaterialDeliveryLog]
    next_shift_handover_instructions: List[str]
    compliance_approved: bool
