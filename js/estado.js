export const estado = {
  carrito: [],
  busqueda: "",
  categoria: "todas",
  envio: "retiro",
  pedidos: 0,
};

export function agregar(id) {
  const item = estado.carrito.find((i) => i.id === id);
  if (item) {
    item.cantidad++;
  } else {
    estado.carrito.push({ id: id, cantidad: 1 });
  }
}

export function quitar(id) {
  estado.carrito = estado.carrito.filter((i) => i.id !== id);
}

export function cambiarCantidad(id, cambio) {
  const item = estado.carrito.find((i) => i.id === id);
  if (!item) return;
  item.cantidad += cambio;
  if (item.cantidad <= 0) quitar(id);
}

export function vaciar() {
  estado.carrito = [];
}

export function registrarPedido() {
  estado.pedidos++;
  vaciar();
  return String(estado.pedidos).padStart(3, "0");
}