import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";

// Ruta privada protegida por rol: requiere sesión y uno de los roles permitidos.
export default function RoleRoute({ roles }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="status">Verificando sesión...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!roles.includes(user.role)) return <Navigate to="/no-autorizado" replace />;
  return <Outlet />;
}
