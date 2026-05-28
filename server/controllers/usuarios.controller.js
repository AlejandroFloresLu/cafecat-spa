import fs from "fs";
const PATH = "./data/usuarios.json";
export function listarUsuarios(req, res) {
  const data = JSON.parse(fs.readFileSync(PATH, "utf8"));
  res.status(200).json({ status: "success", data });
}
export function crearUsuario(req, res) {
  if (!req.user || req.user.rol !== "admin") return res.status(403).json({ status: "fail", message: "Solo admin puede crear usuarios" });
  const { username, password, nombre, rol } = req.body || {};
  if (!username || !password || !nombre || !rol) return res.status(400).json({ status: "fail", message: "Datos incompletos" });
  const data = JSON.parse(fs.readFileSync(PATH, "utf8"));
  if (data.some(u => u.username === username)) return res.status(409).json({ status: "fail", message: "El usuario ya existe" });
  const nextId = data.length > 0 ? Math.max(...data.map(u => u.id)) + 1 : 1;
  const nuevo = { id: nextId, username, password, nombre, rol };
  data.push(nuevo);
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2), "utf8");
  const { password: _, ...safe } = nuevo;
  res.status(201).json({ status: "created", user: safe });
}