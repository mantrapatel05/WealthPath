const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api"
).replace(/\/$/, "");

const TOKEN_STORAGE_KEY = "wealthpath_access_token";
const USER_STORAGE_KEY = "wealthpath_user";

export type UserPublic = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
  user: UserPublic;
};

export class ApiError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(detail);
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail =
      data &&
      typeof data === "object" &&
      "detail" in data &&
      typeof data.detail === "string"
        ? data.detail
        : "Request failed.";

    throw new ApiError(response.status, detail);
  }

  return data as T;
}

export async function signupUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  return request<TokenResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function loginUser(input: {
  email: string;
  password: string;
}) {
  return request<TokenResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function fetchProfile(token: string) {
  return request("/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function saveAuthSession(session: TokenResponse) {
  localStorage.setItem(TOKEN_STORAGE_KEY, session.access_token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session.user));
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function getStoredUser(): UserPublic | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserPublic;
  } catch {
    clearAuthSession();
    return null;
  }
}
