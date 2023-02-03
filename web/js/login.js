const formRegistro = document.querySelector("#formRegistro");

let usuarios = [];
let editing = false;
let usuarioId = null;

window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/getList/usuarios");
  const data = await response.json();
  usuarios = data;
  renderUser(usuarios);
});

formRegistro.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cedula = formRegistro["cedula"].value;
  const correo = formRegistro["correo"].value;
  const nombres = formRegistro["nombres"].value;
  const fechaNacimiento = formRegistro["fechaNacimiento"].value;
  const callePrimaria = formRegistro["callePrimaria"].value;
  const calleSecundaria = formRegistro["calleSecundaria"].value;
  const contrasenia = formRegistro["contrasenia"].value;

  if (!editing) {
    // send user to backend
    const response = await fetch("/save/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedula,
        correo,
        nombres,
        fechaNacimiento,
        callePrimaria,
        calleSecundaria,
        contrasenia
      }),
    });

    const data = await response.json();
    usuarios.push(data);
    renderUser(usuarios);
  } else {
    const response = await fetch(`/update/usuario/${usuarioId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedula,
        correo,
        nombres,
        fechaNacimiento,
        callePrimaria,
        calleSecundaria,
        contrasenia
      }),
    });
    const usuarioActualizado = await response.json();

    usuarios = usuarios.map((usuario) =>
      usuario.cedula === usuarioActualizado.cedula ? usuarioActualizado : usuario
    );
    console.log(usuarios)
    renderUser(usuarios);

    editing = false;
    usuarioId = null;
  }
  formRegistro.reset();
});

function renderUser(usuarios) {
  const userList = document.querySelector("#tablaUsuarios");
  userList.innerHTML = "";
  usuarios.forEach((usuario) => {
    const userItem = document.createElement("tr");
    userItem.innerHTML = `
    <th scope="row">${usuario.cedula}</th>
    <td><button class="btn-edit btn btn-info">Editar</button><button class="btn-delete btn btn-danger">Eliminar</button></td>
    <td>${usuario.correo}</td>
    <td>${usuario.nombres}</td>
    <td>${usuario.fechanacimiento}</td>
    <td>${usuario.esusuario ? "Si" : "No"}</td>
    <td>${usuario.esadmin ? "Si" : "No"}</td>
    <td>${usuario.nivelrol}</td>
    <td>${usuario.contrasenia}</td>
    `;

    // Handle delete button
    const btnDelete = userItem.querySelector(".btn-delete");

    btnDelete.addEventListener("click", async (e) => {
      const response = await fetch(`/delete/usuario/${usuario.cedula}`, {
        method: "DELETE",
      });

      const data = await response.json();

      usuarios = usuarios.filter((usuario) => usuario.cedula !== data.cedula);
      renderUser(usuarios);
    });

    userList.appendChild(userItem);

    // Handle edit button
    const btnEdit = userItem.querySelector(".btn-edit");

    btnEdit.addEventListener("click", async (e) => {
      const response = await fetch(`/update/usuario/${usuario.cedula}`);
      const data = await response.json();

      formRegistro["correo"].value = data.correo;
      formRegistro["nombres"].value = data.nombres;

      editing = true;
      usuarioId = usuario.cedula;
    });
  });
}