import { useApi } from "../useApi.js";
import ApiResult from "../components/ApiResult.jsx";

export default function Home() {
  const { data, loading, error } = useApi("/api/public");

  return (
    <section>
      <h1>Ruta pública</h1>
      <p>Esta página la puede ver cualquier persona, sin iniciar sesión.</p>
      <ApiResult loading={loading} error={error}>
        <div className="card">
          <p>{data?.message}</p>
          <small>Hora del servidor: {data?.serverTime}</small>
        </div>
      </ApiResult>
      <h2>Usuarios de prueba</h2>
      <table>
        <thead>
          <tr><th>Email</th><th>Contraseña</th><th>Rol</th></tr>
        </thead>
        <tbody>
          <tr><td>admin@demo.com</td><td>admin123</td><td>admin</td></tr>
          <tr><td>usuario@demo.com</td><td>usuario123</td><td>user</td></tr>
        </tbody>
      </table>
    </section>
  );
}
