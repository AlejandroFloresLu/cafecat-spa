import { Cart } from "../cart.js";
import { View } from "../view.js";
import { Repo } from "../repo.js";
import { Auth } from "../auth.js";
export function CarritoController() {
  const app = document.querySelector("#app");
  const status = document.querySelector("#status");
  app.innerHTML = `<div class="row"><div class="col-12 col-lg-8">
    <h2 class="h4 mb-3">Carrito</h2>
    <div id="list" class="mb-3"></div>
    <div class="d-flex gap-2">
      <button id="send" class="btn btn-success">Enviar pedido</button>
      <button id="clear" class="btn btn-outline-secondary">Vaciar</button>
    </div>
  </div></div>`;
  const list = document.querySelector("#list");
  list.innerHTML = View.cartList(Cart.items);
  document.querySelector("#clear").addEventListener("click", () => {
    Cart.clear();
    list.innerHTML = View.cartList(Cart.items);
    status.textContent = "Carrito vaciado.";
  });
  document.querySelector("#send").addEventListener("click", async () => {
    if (!Auth.isLogged()) { status.textContent = "Debes iniciar sesión antes de enviar el pedido."; location.hash = "#/login"; return; }
    if (!Cart.items.length) { status.textContent = "El carrito está vacío."; return; }
    status.textContent = "Enviando pedido...";
    try {
      const items = Cart.items.map(i => ({ id: i.id, qty: i.qty }));
      const res = await Repo.crearPedido(items);
      if (res.status === 201) { status.textContent = `Pedido creado (#${res.orderId}).`; Cart.clear(); list.innerHTML = View.cartList(Cart.items); }
      else if (res.status === 401) { status.textContent = "Sesión inválida. Inicia sesión nuevamente."; Auth.logout(); location.hash = "#/login"; }
      else { status.textContent = res.message || "No se pudo crear el pedido."; }
    } catch (err) { console.error(err); status.textContent = "Error de red al crear el pedido."; }
  });
  app.focus();
}