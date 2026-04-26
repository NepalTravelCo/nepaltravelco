import { getPublicBackendBaseUrl } from "./backend-url";

/**
 * A bulletproof fetch wrapper for the Nepal Travel Co frontend.
 * Automatically handles base URL, JSON parsing, and error reporting.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getPublicBackendBaseUrl();
  const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      
      console.error(`API Error [${response.status}] ${url}:`, errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json() as T;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error(`Network Error: Could not connect to backend at ${url}. Is the backend server running?`);
    } else {
      console.error(`Fetch Error ${url}:`, error);
    }
    throw error;
  }
}
