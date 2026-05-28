import fs from "fs";
const PATH = "./data/productos.json";
export function listarProductos(req, res) {
  const data = JSON.parse(fs.readFileSync(PATH, "utf8"));
  res.status(200).json({ status: "success", data });
}
export function detalleProducto(req, res) {
  const id = Number(req.params.id);
  const data = JSON.parse(fs.readFileSync(PATH, "utf8"));
  const prod = data.find(p => p.id === id);
  if (!prod) return res.status(404).json({ status: "fail", message: "Producto no encontrado" });
  res.status(200).json({ status: "success", data: prod });
}
export function crearProducto(req, res) {
  if (!req.user || req.user.rol !== "admin") return res.status(403).json({ status: "fail", message: "Solo admin puede crear productos" });
  const { nombre, precio, categoria, descripcion, stock } = req.body || {};
  if (!nombre || !precio || !categoria || !descripcion || stock == null) return res.status(400).json({ status: "fail", message: "Datos incompletos" });
  const data = JSON.parse(fs.readFileSync(PATH, "utf8"));
  const nextId = data.length > 0 ? Math.max(...data.map(p => p.id)) + 1 : 1;
  const nuevo = { id: nextId, nombre, precio: Number(precio), categoria, descripcion, imagenes: [], stock: Number(stock) };
  data.push(nuevo);
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2), "utf8");
  res.status(201).json({ status: "created", data: nuevo });
}