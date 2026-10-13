import { startTransition } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // React Router actualiza la ubicación dentro de una transition. Si la sesión
  // se borrara fuera de ella, la ruta privada vería "sin sesión" antes que el
  // cambio de página y mandaría al login. Así ambos cambios se aplican juntos.
  const handleLogout = () => {
    startTransition(() => {
      navigate("/", { replace: true });
      logout();
    });
  };

  return (
    <header className="navbar">
      <nav aria-label="Navegación principal">
        <NavLink to="/" end>Inicio (pública)</NavLink>
        <NavLink to="/perfil">Perfil (privada)</NavLink>
        <NavLink to="/admin">Admin (rol admin)</NavLink>
      </nav>
      <div className="session">
        {isAuthenticated ? (
          <>
            <span>
              {user.name} · <strong>{user.role}</strong>
            </span>
            <button type="button" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <NavLink to="/login">Iniciar sesión</NavLink>
        )}
      </div>
    </header>
  );
}
