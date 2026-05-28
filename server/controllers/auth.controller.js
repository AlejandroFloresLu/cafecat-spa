import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PATH = path.join(__dirname, "..", "data", "usuarios.json");
const DEFAULT_USERS = [
  { id: 1, username: "admin", password: "admin123", "nombre": "Administrador General", "rol": "admin" },
  { id: 2, username: "cliente1", password: "clave123", "nombre": "Cliente de Prueba", "rol": "cliente" }
];
export function login(req, res) {
  let { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ status: "fail", message: "Faltan credenciales" });
  username = String(username).trim();
  password = String(password).trim();
  let usuarios = [];
  try {
    const raw = fs.readFileSync(PATH, "utf8");
    usuarios = JSON.parse(raw);
    if (!Array.isArray(usuarios) || usuarios.length === 0) usuarios = DEFAULT_USERS;
  } catch { usuarios = DEFAULT_USERS; }
  const found = usuarios.find(u => String(u.username).trim() === username && String(u.password).trim() === password);
  if (!found) return res.status(401).json({ status: "fail", message: "Credenciales inválidas" });
  const { id, nombre, rol } = found;
  return res.status(200).json({ status: "ok", user: { id, username: found.username, nombre, rol } });
}