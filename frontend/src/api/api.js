const BASE_URL = import.meta.env.VITE_API_URL;

async function authfetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const resData = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(resData.message || "API request failed");
  }
  return resData;
}

export function getMe() {
  return authfetch("/api/users/me", { method: "GET" });
}

export async function createUser(userData) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData),
  });
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || "Failed to create user");
  }
  return resData;
}

export async function logInUser(credentials) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "Failed to log in");
  }
  return resData;
}

export async function updateBodyStats(bodyStats, token) {
  const res = await fetch(`${BASE_URL}/api/users/update`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyStats),
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || "Failed to update body stats");
  }
  return resData;
}

export function addConsumedCalories(payload) {
  return authfetch("/api/users/consumed-calories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteConsumedCalories(consumedId) {
  return authfetch(`/api/users/consumed-calories/${consumedId}`, {
    method: "DELETE",
  });
}

export function addExerciseCalories(payload) {
  return authfetch("/api/users/exercise-calories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteExerciseCalories(exerciseId) {
  return authfetch(`/api/users/exercise-calories/${exerciseId}`, {
    method: "DELETE",
  });
}
