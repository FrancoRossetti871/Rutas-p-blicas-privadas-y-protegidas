import bcrypt from "bcryptjs";

// Usuarios de ejemplo en memoria. Las contraseñas se guardan hasheadas,
// nunca en texto plano. En un proyecto real vendrían de una base de datos.
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

const seed = [
  { id: 1, name: "Ana Administradora", email: "admin@demo.com", password: "admin123", role: ROLES.ADMIN },
  { id: 2, name: "Juan Usuario", email: "usuario@demo.com", password: "usuario123", role: ROLES.USER },
];

export const users = seed.map(({ password, ...user }) => ({
  ...user,
  passwordHash: bcrypt.hashSync(password, 10),
}));

export const findUserByEmail = (email) =>
  users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());

export const findUserById = (id) => users.find((u) => u.id === id);

// Devuelve el usuario sin datos sensibles.
export const toPublicUser = ({ passwordHash, ...user }) => user;
