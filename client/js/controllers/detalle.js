import { Repo } from "../repo.js";
import { View } from "../view.js";
import { Cart } from "../cart.js";
export async function DetalleController(id) {
  const app = document.querySelector("#app");
  const status = document.querySelector("#status");
  status.textContent = "Cargando producto...";
  try {
    const prod = await Repo.getProducto(id);
    app.innerHTML = View.detalle(prod);
    document.querySelector("#addCart").addEventListener("click", () => {
      Cart.add(prod);
      status.textContent = "Producto agregado al carrito.";
    });
  } catch (err) {
    console.error(err);
    app.innerHTML = `<div class="alert alert-danger">Producto no encontrado.</div>`;
    status.textContent = "Error al cargar el producto.";
  }
  app.focus();
}