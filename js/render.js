import { catalogo } from "./datos.js";
import { estado } from "./estado.js";
import { formatoDinero, totalUnidades, calcularTotales } from "./calculos.js";
import { TarjetaProducto, ItemCarrito, LineaResumen } from "./componente.js";

const contCatalogo = document.querySelector("#catalogo");
const sinResultados = document.querySelector("#sinResultados");
const listaCarrito = document.querySelector("#listaCarrito");
const carritoVacio = document.querySelector("#carritoVacio");
const resumen = document.querySelector("#resumen");
const btnConfirmar = document.querySelector("#btnConfirmar");
const btnVaciar = document.querySelector("#btnVaciar");
const badge = document.querySelector("#badge");

function productosVisibles() {
  const texto = estado.busqueda.toLowerCase();
  return catalogo.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(texto);
    const coincideCategoria = estado.categoria === "todas" || p.categoria === estado.categoria;
    return coincideTexto && coincideCategoria;
  });
}

export function renderCatalogo() {
  const visibles = productosVisibles();
  contCatalogo.replaceChildren(
    ...visibles.map((p) => TarjetaProducto(p, estado.carrito.some((i) => i.id === p.id)))
  );
  sinResultados.hidden = visibles.length > 0;
}

function renderCarrito() {
  listaCarrito.replaceChildren(...estado.carrito.map(ItemCarrito));
  const vacio = estado.carrito.length === 0;
  carritoVacio.hidden = !vacio;
  btnConfirmar.disabled = vacio;
  btnVaciar.disabled = vacio;
}

export function renderResumen() {
  const t = calcularTotales(estado.carrito, estado.envio);
  resumen.replaceChildren(
    LineaResumen(`Subtotal (${totalUnidades(estado.carrito)} u.)`, formatoDinero(t.subtotal)),
    LineaResumen("Descuento", t.descuento > 0 ? `- ${formatoDinero(t.descuento)}` : "No aplica", "descuento"),
    LineaResumen("Envío", formatoDinero(t.envio)),
    LineaResumen("IVA (15 %)", formatoDinero(t.iva)),
    LineaResumen("Total", formatoDinero(t.total), "total")
  );
}

function renderBadge() {
  const nuevo = String(totalUnidades(estado.carrito));
  if (badge.textContent !== nuevo) {
    badge.textContent = nuevo;
    badge.classList.remove("pulso");
    void badge.offsetWidth;
    badge.classList.add("pulso");
  }
}

export function render() {
  renderCatalogo();
  renderCarrito();
  renderResumen();
  renderBadge();
}