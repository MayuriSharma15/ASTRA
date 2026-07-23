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

export async function getResume(token) {
  const response = await fetch(`${API_BASE_URL}/resume`, {
    headers: authHeaders(token),
  });
  return handleResponse(response);
}

export async function updateResume(token, resumeData) {
  const response = await fetch(`${API_BASE_URL}/resume`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(resumeData),
  });
  return handleResponse(response);
}

export async function reviewResume(token) {
  const response = await fetch(`${API_BASE_URL}/resume/review`, {
    method: "POST",
    headers: authHeaders(token),
  });
  return handleResponse(response);
}
