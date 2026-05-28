import { Repo } from "../repo.js";
import { Auth } from "../auth.js";
export function LoginController() {
  const app = document.querySelector("#app");
  const status = document.querySelector("#status");
  const current = Auth.current();
  if (current) {
    app.innerHTML = `<div class="row justify-content-center"><div class="col-12 col-md-8 col-lg-6">
      <div class="card cafecat-card"><div class="card-body">
        <h2 class="h5 card-title mb-3">Mi cuenta</h2>
        <p class="card-text">Has iniciado sesión como <strong>${current.nombre}</strong> <span class="badge bg-secondary ms-1">${current.rol}</span>.</p>
        <div class="d-flex gap-2 mt-3">
          <button id="logout" class="btn btn-outline-secondary">Cerrar sesión</button>
          <a href="#/catalogo" class="btn btn-primary">Ir al catálogo</a>
        </div>
      </div></div>
    </div></div>`;
    document.querySelector("#logout").addEventListener("click", () => { Auth.logout(); status.textContent = "Sesión cerrada."; location.hash = "#/login"; });
    app.focus();
    return;
  }
  app.innerHTML = `<div class="row justify-content-center"><div class="col-12 col-md-8 col-lg-6">
    <div class="card cafecat-card"><div class="card-body">
      <h2 class="h5 card-title mb-3">Iniciar sesión</h2>
      <form id="loginForm" class="needs-validation" novalidate>
        <div class="mb-3"><label for="username" class="form-label">Usuario</label><input id="username" class="form-control" placeholder="Usuario" required /></div>
        <div class="mb-3"><label for="password" class="form-label">Contraseña</label><input id="password" type="password" class="form-control" placeholder="Contraseña" required /></div>
        <button class="btn btn-primary w-100" type="submit">Ingresar</button>
      </form>
      <p class="mt-3 mb-0 text-muted small">Para pruebas: <code>admin/admin123</code> o <code>cliente1/clave123</code>.</p>
    </div></div>
  </div></div>`;
  document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Validando credenciales...";
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    try {
      const res = await Repo.login(username, password);
      if (res.status === 200) { Auth.save(res.user); status.textContent = `Bienvenido, ${res.user.nombre}.`; location.hash = "#/catalogo"; }
      else { status.textContent = res.message || "Credenciales inválidas."; }
    } catch (err) { console.error(err); status.textContent = "Error de red al iniciar sesión."; }
  });
  app.focus();
}