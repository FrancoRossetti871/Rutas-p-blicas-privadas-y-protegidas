import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <section>
      <h1>Acceso denegado</h1>
      <p>Iniciaste sesión, pero tu rol no tiene permiso para ver esa página.</p>
      <Link to="/perfil">Volver a mi perfil</Link>
    </section>
  );
}
