import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";

// Ruta privada: si no hay sesión, redirige al login y recuerda a dónde quería ir.
export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="status">Verificando sesión...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
