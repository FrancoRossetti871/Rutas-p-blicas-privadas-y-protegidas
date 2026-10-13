// Muestra el estado de un pedido al backend.
export default function ApiResult({ loading, error, children }) {
  if (loading) return <p className="status">Cargando...</p>;
  if (error) return <p className="status error">No se pudo conectar con el backend: {error.message}</p>;
  return children;
}
