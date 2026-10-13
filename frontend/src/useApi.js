import { useEffect, useState } from "react";
import { apiFetch } from "./api.js";
import { useAuth } from "./auth/AuthContext.jsx";

// Pide datos al backend usando el token de la sesión actual.
export function useApi(path) {
  const { token } = useAuth();
  const [state, setState] = useState({ data: null, error: null, loading: true });

  useEffect(() => {
    let active = true;
    setState({ data: null, error: null, loading: true });
    apiFetch(path, { token })
      .then((data) => active && setState({ data, error: null, loading: false }))
      .catch((error) => active && setState({ data: null, error, loading: false }));
    return () => {
      active = false;
    };
  }, [path, token]);

  return state;
}
