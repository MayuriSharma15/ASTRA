/**
 * API configuration
 * -----------------------------------------------------------------------
 * Single source of truth for the backend's base URL. Every service file
 * imports this rather than hardcoding "http://localhost:5000" repeatedly
 * — when this gets deployed (backend on Render, frontend on Vercel),
 * this is the ONE line that changes, via an environment variable.
 * ----------------------------------------------------------------------- */

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";