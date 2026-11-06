import { crearElemento } from "./dom.js";
import { formatoDinero, buscarProducto } from "./calculos.js";

export function TarjetaProducto(producto, enCarrito) {
  const tarjeta = crearElemento("article", { clase: "producto", datos: { id: producto.id } });
  tarjeta.classList.toggle("en-carrito", enCarrito);
  tarjeta.append(
    crearElemento("span", { clase: "categoria", texto: producto.categoria }),
    crearElemento("span", { clase: "nombre", texto: producto.nombre }),
    crearElemento("span", { clase: "precio", texto: formatoDinero(producto.precio) }),
    crearElemento("button", { texto: enCarrito ? "✓ Agregar otro" : "Agregar" })
  );
  return tarjeta;
}

export function ItemCarrito(item) {
  const producto = buscarProducto(item.id);
  const li = crearElemento("li", { clase: "item", datos: { id: item.id } });

  const detalle = crearElemento("div", { clase: "detalle" });
  detalle.append(
    crearElemento("strong", { texto: producto.nombre }),
    crearElemento("small", {
      texto: `${formatoDinero(producto.precio)} × ${item.cantidad} = ${formatoDinero(producto.precio * item.cantidad)}`,
    })
  );

  const cantidad = crearElemento("div", { clase: "cantidad" });
  cantidad.append(
    crearElemento("button", { texto: "−", datos: { accion: "menos" } }),
    crearElemento("span", { texto: item.cantidad }),
    crearElemento("button", { texto: "+", datos: { accion: "mas" } })
  );

  const quitar = crearElemento("button", { clase: "quitar", texto: "✕", datos: { accion: "quitar" } });
  quitar.title = "Quitar del carrito";

  li.append(detalle, cantidad, quitar);
  return li;
}

export function LineaResumen(etiqueta, valor, clase) {
  const div = crearElemento("div", { clase: clase ? `linea ${clase}` : "linea" });
  div.append(crearElemento("span", { texto: etiqueta }), crearElemento("span", { texto: valor }));
  return div;
}