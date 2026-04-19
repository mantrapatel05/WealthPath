from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.core.config import get_settings

client: AsyncIOMotorClient | None = None
database: AsyncIOMotorDatabase | None = None


async def connect_to_mongo() -> None:
    global client, database

    settings = get_settings()
    client = AsyncIOMotorClient(settings.mongo_uri)
    database = client[settings.mongo_db_name]

    await database["users"].create_index("email", unique=True)
    await database["profiles"].create_index("user_id", unique=True)


async def close_mongo_connection() -> None:
    global client, database

    if client is not None:
        client.close()

    client = None
    database = None


def get_database() -> AsyncIOMotorDatabase:
    if database is None:
        raise RuntimeError("Database connection has not been initialized.")
    return database
