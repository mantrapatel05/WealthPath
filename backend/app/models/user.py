from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class UserSignup(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserPublic(BaseModel):
    id: str
    name: str
    email: EmailStr
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic


def serialize_user(user_doc: dict) -> UserPublic:
    return UserPublic(
        id=str(user_doc["_id"]),
        name=user_doc["name"],
        email=user_doc["email"],
        created_at=user_doc["created_at"],
    )
