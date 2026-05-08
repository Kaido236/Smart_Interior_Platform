import apiClient from "./apiClient.js";

export function login(email, password) {
  return apiClient.post("/auth/login", { email, password });
}

export function register(payload) {
  return apiClient.post("/auth/register", payload);
}

export function getCurrentUser() {
  return apiClient.get("/auth/me");
}
