import { Auth } from "./auth.js";
const API = "http://localhost:3000";
function authHeaders() {
  const u = Auth.current();
  if (!u) return {};
  return { "x-user-id": String(u.id), "x-user-role": u.rol };
}
function cid() { return "cid-" + Math.random().toString(36).slice(2, 10); }
export const Repo = {
  async listProductos() {
    const res = await fetch(`${API}/api/productos`, { headers: { "x-correlation-id": cid(), ...authHeaders() } });
    if (!res.ok) throw new Error("Error al listar productos");
    const json = await res.json();
    return json.data || [];
  },
  async getProducto(id) {
    const res = await fetch(`${API}/api/productos/${id}`, { headers: { "x-correlation-id": cid(), ...authHeaders() } });
    if (!res.ok) throw new Error("Producto no encontrado");
    const json = await res.json();
    return json.data;
  },
  async crearPedido(items) {
    const res = await fetch(`${API}/api/pedidos`, { method: "POST", headers: { "Content-Type": "application/json", "x-correlation-id": cid(), ...authHeaders() }, body: JSON.stringify({ items }) });
    const json = await res.json();
    return { ...json, status: res.status };
  },
  async login(username, password) {
    const res = await fetch(`${API}/api/login`, { method: "POST", headers: { "Content-Type": "application/json", "x-correlation-id": cid() }, body: JSON.stringify({ username, password }) });
    const json = await res.json();
    return { ...json, status: res.status };
  },
  async crearUsuario(data) {
    const res = await fetch(`${API}/api/usuarios`, { method: "POST", headers: { "Content-Type": "application/json", "x-correlation-id": cid(), ...authHeaders() }, body: JSON.stringify(data) });
    const json = await res.json();
    return { ...json, status: res.status };
  },
  async crearProducto(data) {
    const res = await fetch(`${API}/api/productos`, { method: "POST", headers: { "Content-Type": "application/json", "x-correlation-id": cid(), ...authHeaders() }, body: JSON.stringify(data) });
    const json = await res.json();
    return { ...json, status: res.status };
  },
  async listPedidos() {
    const res = await fetch(`${API}/api/pedidos`, { headers: { "x-correlation-id": cid(), ...authHeaders() } });
    const json = await res.json();
    return { ...json, status: res.status };
  }
};