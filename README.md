# TP — Rutas públicas, privadas y protegidas por rol

Aplicación **Backend + Frontend** con autenticación por **JWT** que implementa los tres tipos de rutas pedidos, tanto en la API como en el router del cliente:

| Tipo | Backend (Express) | Frontend (React Router) |
| --- | --- | --- |
| **Pública**: cualquiera puede acceder | `GET /api/public` | `/` (Inicio) |
| **Privada**: solo usuarios autenticados | `GET /api/private/profile` | `/perfil` |
| **Privada por rol**: solo usuarios autenticados con rol `admin` | `GET /api/admin/users` | `/admin` |

## Stack

- **Backend:** Node.js, Express 5, jsonwebtoken, bcryptjs, CORS. Tests con `node:test` + Supertest.
- **Frontend:** React 19, React Router, Vite.

## Usuarios de prueba

| Email | Contraseña | Rol |
| --- | --- | --- |
| admin@demo.com | admin123 | admin |
| usuario@demo.com | usuario123 | user |

Los usuarios están en memoria (`backend/src/data/users.js`) y las contraseñas se guardan hasheadas con bcrypt.

## Cómo funciona

### Backend

- `POST /api/auth/login` valida email y contraseña y devuelve un token JWT con el `id` y el `rol` del usuario.
- El middleware **`requireAuth`** (`backend/src/middleware/auth.js`) lee el header `Authorization: Bearer <token>` y lo verifica. Si falta o es inválido responde **401**.
- El middleware **`requireRole(...roles)`** se usa después de `requireAuth` y responde **403** si el rol del usuario no está permitido.

```js
router.get("/profile", requireAuth, handler);                    // privada
router.use(requireAuth, requireRole(ROLES.ADMIN));               // privada por rol
```

### Frontend

- `AuthContext` guarda el token en `localStorage` y al cargar la app lo valida contra `GET /api/auth/me`.
- **`PrivateRoute`**: si no hay sesión, redirige a `/login` y, después de iniciar sesión, vuelve a la página que se quería abrir.
- **`RoleRoute roles={["admin"]}`**: si no hay sesión, redirige a `/login`; si hay sesión pero el rol no corresponde, redirige a `/no-autorizado`.
- **`PublicOnlyRoute`**: evita mostrar el login a quien ya inició sesión.

```jsx
<Route path="/" element={<Home />} />                       {/* pública */}
<Route element={<PrivateRoute />}>
  <Route path="/perfil" element={<Profile />} />            {/* privada */}
</Route>
<Route element={<RoleRoute roles={["admin"]} />}>
  <Route path="/admin" element={<Admin />} />               {/* privada por rol */}
</Route>
```

La protección real está en el backend: aunque alguien modifique el frontend, la API rechaza los pedidos sin token (401) o sin el rol requerido (403).

## Cómo correrlo localmente

Requisitos: **Node.js 20 o superior**. Se necesitan dos terminales.

**1. Backend** (http://localhost:3000)

```bash
cd backend
npm install
npm run dev
```

**2. Frontend** (http://localhost:5173)

```bash
cd frontend
npm install
npm run dev
```

### Tests del backend

```bash
cd backend
npm test
```

Prueban que la ruta pública responde sin token, que la privada devuelve 401 sin token o con token inválido, y que la de admin devuelve 403 a un usuario con rol `user`.

### Variables de entorno (opcionales)

| Variable | Dónde | Valor por defecto |
| --- | --- | --- |
| `PORT` | backend | `3000` |
| `JWT_SECRET` | backend | clave de desarrollo (cambiarla en producción) |
| `JWT_EXPIRES_IN` | backend | `1h` |
| `CLIENT_URL` | backend | `http://localhost:5173` |
| `VITE_API_URL` | frontend | `http://localhost:3000` |

## Estructura

```
backend/
├── src/
│   ├── app.js               # Express y registro de rutas
│   ├── server.js            # Arranque del servidor
│   ├── config.js
│   ├── data/users.js        # Usuarios y roles
│   ├── middleware/auth.js   # requireAuth y requireRole
│   └── routes/              # auth, public, private, admin
└── test/routes.test.js
frontend/
└── src/
    ├── auth/AuthContext.jsx # Sesión y token
    ├── routes/              # PrivateRoute, RoleRoute, PublicOnlyRoute
    ├── pages/               # Home, Login, Profile, Admin, Unauthorized, NotFound
    └── App.jsx              # Definición del router
```
