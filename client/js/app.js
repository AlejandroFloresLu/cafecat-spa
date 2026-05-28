import { Router } from "./router.js";
import { HomeController } from "./controllers/home.js";
import { CatalogoController } from "./controllers/catalogo.js";
import { DetalleController } from "./controllers/detalle.js";
import { CarritoController } from "./controllers/carrito.js";
import { LoginController } from "./controllers/login.js";
import { AdminController } from "./controllers/admin.js";
function init() {
  Router.add("home", HomeController);
  Router.add("catalogo", CatalogoController);
  Router.add("detalle", DetalleController);
  Router.add("carrito", CarritoController);
  Router.add("login", LoginController);
  Router.add("admin", AdminController);
  Router.listen();
  document.querySelector("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.querySelector("#q").value.trim();
    location.hash = q ? `#/catalogo/${encodeURIComponent(q)}` : "#/catalogo";
  });
}
init();