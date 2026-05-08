const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function saveSession(accessToken, user) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("smartInteriorUser", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("smartInteriorUser");
}

function buildUrl(path, params) {
  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

async function request(path, options = {}) {
  const { method = "GET", body, params, headers = {} } = options;
  const token = getAccessToken();
  const requestHeaders = {
    ...headers,
  };

  if (body !== undefined) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  let payload = null;
  const response = await fetch(buildUrl(path, params), {
    method,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }
  }

  if (!response.ok || payload?.success === false) {
    const message = payload?.message || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload?.data ?? null;
}

const apiClient = {
  get(path, params) {
    return request(path, { method: "GET", params });
  },
  post(path, body) {
    return request(path, { method: "POST", body });
  },
  put(path, body) {
    return request(path, { method: "PUT", body });
  },
  delete(path) {
    return request(path, { method: "DELETE" });
  },
};

export default apiClient;
