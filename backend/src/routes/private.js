import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/private/profile — ruta privada, solo usuarios autenticados.
router.get("/profile", requireAuth, (req, res) => {
  res.json({
    message: `Ruta privada: hola ${req.user.name}, estás autenticado.`,
    user: req.user,
  });
});

export default router;
