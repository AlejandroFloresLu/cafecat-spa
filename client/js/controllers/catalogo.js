import { Repo } from "../repo.js";
import { View } from "../view.js";
export async function CatalogoController(q) {
  const app = document.querySelector("#app");
  const status = document.querySelector("#status");
  status.textContent = "Cargando catálogo...";
  try {
    const productos = await Repo.listProductos();
    let lista = productos;
    if (q) { const term = q.toLowerCase(); lista = productos.filter(p => p.nombre.toLowerCase().includes(term)); }
    app.innerHTML = `<h2 class="h4 mb-3">Catálogo</h2>${View.listProductos(lista)}`;
    app.querySelectorAll("button.ver").forEach(btn => {
      btn.addEventListener("click", () => { location.hash = "#/detalle/" + btn.dataset.id; });
    });
    status.textContent = `Productos listados: ${lista.length}`;
  } catch (err) {
    console.error(err);
    status.textContent = "Error al cargar el catálogo.";
  }
  app.focus();
}