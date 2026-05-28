export const Router = {
  routes: {},
  add(name, handler) { this.routes[name] = handler; },
  listen() {
    window.addEventListener("hashchange", () => this.resolve());
    this.resolve();
  },
  resolve() {
    const hash = location.hash.slice(2) || "home";
    const [route, param] = hash.split("/");
    const handler = this.routes[route];
    if (!handler) { document.querySelector("#app").innerHTML = "<p>Vista no encontrada.</p>"; return; }
    handler(param);
  }
};