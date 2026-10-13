import { Router } from "express";

const router = Router();

// GET /api/public — ruta pública, no requiere autenticación.
router.get("/", (req, res) => {
  res.json({
    message: "Ruta pública: cualquiera puede ver este contenido.",
    serverTime: new Date().toISOString(),
  });
});

export default router;
