import crearElemento from './dom.js';

export function FilaPedido(pedido) {
    const tr = crearElemento("tr", { class: "fila-pedido" });
    
    const tdId = crearElemento("td", {}, `#${pedido.id}`);
    const tdFecha = crearElemento("td", {}, pedido.fecha);
    const tdTotal = crearElemento("td", {}, `$${pedido.total.toFixed(2)}`);
    const tdEstado = crearElemento("td", {}, pedido.estado || "Completado");

    tr.appendChild(tdId);
    tr.appendChild(tdFecha);
    tr.appendChild(tdTotal);
    tr.appendChild(tdEstado);

    return tr;
}

export function agregarPedido(historial, nuevoPedido) {
    return [...historial, nuevoPedido];
}