const KEY = "cafecat-cart";
export const Cart = {
  items: JSON.parse(localStorage.getItem(KEY) || "[]"),
  save() { localStorage.setItem(KEY, JSON.stringify(this.items)); },
  add(prod) {
    const found = this.items.find(i => i.id === prod.id);
    if (found) { found.qty++; } else { this.items.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, qty: 1 }); }
    this.save();
  },
  clear() { this.items = []; this.save(); }
};