from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

RiskTolerance = Literal["conservative", "moderate", "aggressive"]
InvestmentHorizon = Literal["short_term", "medium_term", "long_term"]
EmploymentStatus = Literal["employed", "self_employed", "student", "retired"]
GoalPriority = Literal["low", "medium", "high"]
DebtType = Literal["credit_card", "student_loan", "mortgage", "other"]


class SavingsGoal(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    target_amount: float = Field(gt=0)
    current_amount: float = Field(default=0, ge=0)
    priority: GoalPriority


class Debt(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    balance: float = Field(gt=0)
    interest_rate: float = Field(ge=0, le=100)
    min_payment: float = Field(gt=0)
    type: DebtType


class FinancialProfileUpsert(BaseModel):
    monthly_income: float = Field(gt=0)
    monthly_expenses: float = Field(ge=0)
    risk_tolerance: RiskTolerance
    investment_horizon: InvestmentHorizon
    savings_goals: list[SavingsGoal] = Field(default_factory=list)
    debts: list[Debt] = Field(default_factory=list)
    age: int = Field(ge=18, le=120)
    employment_status: EmploymentStatus


class FinancialProfileResponse(FinancialProfileUpsert):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime


def serialize_profile(profile_doc: dict) -> FinancialProfileResponse:
    return FinancialProfileResponse(
        id=str(profile_doc["_id"]),
        user_id=str(profile_doc["user_id"]),
        monthly_income=profile_doc["monthly_income"],
        monthly_expenses=profile_doc["monthly_expenses"],
        risk_tolerance=profile_doc["risk_tolerance"],
        investment_horizon=profile_doc["investment_horizon"],
        savings_goals=profile_doc["savings_goals"],
        debts=profile_doc["debts"],
        age=profile_doc["age"],
        employment_status=profile_doc["employment_status"],
        created_at=profile_doc["created_at"],
        updated_at=profile_doc["updated_at"],
    )
