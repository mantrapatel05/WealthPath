'''
Questions to ask:

What's the app called? (name)
Where does data live? (database connection)
How do I authenticate users? (JWT, passwords)
Where is this running? (production vs development)
Who can access this? (CORS origins)
What are the secret keys? (API keys, tokens)
'''
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # app metadata(gen info)
    app_name: str = "WealthPath API"
    environment: str = "development"
    api_prefix: str = "/api"

    # database(where da data lives)
    mongo_uri: str = "mongodb://localhost:27017"
    mongo_db_name: str = "wealthpath"

    # authentication(security)
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 10080

    # security(cors)
    cors_origins: str = "http://localhost:5173,http://localhost:8080,http://127.0.0.1:8080"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
