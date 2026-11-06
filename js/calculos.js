import { IVA, catalogo } from "./datos.js";

export const formatoDinero = (valor) => `$${valor.toFixed(2)}`;

export const buscarProducto = (id) => catalogo.find((p) => p.id === id);

export function porcentajeDescuento(unidades) {
  if (unidades >= 10) return 0.10;
  if (unidades >= 5) return 0.05;
  return 0;
}

export function costoEnvio(tipo) {
  switch (tipo) {
    case "cuenca": return 2.50;
    case "nacional": return 6.00;
    default: return 0;
  }
}

export function totalUnidades(carrito) {
  let unidades = 0;
  for (const item of carrito) unidades += item.cantidad;
  return unidades;
}

export function calcularTotales(carrito, tipoEnvio) {
  let subtotal = 0;
  for (const item of carrito) {
    const prod = buscarProducto(item.id);
    if (prod) subtotal += prod.precio * item.cantidad;
  }
  const descuento = subtotal * porcentajeDescuento(totalUnidades(carrito));
  const envio = carrito.length > 0 ? costoEnvio(tipoEnvio) : 0;
  const base = subtotal - descuento + envio;
  const iva = base * IVA;
  return { subtotal, descuento, envio, iva, total: base + iva };
}