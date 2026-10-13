import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config.js";
import { findUserByEmail, toPublicUser } from "../data/users.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/login — pública. Devuelve un token si las credenciales son correctas.
router.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  const user = findUserByEmail(email);
  const valid = user && (await bcrypt.compare(password, user.passwordHash));
  if (!valid) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  res.json({ token, user: toPublicUser(user) });
});

// GET /api/auth/me — privada. Devuelve el usuario del token.
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
