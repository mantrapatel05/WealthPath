from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status

from app.core.security import create_access_token, hash_password, verify_password
from app.db.mongo import get_database
from app.models.user import TokenResponse, UserLogin, UserSignup, serialize_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(payload: UserSignup) -> TokenResponse:
    db = get_database()
    email = payload.email.lower().strip()

    existing_user = await db["users"].find_one({"email": email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered.",
        )

    user_doc = {
        "name": payload.name.strip(),
        "email": email,
        "password_hash": hash_password(payload.password),
        "created_at": datetime.now(timezone.utc),
    }

    result = await db["users"].insert_one(user_doc)
    created_user = await db["users"].find_one({"_id": result.inserted_id})

    access_token = create_access_token(str(created_user["_id"]))
    return TokenResponse(
        access_token=access_token,
        user=serialize_user(created_user),
    )


@router.post("/login", response_model=TokenResponse)
async def login(payload: UserLogin) -> TokenResponse:
    db = get_database()
    email = payload.email.lower().strip()

    user = await db["users"].find_one({"email": email})
    if user is None or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    access_token = create_access_token(str(user["_id"]))
    return TokenResponse(
        access_token=access_token,
        user=serialize_user(user),
    )
