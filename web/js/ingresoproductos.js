const SelectorTipoProducto = document.getElementById("ComboTipoComponente");
var diccionarioProductos = {
    "Laptop": "Pulgadas",
    "Desktop": "RGB",
    "Software": "Tipo",
    "Videojuegos": "Genero",
    "MemoriaRam": ["Potencia Consumida", "Tipo", "Factor de forma"],
    "Perifericos": ["Wireless", "Wired"],
    "TarjetaGrafica": ["Potencia Consumida", "PuertoExpansion", "GeneracionMem"],
    "Procesador": ["Potencia Consumida", "Socket", "Generacion", "Nucleos"],
    "Mainboard": ["Potencia Consumida", "TipoMemoria", "Socket", "PuertoExpansion", "Tipo"],
    "Fuente": ["Potencia Consumida", "PotenciaEntrega"]
};

SelectorTipoProducto.addEventListener('change', (event) => {
    var Seleccion = event.target.value;

    var valores = diccionarioProductos[Seleccion];
    valores.forEach(valor => {
        console.log(valor);
    });

    // for (var prop in diccionarioProductos  ) {
    //     console.log(` ${diccionarioProductos.Perifericos[prop]}`);
    // };
});

function crearnuevoinput(Seleccion) {
    document.getElementById("ColumnaNew");
    var newRow = document.createElement("div");
    newRow.classList.add("form-group");
    var newInput = document.createElement("input");
    newInput.classList.add("form-control");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "generado" + Seleccion);
    newInput.setAttribute("placeholder", "Ingrese la potencia de consumo de " + Seleccion);
    var newLabel = document.createElement("label");
    newLabel.setAttribute("for", "generado" + Seleccion);
    newLabel.innerHTML = "Ingrese " + Seleccion;
    newRow.appendChild(newLabel);
    newRow.appendChild(newInput);
    var ColumnaNew = document.getElementById("ColumnaNew");
    ColumnaNew.appendChild(newRow);
};