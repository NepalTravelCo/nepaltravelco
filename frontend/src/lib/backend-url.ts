const LOCAL_BACKEND_URL = "http://localhost:5000";

export function normalizeBackendBaseUrl(value?: string | null): string {
  const raw = (value || "").trim();

  if (!raw) return LOCAL_BACKEND_URL;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

export function getBackendBaseUrl(): string {
  return normalizeBackendBaseUrl(
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || LOCAL_BACKEND_URL
  );
}
