export const View = {
  listProductos(arr) {
    if (!arr.length) return `<p class="text-muted">No hay productos para mostrar.</p>`;
    return `<div class="row g-3">${arr.map(p => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 cafecat-card">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text text-muted mb-2">$${p.precio.toFixed(2)}</p>
            <p class="card-text flex-grow-1"><small class="text-muted">${p.descripcion ?? ""}</small></p>
            <button class="btn btn-sm btn-outline-primary mt-2 align-self-start ver" data-id="${p.id}">Ver detalle</button>
          </div>
        </div>
      </div>`).join("")}</div>`;
  },
  detalle(prod) {
    return `<div class="card cafecat-card"><div class="card-body">
      <h2 class="h4 card-title mb-3">${prod.nombre}</h2>
      <p class="card-text">${prod.descripcion}</p>
      <p class="fs-5 fw-semibold text-primary">$${prod.precio.toFixed(2)}</p>
      <button id="addCart" class="btn btn-primary" type="button">Agregar al carrito</button>
    </div></div>`;
  },
  cartList(arr) {
    if (!arr.length) return `<p class="text-muted">El carrito está vacío.</p>`;
    const total = arr.reduce((acc, it) => acc + it.precio * it.qty, 0);
    return `<div class="table-responsive"><table class="table table-sm align-middle">
      <thead><tr><th>Producto</th><th>Cant.</th><th>Precio unit.</th><th>Subtotal</th></tr></thead>
      <tbody>${arr.map(i => `<tr><td>${i.nombre}</td><td>${i.qty}</td><td>$${i.precio.toFixed(2)}</td><td>$${(i.qty * i.precio).toFixed(2)}</td></tr>`).join("")}</tbody>
    </table></div>
    <p class="fs-6 fw-semibold text-end">Total: <span class="text-success">$${total.toFixed(2)}</span></p>`;
  }
};