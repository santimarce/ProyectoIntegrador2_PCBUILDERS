//REGISTRO


function Correo() {
    var correo = String(document.getElementById("correo").value);

    if (correo.includes('@') && correo.includes('.')) {

    } else {
        Swal.fire({
            title: 'ERROR',
            text: '"' + correo + '"' + ' no es una direccion de correo electronico',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
            width: '400px',
        })
    };

}

function contras() {
    var contra1 = document.registro.cont1.value;
    var contra2 = document.registro.cont2.value;
    var contraDef = contra2
    if (contra1 != contra2) {
        Swal.fire({
            title: 'UPS',
            text: 'Las contraseñas no coinciden',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
            width: '400px',
        })
    }
}

function reg() {

    if (document.registro.nom.value == 0 || document.registro.ape.value == 0 ||
        document.registro.correo.value == 0 || document.registro.id.value == 0 ||
        document.registro.fecha.value == 0 || document.registro.num.value == 0 ||
        document.registro.dir.value == 0) {
        Swal.fire({
            title: 'POR FAVOR',
            text: 'Rellene todos los datos del formulario',
            icon: 'warning',
            timer: 5000,
            timerProgressBar: true,
            width: '400px',
        })
    } else if (document.getElementById("terminos").checked == true) {


        var correo = document.getElementById("correo").value;

        (async () => {
            await Swal.fire({
                title: 'UN PASO MAS',
                text: 'Hemos enviado un codigo de activacion al correo ' + '"' + correo + '"' + '¡Activa tu cuenta con un solo click!',
                timer: 8000,
                timerProgressBar: true,
                icon: 'success'
            })


            window.location.assign("/registro")
        })();
    } else {
        Swal.fire({
            title: 'ERROR',
            text: 'Acepte los teminos y condiciones de uso paara poder registrarse',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
            width: '400px',
        })
    }
}

//LOGIN
function loginx() {

    if (document.login.usu.value == 'Usuario1' && document.login.contra.value == '123456') {
        (async () => {
            await Swal.fire({
                title: 'INICIO DE SESION CORRECTO',
                text: 'redirigiendo...',
                icon: 'success',
                width: '400px',
            });
            window.location.assign("/dashboard");
        })();

    } else {
        Swal.fire({
            title: 'USUARIO O CONTRASEÑA INCORRECTA',
            text: 'intentelo de nuevo',
            icon: 'error',
            width: '400px',
        });

    }
}


//LOGIN ADMINISTRADOR
function loginAd() {
    var usuario, clave
    usuario = document.getElementById("usuario").value;
    clave = document.getElementById("contra").value;
    if (usuario == "Admin1" && clave == "654321") {
        (async () => {
            await Swal.fire({
                title: 'INICIO DE SESION CORRECTO',
                text: 'redirigiendo...',
                icon: 'success',
                width: '400px',
            });
            window.location.assign("/dashboardAdmin");
        })();
    } else {
        Swal.fire({
            title: 'USUARIO O CONTRASEÑA INCORRECTA',
            text: 'intentelo de nuevo',
            icon: 'error',
            width: '400px',
        })
    }
}

//CAMBIO DE DATOS
function cambDatos() {
    alert("Datos cambiados correctamente")
    window.location.assign("/dashboardAdmin")
}