// dom.js · Ayudante reutilizable para crear elementos en una sola línea

// crearElemento("span", { clase: "precio", texto: "$25.00" })
// crearElemento("button", { texto: "+", datos: { accion: "mas" } })
export function crearElemento(etiqueta, { clase, texto, datos } = {}) {
  const el = document.createElement(etiqueta);
  if (clase) el.classList.add(...clase.split(" "));
  if (texto !== undefined) el.textContent = texto;
  if (datos) {
    for (const [clave, valor] of Object.entries(datos)) {
      el.dataset[clave] = valor;
    }
  }
  if (etiqueta === "button") el.type = "button";
  return el;
}