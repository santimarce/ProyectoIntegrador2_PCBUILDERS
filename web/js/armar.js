//declaracion de variables y arrays
let acum = 0;
var fin = true;
var componentes = [];
var precios = [];

function Armarpc() {

    //VERIFICACION DE CASILLAS DE PROCESADORES
    if (document.getElementById("pro1").checked == true && document.getElementById("pro2").checked == true && document.getElementById("pro3").checked == true) {
        Swal.fire({
            title: 'Ninguna pc funciona con 2 o mas procesadores',
            text: 'Selecciona solo 1 de los tres procesadores disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
        });
        fin = false;

    } else if (document.getElementById("pro1").checked == true) {
        acum = acum + 799;
        componentes.push("INTEL CORE I9-12900K 16 núcleos y 24 hilos");
        precios.push(" 799$");
    } else if (document.getElementById("pro2").checked == true) {
        acum = acum + 370;
        componentes.push("INTEL CORE I7-12700KF 12 núcleos y 20 hilos");
        precios.push("370$");
    } else if (document.getElementById("pro3").checked == true) {
        acum = acum + 750;
        componentes.push("AMD Ryzen 9 5950X");
        precios.push("750$");
    } else {
        Swal.fire({
            title: 'Ninguna pc funciona sin procesador',
            text: 'Selecciona 1 de los tres procesadores disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true,
        });
        fin = false;
    };
    //VERIFICACION DE CASILLAS DE TARJETAS MADRE
    if (document.getElementById("tarM1").checked == true && document.getElementById("tarM2").checked == true && document.getElementById("tarM3").checked == true) {
        Swal.fire({
            title: 'Ninguna pc funciona con 2 o mas tarjetas madres',
            text: 'Selecciona solo 1 de las tres tarjetas madres disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    } else if (document.getElementById("tarM1").checked == true) {
        acum = acum + 272;
        componentes.push("Mainboard ROG STRIX Z690-F ");
        precios.push("272$");
    } else if (document.getElementById("tarM2").checked == true) {
        acum = acum + 439;
        componentes.push("Mainboard ROG STRIX Z690-A");
        precios.push("439$");
    } else if (document.getElementById("tarM3").checked == true) {
        acum = acum + 250;
        componentes.push("Mainboard GIGABYTE X570");
        precios.push("250$");
    } else {
        Swal.fire({
            title: 'Ninguna pc funciona sin tarjeta madre',
            text: 'Selecciona 1 de las tres tarjetas madres disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    };
    //VERIFICACION DE CASILLAS DE MEMORIAS RAM
    if (document.getElementById("Ram1").checked == true && document.getElementById("Ram2").checked == true && document.getElementById("Ram3").checked == true) {
        Swal.fire({
            title: 'Ninguna pc funciona con 2 o mas memorias Ram de diferentes marcas',
            text: 'Selecciona solo 1 de las tres memorias Ram disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    } else if (document.getElementById("Ram1").checked == true) {
        acum = acum + 382;
        componentes.push("XPG RGB 32GB DDR5 5200MHZ");
        precios.push("382$");
    } else if (document.getElementById("Ram2").checked == true) {
        acum = acum + 104;
        componentes.push("Kingston Fury Beast 16GB RGB 3200MHZ");
        precios.push("104$");
    } else if (document.getElementById("Ram3").checked == true) {
        acum = acum + 234;
        componentes.push("Kinstom fury beast 64GB RGB 3200MHZ");
        precios.push("234$");
    } else {
        Swal.fire({
            title: 'Ninguna pc funciona sin memorias Ram',
            text: 'Selecciona 1 de las tres memorias Ram disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    };
    //VERIFICACION DE CASILLAS DE TARJETAS GRAFICAS
    if (document.getElementById("TarG1").checked == true && document.getElementById("TarG2").checked == true && document.getElementById("TarG3").checked == true) {
        Swal.fire({
            title: 'Ninguna pc funciona con 2 o mas tarjetas graficas',
            text: 'Selecciona solo 1 de las tarjetas graficas disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    } else if (document.getElementById("TarG1").checked == true) {
        acum = acum + 854;
        componentes.push("Zotac RTX 3080Ti Trinity 12GB GDDR6X");
        precios.push("854$");
    } else if (document.getElementById("TarG2").checked == true) {
        acum = acum + 443;
        componentes.push("TUF GeForce RTX 30160 Ti");
        precios.push("443$");
    } else if (document.getElementById("TarG3").checked == true) {
        acum = acum + 1224;
        componentes.push("ASUS tuf GeForce RTX 3090 OC 24GB");
        precios.push("1224$");
    } else {
        Swal.fire({
            title: 'Si quieres una PC GAMER de verdad necesitas tarjeta grafica',
            text: 'Selecciona 1 de las tarjetas graficas disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    };
    //VERIFICACION DE CASILLAS DE UNINDADES SSD
    if (document.getElementById("SSD1").checked == true && document.getElementById("SSD2").checked == true && document.getElementById("SSD3").checked == true) {

    } else if (document.getElementById("SSD1").checked == true) {
        acum = acum + 167;
        componentes.push("Corsair 1TB NVMe PCie 4.0");
        precios.push("167$");
    } else if (document.getElementById("SSD2").checked == true) {
        acum = acum + 164;
        componentes.push("Corsair 1TB PCie 4.0");
        precios.push("164$");
    } else if (document.getElementById("SSD3").checked == true) {
        acum = acum + 165;
        componentes.push("Corsair MP600 core 1TB NVMe");
        precios.push("165$");
    } else {
        Swal.fire({
            title: 'Ninguna pc funciona sin una unidad SSD',
            text: 'Selecciona 1 de las unidades SSD disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    };
    //VERIFICACION DE CASILLAS DE FUENTES DE PODER
    if (document.getElementById("Fuente1").checked == true && document.getElementById("Fuente2").checked == true) {
        Swal.fire({
            title: 'Ninguna pc funciona con 2 o mas fuentes de poder',
            text: 'Selecciona solo 1 de las fuentes de poder disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    } else if (document.getElementById("Fuente1").checked == true) {
        acum = acum + 170;
        componentes.push("Corsair RM1000X - 1000 watts");
        precios.push("170$");
    } else if (document.getElementById("Fuente2").checked == true) {
        acum = acum + 177;
        componentes.push("Corsair RM750x - 750 watts");
        precios.push("177$");
    } else {
        Swal.fire({
            title: 'Ninguna pc funciona sin fuente de poder',
            text: 'Selecciona 1 de las fuentes de poder disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    }
    //VERIFICACION DE CASILLAS DE CASE
    if (document.getElementById("Case1").checked == true && document.getElementById("Case2").checked == true) {
        Swal.fire({
            title: '¿EN SERIO? ¿2 CASES?',
            text: 'Selecciona solo 1 de las cases disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    } else if (document.getElementById("Case1").checked == true) {
        acum = acum + 300;
        componentes.push("Corsair 7000X RGB ICUE");
        precios.push("300$");
    } else if (document.getElementById("Case2").checked == true) {
        acum = acum + 150;
        componentes.push("CORSAIR 5000D AIRFLOW TEMPERED GLASS");
        precios.push("150$");
    } else {
        Swal.fire({
            title: '¿DONDE PIENSAS METER TODOS LOS COMPONENTES?',
            text: 'Selecciona 1 de las cases disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    };
    //VERIFICACION DE CASILLAS DE COOLERS
    if (document.getElementById("Cong1").checked == true && document.getElementById("Cong2").checked == true) {
        Swal.fire({
            title: 'Ninguna Pc funciona con dos Coolers',
            text: 'Selecciona solo 1 de los dos cooler disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;

    } else if (document.getElementById("Cong1").checked == true) {
        acum = acum + 180;
        componentes.push("Water cooler Corsair ICUE H150i RGB PRO XT");
        precios.push("180$");
    } else if (document.getElementById("Cong2").checked == true) {
        acum = acum + 174;
        componentes.push("Water cooler Corsair ICUE H100i RGB 2x 120mm");
        precios.push("174$");
    } else {
        Swal.fire({
            title: 'Ninguna Pc funciona si Cooler',
            text: 'Selecciona 1 de los dos cooler disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    };
    //VERIFICACION DE CASILLAS DE MONITORES
    if (document.getElementById("Monitor1").checked == true && document.getElementById("Monitor2").checked == true && document.getElementById("Monitor3").checked == true) {
        Swal.fire({
            title: 'Por el momento solo podras comprar un monitor',
            text: 'Selecciona solo 1 de los dos monitores disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    } else if (document.getElementById("Monitor1").checked == true) {
        acum = acum + 148;
        componentes.push("SAMSUNG serie T350 de 22 pulgadas");
        precios.push("148$");
    } else if (document.getElementById("Monitor2").checked == true) {
        acum = acum + 279;
        componentes.push("SAMSUNG LED curvo de 24 pulgadas");
        precios.push("279$");
    } else if (document.getElementById("Monitor3").checked == true) {
        acum = acum + 190;
        componentes.push("ASUS TUF Gaming 23.8");
        precios.push("190$");
    } else {
        Swal.fire({
            title: 'UPS TE OLVIDASTE DEL MONITOR',
            text: 'Selecciona 1 de los tres monitores disponibles',
            icon: 'error',
            timer: 5000,
            timerProgressBar: true
        });
        fin = false;
    };




    if (fin == true) {

        document.getElementById("componentes").innerHTML = componentes.join("<br>");
        document.getElementById("preciosC").innerHTML = precios.join("<br>")
        document.getElementById("precio").innerText = "COSTO = " + acum + " USD";
    } else {
        document.getElementById("componentes").innerHTML = 'ERROR TE FALTAN COMPONENTES';
    }
};

function Mostrar() {
    var img = document.getElementById("PCGAMER");
    img.style.visibility = "visible";
};

function reload() {
    location.reload()
}