import { useApi } from "../useApi.js";
import ApiResult from "../components/ApiResult.jsx";

export default function Profile() {
  const { data, loading, error } = useApi("/api/private/profile");

  return (
    <section>
      <h1>Ruta privada</h1>
      <p>Solo usuarios autenticados pueden ver esta página.</p>
      <ApiResult loading={loading} error={error}>
        <div className="card">
          <p>{data?.message}</p>
          <ul>
            <li><strong>Nombre:</strong> {data?.user.name}</li>
            <li><strong>Email:</strong> {data?.user.email}</li>
            <li><strong>Rol:</strong> {data?.user.role}</li>
          </ul>
        </div>
      </ApiResult>
    </section>
  );
}
