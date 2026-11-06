import { estado, agregar, quitar, cambiarCantidad, vaciar, registrarPedido } from "./estado.js";
import { calcularTotales, formatoDinero } from "./calculos.js";
import { render, renderCatalogo, renderResumen } from "./render.js";

const inputBuscar = document.querySelector("#buscar");
const selectCategoria = document.querySelector("#categoria");
const contCatalogo = document.querySelector("#catalogo");
const listaCarrito = document.querySelector("#listaCarrito");
const selectEnvio = document.querySelector("#envio");
const btnVaciar = document.querySelector("#btnVaciar");
const btnConfirmar = document.querySelector("#btnConfirmar");
const mensaje = document.querySelector("#mensaje");

inputBuscar.addEventListener("input", () => {
  estado.busqueda = inputBuscar.value.trim();
  renderCatalogo();
});

selectCategoria.addEventListener("change", () => {
  estado.categoria = selectCategoria.value;
  renderCatalogo();
});

contCatalogo.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton) return;
  agregar(Number(boton.closest(".producto").dataset.id));
  mensaje.hidden = true;
  render();
});

listaCarrito.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton) return;
  const id = Number(boton.closest(".item").dataset.id);
  const accion = boton.dataset.accion;
  if (accion === "mas") cambiarCantidad(id, 1);
  if (accion === "menos") cambiarCantidad(id, -1);
  if (accion === "quitar") quitar(id);
  render();
});

selectEnvio.addEventListener("change", () => {
  estado.envio = selectEnvio.value;
  renderResumen();
});

btnVaciar.addEventListener("click", () => {
  vaciar();
  render();
});

btnConfirmar.addEventListener("click", () => {
  const total = calcularTotales(estado.carrito, estado.envio).total;
  const numero = registrarPedido();
  mensaje.textContent = `✅ Pedido #${numero} confirmado por ${formatoDinero(total)}. ¡Gracias por tu compra!`;
  mensaje.hidden = false;
  render();
});

render()