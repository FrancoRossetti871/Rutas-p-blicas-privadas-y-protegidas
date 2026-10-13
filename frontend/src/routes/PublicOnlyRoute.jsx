import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";

// Para el login: si ya hay sesión, vuelve a la página privada que se quiso
// abrir antes de loguearse (o al perfil si no había ninguna).
export default function PublicOnlyRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="status">Verificando sesión...</p>;
  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || "/perfil"} replace />;
  }
  return <Outlet />;
}
