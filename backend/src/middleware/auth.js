import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { findUserById, toPublicUser } from "../data/users.js";

// Ruta privada: exige un token JWT válido en el header Authorization.
export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "No autenticado: falta el token" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = findUserById(payload.sub);
    if (!user) {
      return res.status(401).json({ error: "No autenticado: el usuario no existe" });
    }
    req.user = toPublicUser(user);
    next();
  } catch {
    return res.status(401).json({ error: "No autenticado: token inválido o vencido" });
  }
};

// Ruta protegida por rol: se usa después de requireAuth.
export const requireRole =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "No autenticado" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Acceso denegado: no tenés el rol requerido" });
    }
    next();
  };
