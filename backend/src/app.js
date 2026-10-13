import express from "express";
import cors from "cors";
import { CLIENT_URL } from "./config.js";
import authRoutes from "./routes/auth.js";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/private", privateRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
