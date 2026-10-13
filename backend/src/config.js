export const PORT = Number(process.env.PORT) || 3000;

// En producción JWT_SECRET tiene que venir de una variable de entorno.
export const JWT_SECRET = process.env.JWT_SECRET || "clave-solo-para-desarrollo";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Origen permitido del frontend para CORS.
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
