export function HomeController() {
  const app = document.querySelector("#app");
  app.innerHTML = `<div class="row justify-content-center"><div class="col-12 col-lg-8">
    <div class="card cafecat-card"><div class="card-body">
      <h2 class="h4 card-title mb-3">Bienvenido a CaféCat</h2>
      <p class="card-text">Esta SPA es el resultado de la práctica de la clase 8: <strong>frontend con HTML5 semántico, Bootstrap, JavaScript ES6 y consumo de una API REST</strong>.</p>
      <p class="card-text">Puedes navegar por el catálogo, agregar productos al carrito, iniciar sesión como cliente o administrador y visualizar los pedidos registrados.</p>
      <a href="#/catalogo" class="btn btn-primary mt-2">Ir al catálogo</a>
    </div></div>
  </div></div>`;
  app.focus();
}