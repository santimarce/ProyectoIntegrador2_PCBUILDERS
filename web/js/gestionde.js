const body=document.querySelector("body");
const tbody=document.querySelector("tbody");

body.onload = () =>{
    llenartabla()
}

function crearfila(u, i) {
    var tr = document.createElement("tr");
    //Borrar
    var tdBorrar = document.createElement("td");
    var iborrar = document.createElement("i");
    iborrar.className = "fa-solid fa-trash-can"
    iborrar.onclick =()=>{
        var confirmar= confirm("Está seguro?")
        if (confirmar) {
            borrarusuario(i);
            borrartabla();
            llenartabla();
        }
    }
    //Editar
    var tdEditar = document.createElement("td");
    var iEditar = document.createElement("i");
    iEditar.className = "fa-solid fa-file-pen"
    iEditar.onclick =()=>{
        alert("Actualizar "+i)
    }
    //Nombre
    var tdNombre = document.createElement("td");
    tdNombre.textContent = u.nickname
    //Correo
    var tdCorreo = document.createElement("td");
    tdCorreo.textContent = u.email    
    //Clave
    var tdClave = document.createElement("td");
    tdClave.textContent = u.password
    //Unirse
    tdBorrar.appendChild(iborrar);
    tdEditar.appendChild(iEditar);
    tr.append(tdBorrar, tdEditar, tdNombre, tdCorreo, tdClave);
    
    return tr;
}

function borrartabla() {
    tbody.innerHTML = " "
}

function llenartabla(){
    let trs = [];
    var usuarios = obtener();
    usuarios.forEach((u, i)=>{
        var tr = crearfila(u, i)
        trs.push(tr)
    })
    //Unirse con tbody
    tbody.append(...trs);
}