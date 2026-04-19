from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status

from app.db.mongo import get_database
from app.dependencies.auth import get_current_user
from app.models.profile import (
    FinancialProfileResponse,
    FinancialProfileUpsert,
    serialize_profile,
)

router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("", response_model=FinancialProfileResponse)
async def get_profile(current_user: dict = Depends(get_current_user)) -> FinancialProfileResponse:
    db = get_database()
    profile = await db["profiles"].find_one({"user_id": current_user["_id"]})

    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found.",
        )

    return serialize_profile(profile)


@router.post("", response_model=FinancialProfileResponse)
async def upsert_profile(
    payload: FinancialProfileUpsert,
    current_user: dict = Depends(get_current_user),
) -> FinancialProfileResponse:
    db = get_database()
    now = datetime.now(timezone.utc)

    update_doc = {
        "user_id": current_user["_id"],
        "monthly_income": payload.monthly_income,
        "monthly_expenses": payload.monthly_expenses,
        "risk_tolerance": payload.risk_tolerance,
        "investment_horizon": payload.investment_horizon,
        "savings_goals": [goal.model_dump() for goal in payload.savings_goals],
        "debts": [debt.model_dump() for debt in payload.debts],
        "age": payload.age,
        "employment_status": payload.employment_status,
        "updated_at": now,
    }

    existing_profile = await db["profiles"].find_one({"user_id": current_user["_id"]})

    if existing_profile:
        await db["profiles"].update_one(
            {"_id": existing_profile["_id"]},
            {"$set": update_doc},
        )
        profile = await db["profiles"].find_one({"_id": existing_profile["_id"]})
        return serialize_profile(profile)

    update_doc["created_at"] = now
    result = await db["profiles"].insert_one(update_doc)
    created_profile = await db["profiles"].find_one({"_id": result.inserted_id})
    return serialize_profile(created_profile)
