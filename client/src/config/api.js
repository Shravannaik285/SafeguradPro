// Base API URL configuration:
// If VITE_API_URL is provided in .env (or Vercel environment variables), use it.
// If empty, requests default to relative paths ("/api/..."), which works seamlessly
// when both frontend and backend are deployed together under the same Vercel domain.
export const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
