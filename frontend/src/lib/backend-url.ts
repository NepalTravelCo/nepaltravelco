const LOCAL_BACKEND_URL = "http://localhost:5005";

export function normalizeBackendBaseUrl(value?: string | null): string {
  const raw = (value || "").trim();

  if (!raw) return LOCAL_BACKEND_URL;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const withoutTrailingSlash = withProtocol.replace(/\/+$/, "");

  // Allow users to set either base domain or base domain + /api in env vars.
  return withoutTrailingSlash.replace(/\/api$/i, "");
}

export function getBackendBaseUrl(): string {
  return normalizeBackendBaseUrl(
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || LOCAL_BACKEND_URL
  );
}

export function getPublicBackendBaseUrl(): string {
  return normalizeBackendBaseUrl(
    process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || LOCAL_BACKEND_URL
  );
}
