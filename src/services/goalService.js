/**
 * Goal Service
 * -----------------------------------------------------------------------
 * Every call requires a token (goals are always user-scoped) — passed
 * explicitly rather than pulled from context internally, keeping this
 * file framework-agnostic and easily testable in isolation.
 * ----------------------------------------------------------------------- */

import { API_BASE_URL } from "../config/api";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getGoals(token) {
  const response = await fetch(`${API_BASE_URL}/goals`, {
    headers: authHeaders(token),
  });
  return handleResponse(response);
}

export async function createGoal(token, label) {
  const response = await fetch(`${API_BASE_URL}/goals`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ label }),
  });
  return handleResponse(response);
}

export async function updateGoal(token, id, updates) {
  const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
}

export async function deleteGoal(token, id) {
  const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handleResponse(response);
}