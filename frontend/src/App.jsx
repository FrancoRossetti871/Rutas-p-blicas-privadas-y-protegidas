import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import RoleRoute from "./routes/RoleRoute.jsx";
import PublicOnlyRoute from "./routes/PublicOnlyRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/Admin.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/no-autorizado" element={<Unauthorized />} />
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Rutas privadas: requieren sesión */}
          <Route element={<PrivateRoute />}>
            <Route path="/perfil" element={<Profile />} />
          </Route>

          {/* Rutas privadas protegidas por rol */}
          <Route element={<RoleRoute roles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
