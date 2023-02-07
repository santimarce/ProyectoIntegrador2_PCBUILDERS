
let pedidos = [];
let usuarios = [];
let editing = false;
let pedidoId = null;
var usuarioId;

window.addEventListener("DOMContentLoaded", async () => {
    fetch("/dashboard/getuserXD")
        .then(response1 => response1.json())
        .then(data => obtenerUser(data));

    const response = await fetch(`/dashboard/pedidos/${usuarioId}`);

    const data2 = await response.json();
    pedidos = data2;
    renderPedido(pedidos);
});

function obtenerUser(dato){
    usuarioId = dato;
    console.log(usuarioId);
    const pedidoList = document.querySelector("#tablaPedidos");
    pedidoList.innerHTML = "";
    pedidos.forEach((pedido) => {
        const pedidoItem = document.createElement("tr");
        pedidoItem.innerHTML = `
    <th scope="row">${pedido.id_pedido}</th>
    <td>${pedido.id_pedido}</td>
    <td>${pedido.fechapedido}</td>
    <td>${pedido.fechaentrega}</td>
    <td>${pedido.lugarentrega}</td>
    <td>${pedido.totalpedido}</td>
    <td>${pedido.id_clientes}</td>
    `;

    });
}

/*  const id_pedido     = tablePedido['id_pedido'].value;
  const fechapedido   = tablePedido['fechapedido'].value;
  const fechaentrega  = tablePedido['fechaentrega'].value;
  const lugarentrega  = tablePedido['lugarentrega'].value;
  const totalpedido   = tablePedido['totalpedido'].value;
  const id_clientes   = tablePedido['id_clientes'].value;
*/

function renderPedido(pedidos) {
    
};