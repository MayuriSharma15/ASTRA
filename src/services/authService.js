/**
 * Auth Service
 * -----------------------------------------------------------------------
 * The ONLY file in the frontend that knows the actual shape of auth API
 * calls (URLs, request bodies, error format). AuthContext calls these
 * functions rather than calling fetch() directly — if the backend's API
 * shape ever changes, this file is the only one that needs to change,
 * not every component that needs auth.
 * ----------------------------------------------------------------------- */

import { API_BASE_URL } from "../config/api";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function registerUser({ name, email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(response);
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
}

export async function fetchCurrentUser(token) {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}