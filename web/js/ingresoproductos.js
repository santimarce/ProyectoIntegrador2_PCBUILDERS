const SelectorTipoProducto = document.getElementById("ComboTipoComponente");
const FormaIngresoProducto = document.querySelector("#FormaIngresoProd");
const BtnVerProductos = document.getElementById('boton_mostrarproductos');
var productonuevo = [];
var productos = [];
let idusuario;
const diccionarioProductos = {
    "Laptop": "Pulgadas",
    "Desktop": "RGB",
    "Software": "Tipo",
    "Videojuegos": "Genero",
    "Perifericos": ["Wireless", "Wired"],
    "Almacenamiento": ["Potencia Consumida", "Tipo", "Factor de Forma", "Capacidad GB"],
    "Memoria Ram": ["Potencia Consumida", "Tipo", "Factor de forma", "Capacidad GB"],
    "Tarjeta Grafica": ["Potencia Consumida", "Puerto Expansion", "Tipo Memoria"],
    "Procesador": ["Potencia Consumida", "Socket", "Generacion", "Nucleos"],
    "Mainboard": ["Potencia Consumida", "Tipo Memoria", "Socket", "Puertos Expansion", "Tipo"],
    "Fuente": ["Potencia Consumida", "Potencia Entrega"]
};
const tipoCasilla = {
    "text": ["Tipo", "Factor de Forma", "Genero", "Tipo Memoria", "Socket", "Puerto Expansion", "Factor de Forma"],
    "number": ["Potencia Consumida", "Pulgadas", "Capacidad GB", "Puertos Expansion", "Generacion", "Nucleos", "Potencia Entrega"],
    "radio": ["RGB", "Wireless", "Wired",]
}

window.addEventListener("DOMContentLoaded", async () => {
    fetch("/dashboard/getuserXD")
    .then(response => response.json())
    .then(data => pasaralimpio(data));

    console.log(idusuario);

});

function pasaralimpio(datos){
    idusuario= datos;
}
var ColumnaNew = document.getElementById("ColumnaNew");

SelectorTipoProducto.addEventListener('change', (event) => {
    var Seleccion = event.target.value;
    var valores = diccionarioProductos[Seleccion];
    if (valores == "Pulgadas" || valores == "RGB" || valores == "Tipo" || valores == "Genero") {
        ColumnaNew.innerHTML = "";
        var tipo = generartipo(valores);
        console.log(tipo);
        crearnuevoinput(valores, tipo);
    } else {
        ColumnaNew.innerHTML = "";
        valores.forEach(element => {
            var tipo = generartipo(element);
            console.log(tipo);
            crearnuevoinput(element, tipo);
        });
    }
});

// let productoaenviar = new producto(w);

FormaIngresoProducto.addEventListener("submit", async (e) => {
    e.preventDefault();
    const tipo = SelectorTipoProducto.value;
    const marca = FormaIngresoProducto["marcaproducto"].value;
    const modelo = FormaIngresoProducto["modeloproducto"].value;
    const precio = FormaIngresoProducto["preciounitarioproducto"].value;
    const cantidad = FormaIngresoProducto["cantidadunidades"].value;
    const descripcion = FormaIngresoProducto["descripcionproducto"].value;
    const response = await fetch("/dashboardAdmin/ingresarproducto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tipo,
            marca,
            modelo,
            precio,
            cantidad,
            descripcion
        }),
    });
    verelemtnos();
    const productonuevo = await response.json();
    computadora.push(productonuevo);
    console.log(computadora);
    Forma1.reset();
});


function crearnuevoinput(Seleccion, tipo) {
    document.getElementById("ColumnaNew");
    var newRow = document.createElement("div");
    if (tipo == "radio") {
        newRow.innerHTML = `
            <fieldset> 
                <label> El producto es ${Seleccion}<br>
                    <input type="radio" name="generado${Seleccion}" value="True"> Si
                    <input type="radio" name="generado${Seleccion}" value="False"> No
                </label>
            </fieldset>
`;
        ColumnaNew.appendChild(newRow);
    } else {
        newRow.classList.add("form-group");
        var newInput = document.createElement("input");
        newInput.classList.add("form-control");
        newInput.setAttribute("type", tipo);
        newInput.setAttribute("id", "generado" + Seleccion);
        newInput.setAttribute("name", "generado" + Seleccion);
        newInput.setAttribute("placeholder", "Ingrese el/la " + Seleccion);
        var newLabel = document.createElement("label");
        newLabel.setAttribute("for", "generado" + Seleccion);
        newLabel.innerHTML = Seleccion;
        newRow.appendChild(newLabel);
        newRow.appendChild(newInput);
        ColumnaNew.appendChild(newRow);
    }
};
function generartipo(variable) {
    var retorno = new String();
    Object.keys(tipoCasilla).forEach(clave => {
        tipoCasilla[clave].forEach(valorxclave => {
            if (valorxclave == variable) {
                retorno = clave;
            }
        });
    });
    return retorno;
}

function verelemtnos() {
    for (var i = 0; i < FormaIngresoProducto.elements.length; i++) {
        var element = FormaIngresoProducto.elements[i];
        console.log(element.name + ": " + element.value);
    }
}