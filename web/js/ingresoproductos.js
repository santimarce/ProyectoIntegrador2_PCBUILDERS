const SelectorTipoProducto = document.getElementById("ComboTipoComponente");
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

function crearnuevoinput(Seleccion, tipo) {
    document.getElementById("ColumnaNew");
    var newRow = document.createElement("div");
    newRow.classList.add("form-group");
    var newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", tipo);
    newInput.setAttribute("id", "generado" + Seleccion);
    newInput.setAttribute("placeholder", "Ingrese la potencia de consumo de " + Seleccion);
    var newLabel = document.createElement("label");
    newLabel.setAttribute("for", "generado" + Seleccion);
    newLabel.innerHTML = Seleccion;
    newRow.appendChild(newLabel);
    newRow.appendChild(newInput);
    ColumnaNew.appendChild(newRow);
};

// hay que generar los radio buttons y ya empezar a mandar los datos al back

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

