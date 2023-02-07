var select1 = document.getElementById("productosarm1");
var select2 = document.getElementById("productosarm2");
var select3 = document.getElementById("productosarm3");
var select4 = document.getElementById("productosarm4");
var select5 = document.getElementById("productosarm5");
var select6 = document.getElementById("productosarm6");
var armarEG = [];

function generarOpciones(armarEG) {

    armarEG.forEach(function (armarEGaux, index) {
        let producto = document.createElement("option");
        producto.setAttribute("value", armarEGaux.precio);
        producto.setAttribute("label", armarEGaux.army);
        //producto.innerHTML=`${armarEGaux.army}`;
        switch (armarEGaux.id_tipoproducto) {
            case 1:
                select1.appendChild(producto);
                select1.setAttribute("label", producto.getAttribute("label"));
                break;
            case 2:
                select2.appendChild(producto);
                select2.setAttribute("label", producto.getAttribute("label"));
                break;
            case 3:
                select3.appendChild(producto);
                select3.setAttribute("label", producto.getAttribute("label"));
                break;
            case 4:
                select4.appendChild(producto);
                select4.setAttribute("label", producto.getAttribute("label"));
                break;
            case 5:
                select5.appendChild(producto);
                select5.setAttribute("label", producto.getAttribute("label"));
                break;
            case 6:
                select6.appendChild(producto);
                select6.setAttribute("label", producto.getAttribute("label"));
                break;
            default: alert("No vale")
                break;
        }
    })
}

window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/dasboard/armarPc");
    const data = await response.json();
    armarEG = data;
    generarOpciones(armarEG);
});


const armarPC = document.getElementById("armarpcya");
const tabla = document.getElementById("seleccion-productos-tabla");
const tablaCuerpo = document.getElementById("seleccion-productos-tabla-body");

armarPC.addEventListener('click', function () {
    tablaCuerpo.innerHTML = "";
    let totalValue = 0;
    const labelcell = [select1.getAttribute("label"), select2.getAttribute("label"), select3.getAttribute("label"), select4.getAttribute("label"), select5.getAttribute("label"), select6.getAttribute("label")];
    const valuecell = [select1.value, select2.value, select3.value, select4.value, select5.value, select6.value];
    // Verificar si se han seleccionado 6 productos
    if (labelcell.includes(undefined) || valuecell.includes("")) {
        alert("Debe seleccionar 6 productos antes de continuar");
        return;
    }
    for (let index = 0; index < 6; index++) {
        
        const row = `<tr><td>${labelcell[index]}</td><td>${valuecell[index]}</td></tr>`;
        tablaCuerpo.innerHTML += row;
        totalValue += parseFloat(valuecell[index].replace("$", ""));
    }
    tablaCuerpo.innerHTML += `<tr><td><b>Total</b></td><td><b>${totalValue}</b></td></tr>`;
    tabla.style.display = "table";
})

function resetPage() {
    // Reiniciar la página
    location.reload();
}