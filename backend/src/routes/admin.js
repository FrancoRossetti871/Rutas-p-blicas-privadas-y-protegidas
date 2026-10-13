import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { ROLES, toPublicUser, users } from "../data/users.js";

const router = Router();

// Todas las rutas de este router requieren estar autenticado y tener rol admin.
router.use(requireAuth, requireRole(ROLES.ADMIN));

// GET /api/admin/users — ruta privada protegida por rol.
router.get("/users", (req, res) => {
  res.json({
    message: "Ruta de administrador: solo el rol admin puede ver esto.",
    users: users.map(toPublicUser),
  });
});

export default router;
