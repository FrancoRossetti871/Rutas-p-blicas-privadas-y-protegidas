import { useApi } from "../useApi.js";
import ApiResult from "../components/ApiResult.jsx";

export default function Admin() {
  const { data, loading, error } = useApi("/api/admin/users");

  return (
    <section>
      <h1>Ruta protegida por rol</h1>
      <p>Solo usuarios autenticados con rol <strong>admin</strong> pueden ver esta página.</p>
      <ApiResult loading={loading} error={error}>
        <div className="card">
          <p>{data?.message}</p>
          <table>
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th></tr>
            </thead>
            <tbody>
              {data?.users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ApiResult>
    </section>
  );
}
