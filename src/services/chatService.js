/**
 * Chat Service (UPGRADED for multi-conversation support)
 * -----------------------------------------------------------------------
 * Matches the backend's conversation-scoped routes.
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

export async function listConversations(token) {
  const response = await fetch(`${API_BASE_URL}/chat/conversations`, {
    headers: authHeaders(token),
  });
  return handleResponse(response);
}

export async function createConversation(token) {
  const response = await fetch(`${API_BASE_URL}/chat/conversations`, {
    method: "POST",
    headers: authHeaders(token),
  });
  return handleResponse(response);
}

export async function getConversationById(token, id) {
  const response = await fetch(`${API_BASE_URL}/chat/conversations/${id}`, {
    headers: authHeaders(token),
  });
  return handleResponse(response);
}

export async function sendMessageToConversation(token, id, content) {
  const response = await fetch(`${API_BASE_URL}/chat/conversations/${id}/message`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ content }),
  });
  return handleResponse(response);
}

export async function deleteConversation(token, id) {
  const response = await fetch(`${API_BASE_URL}/chat/conversations/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handleResponse(response);
}