const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Hace un pedido al backend agregando el token si existe.
export async function apiFetch(path, { token, ...options } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || `Error ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return data;
}
