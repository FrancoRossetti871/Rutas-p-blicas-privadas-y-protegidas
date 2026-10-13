import { test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

const login = async (email, password) => {
  const res = await request(app).post("/api/auth/login").send({ email, password });
  return res.body.token;
};

test("ruta pública responde sin token", async () => {
  const res = await request(app).get("/api/public");
  assert.equal(res.status, 200);
});

test("login rechaza credenciales incorrectas", async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@demo.com", password: "mala" });
  assert.equal(res.status, 401);
});

test("ruta privada rechaza sin token (401)", async () => {
  const res = await request(app).get("/api/private/profile");
  assert.equal(res.status, 401);
});

test("ruta privada rechaza un token inválido (401)", async () => {
  const res = await request(app)
    .get("/api/private/profile")
    .set("Authorization", "Bearer token-falso");
  assert.equal(res.status, 401);
});

test("ruta privada permite a un usuario autenticado", async () => {
  const token = await login("usuario@demo.com", "usuario123");
  const res = await request(app).get("/api/private/profile").set("Authorization", `Bearer ${token}`);
  assert.equal(res.status, 200);
  assert.equal(res.body.user.role, "user");
  assert.equal(res.body.user.passwordHash, undefined);
});

test("ruta de admin rechaza sin token (401)", async () => {
  const res = await request(app).get("/api/admin/users");
  assert.equal(res.status, 401);
});

test("ruta de admin rechaza a un usuario sin rol admin (403)", async () => {
  const token = await login("usuario@demo.com", "usuario123");
  const res = await request(app).get("/api/admin/users").set("Authorization", `Bearer ${token}`);
  assert.equal(res.status, 403);
});

test("ruta de admin permite al rol admin", async () => {
  const token = await login("admin@demo.com", "admin123");
  const res = await request(app).get("/api/admin/users").set("Authorization", `Bearer ${token}`);
  assert.equal(res.status, 200);
  assert.equal(res.body.users.length, 2);
});
