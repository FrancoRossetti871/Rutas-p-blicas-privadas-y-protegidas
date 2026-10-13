import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Después del login vuelve a la página privada que se quiso abrir.
  const redirectTo = location.state?.from?.pathname || "/perfil";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Completá email y contraseña.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h1>Iniciar sesión</h1>
      <form className="card form" onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
          Contraseña
          <input name="password" type="password" autoComplete="current-password" value={form.password} onChange={handleChange} />
        </label>
        {error && <p className="status error" role="alert">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </section>
  );
}
