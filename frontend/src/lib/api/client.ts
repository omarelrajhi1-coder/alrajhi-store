/** Browser/server fetch wrapper for the ALRAJHI API. Unwraps the standard envelope. */
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: unknown) {
    super(message);
  }
}

export interface PageMeta { page: number; limit: number; total: number; pages: number; }
export interface ApiEnvelope<T> { success: boolean; data?: T; meta?: PageMeta; error?: { code: string; message: string; details?: unknown }; }

// Endpoints that must NEVER trigger the auto-refresh flow (avoids loops).
const AUTH_PATHS = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"];

// Dedupe concurrent refreshes: many queries can 401 at once — refresh only once.
let refreshInFlight: Promise<boolean> | null = null;
async function refreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = fetch(`${BASE}/auth/refresh`, { method: "POST", credentials: "include" })
      .then((r) => r.ok)
      .catch(() => false)
      .finally(() => { refreshInFlight = null; });
  }
  return refreshInFlight;
}

function buildUrl(path: string, params?: Record<string, unknown>): string {
  const url = new URL(path.startsWith("http") ? path : `${BASE}${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

async function rawFetch(url: string, init?: RequestInit): Promise<Response> {
  return fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
}

async function request<T>(path: string, init?: RequestInit & { params?: Record<string, unknown> }): Promise<{ data: T; meta?: PageMeta }> {
  const url = buildUrl(path, init?.params);
  let res = await rawFetch(url, init);

  // Access token expired → refresh once (using the 7-day refresh cookie) and retry.
  if (res.status === 401 && !AUTH_PATHS.some((p) => path.includes(p))) {
    const ok = await refreshSession();
    if (ok) res = await rawFetch(url, init);
  }

  let body: ApiEnvelope<T> | null = null;
  try { body = (await res.json()) as ApiEnvelope<T>; } catch { /* empty body (204) */ }
  if (!res.ok || (body && body.success === false)) {
    const err = body?.error;
    throw new ApiError(res.status, err?.code ?? "ERROR", err?.message ?? "حدث خطأ", err?.details);
  }
  return { data: (body?.data as T) ?? (undefined as T), meta: body?.meta };
}

export const api = {
  get: <T>(path: string, params?: Record<string, unknown>) => request<T>(path, { method: "GET", params }),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) => request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
