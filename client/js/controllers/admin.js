import { Auth } from "../auth.js";
import { Repo } from "../repo.js";
export function AdminController() {
  const app = document.querySelector("#app");
  const status = document.querySelector("#status");
  const user = Auth.current();
  if (!user) { app.innerHTML = `<div class="alert alert-warning">Debes iniciar sesión para acceder al panel de administración.</div><a href="#/login" class="btn btn-primary">Ir a login</a>`; app.focus(); return; }
  if (user.rol !== "admin") { app.innerHTML = `<div class="alert alert-danger">No tienes permisos para acceder al panel de administración.</div><a href="#/catalogo" class="btn btn-outline-secondary">Volver al catálogo</a>`; app.focus(); return; }
  app.innerHTML = `<div class="row g-4">
    <div class="col-12"><h2 class="h4 mb-3">Panel de administración</h2><p class="text-muted">Conectado como <strong>${user.nombre}</strong> <span class="badge bg-secondary ms-1">${user.rol}</span>.</p></div>
    <div class="col-12 col-lg-6"><div class="card cafecat-card"><div class="card-body">
      <h3 class="h5 card-title mb-3">Crear nuevo producto</h3>
      <form id="fProducto">
        <div class="mb-3"><label for="pNombre" class="form-label">Nombre</label><input id="pNombre" class="form-control" required /></div>
        <div class="mb-3"><label for="pPrecio" class="form-label">Precio</label><input id="pPrecio" type="number" step="0.01" class="form-control" required /></div>
        <div class="mb-3"><label for="pCategoria" class="form-label">Categoría</label><input id="pCategoria" class="form-control" required /></div>
        <div class="mb-3"><label for="pDesc" class="form-label">Descripción</label><textarea id="pDesc" class="form-control" rows="3" required></textarea></div>
        <div class="mb-3"><label for="pStock" class="form-label">Stock</label><input id="pStock" type="number" min="0" class="form-control" required /></div>
        <button class="btn btn-primary" type="submit">Guardar producto</button>
      </form>
    </div></div></div>
    <div class="col-12 col-lg-6"><div class="card cafecat-card"><div class="card-body">
      <h3 class="h5 card-title mb-3">Crear nuevo usuario</h3>
      <form id="fUsuario">
        <div class="mb-3"><label for="uUsername" class="form-label">Usuario</label><input id="uUsername" class="form-control" required /></div>
        <div class="mb-3"><label for="uNombre" class="form-label">Nombre completo</label><input id="uNombre" class="form-control" required /></div>
        <div class="mb-3"><label for="uPassword" class="form-label">Contraseña</label><input id="uPassword" type="password" class="form-control" required /></div>
        <div class="mb-3"><label for="uRol" class="form-label">Rol</label><select id="uRol" class="form-select"><option value="cliente">Cliente</option><option value="admin">Administrador</option></select></div>
        <button class="btn btn-primary" type="submit">Guardar usuario</button>
      </form>
    </div></div></div>
    <div class="col-12"><div class="card cafecat-card"><div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="h5 card-title mb-0">Pedidos registrados</h3>
        <button id="loadPedidos" class="btn btn-outline-primary btn-sm">Cargar pedidos</button>
      </div>
      <div id="pedidosList"></div>
    </div></div></div>
  </div>`;
  document.querySelector("#fProducto").addEventListener("submit", async (e) => {
    e.preventDefault(); status.textContent = "Creando producto...";
    const data = { nombre: document.querySelector("#pNombre").value.trim(), precio: Number(document.querySelector("#pPrecio").value), categoria: document.querySelector("#pCategoria").value.trim(), descripcion: document.querySelector("#pDesc").value.trim(), stock: Number(document.querySelector("#pStock").value) };
    try {
      const res = await Repo.crearProducto(data);
      if (res.status === 201) { status.textContent = `Producto creado (ID ${res.data.id}).`; e.target.reset(); }
      else { status.textContent = res.message || "No se pudo crear el producto."; }
    } catch (err) { console.error(err); status.textContent = "Error de red creando producto."; }
  });
  document.querySelector("#fUsuario").addEventListener("submit", async (e) => {
    e.preventDefault(); status.textContent = "Creando usuario...";
    const data = { username: document.querySelector("#uUsername").value.trim(), nombre: document.querySelector("#uNombre").value.trim(), password: document.querySelector("#uPassword").value.trim(), rol: document.querySelector("#uRol").value };
    try {
      const res = await Repo.crearUsuario(data);
      if (res.status === 201) { status.textContent = `Usuario creado (${res.user.username}).`; e.target.reset(); }
      else { status.textContent = res.message || "No se pudo crear el usuario."; }
    } catch (err) { console.error(err); status.textContent = "Error de red creando usuario."; }
  });
  const pedidosList = document.querySelector("#pedidosList");
  document.querySelector("#loadPedidos").addEventListener("click", async () => {
    status.textContent = "Cargando pedidos...";
    try {
      const res = await Repo.listPedidos();
      if (res.status === 403) { status.textContent = "No tienes permisos para ver los pedidos."; pedidosList.innerHTML = `<div class="alert alert-danger mb-0">Acceso restringido.</div>`; return; }
      if (res.status !== 200) { status.textContent = res.message || "Error al cargar pedidos."; pedidosList.innerHTML = ""; return; }
      const pedidos = res.data || [];
      if (!pedidos.length) { status.textContent = "No hay pedidos registrados."; pedidosList.innerHTML = `<p class="text-muted mb-0">No se encontraron pedidos.</p>`; return; }
      pedidosList.innerHTML = `<div class="table-responsive"><table class="table table-striped table-hover table-sm table-pedidos">
        <thead class="table-light"><tr><th>ID Pedido</th><th>ID Usuario</th><th>Fecha</th><th>Estado</th><th>Items</th></tr></thead>
        <tbody>${pedidos.map(p => `<tr><td>${p.id}</td><td>${p.userId}</td><td>${new Date(p.createdAt).toLocaleString()}</td><td>${p.estado}</td><td>${p.items.map(i => `#${i.id} (x${i.qty})`).join("<br>")}</td></tr>`).join("")}</tbody>
      </table></div>`;
      status.textContent = `Pedidos cargados: ${pedidos.length}`;
    } catch (err) { console.error(err); status.textContent = "Error de red al cargar pedidos."; pedidosList.innerHTML = ""; }
  });
  app.focus();
}