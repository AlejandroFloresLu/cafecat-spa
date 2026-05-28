import fs from "fs";
const PATH = "./data/pedidos.json";
function loadPedidos() { try { return JSON.parse(fs.readFileSync(PATH, "utf8")); } catch { return []; } }
function savePedidos(pedidos) { fs.writeFileSync(PATH, JSON.stringify(pedidos, null, 2), "utf8"); }
export function crearPedido(req, res) {
  if (!req.user) return res.status(401).json({ status: "fail", message: "No autenticado" });
  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ status: "fail", message: "Items inválidos" });
  const pedidos = loadPedidos();
  const nextId = pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) + 1 : 1;
  const nuevo = { id: nextId, userId: req.user.id, items, createdAt: new Date().toISOString(), estado: "CREADO" };
  pedidos.push(nuevo);
  savePedidos(pedidos);
  return res.status(201).json({ status: "created", orderId: nuevo.id, userId: nuevo.userId, createdAt: nuevo.createdAt });
}
export function listarPedidos(req, res) {
  if (!req.user || req.user.rol !== "admin") return res.status(403).json({ status: "fail", message: "Requiere rol admin" });
  return res.status(200).json({ status: "success", data: loadPedidos() });
}