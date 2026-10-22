/* ==================================
   FUNCIÓN: MENSAJE DE BIENVENIDA
================================== */

function mostrarMensaje() {

    alert("¡Bienvenido a esta página web!");

}


/* ==================================
   FUNCIÓN: SERVICIOS
================================== */

function mostrarServicio(servicio) {

    alert(
        "Seleccionaste: " + servicio
    );

}


/* ==================================
   CALCULADORA
================================== */

// Obtener los números escritos por el usuario

function obtenerNumeros() {

    let numero1 =
        parseFloat(
            document.getElementById("numero1").value
        );

    let numero2 =
        parseFloat(
            document.getElementById("numero2").value
        );

    return [numero1, numero2];

}


// SUMA

function sumar() {

    let numeros = obtenerNumeros();

    let resultado =
        numeros[0] + numeros[1];

    mostrarResultado(resultado);

}


// RESTA

function restar() {

    let numeros = obtenerNumeros();

    let resultado =
        numeros[0] - numeros[1];

    mostrarResultado(resultado);

}


// MULTIPLICACIÓN

function multiplicar() {

    let numeros = obtenerNumeros();

    let resultado =
        numeros[0] * numeros[1];

    mostrarResultado(resultado);

}


// DIVISIÓN

function dividir() {

    let numeros = obtenerNumeros();

    if (numeros[1] === 0) {

        alert(
            "No es posible dividir entre cero."
        );

        return;
    }

    let resultado =
        numeros[0] / numeros[1];

    mostrarResultado(resultado);

}


// Mostrar resultado

function mostrarResultado(resultado) {

    document.getElementById("resultado").innerText =
        "Resultado: " + resultado;

}


/* ==================================
   GALERÍA
================================== */

function ampliarImagen(imagen) {

    let galeria = imagen.parentElement;
    let imagenActiva = galeria.querySelector(".activa");

    if (imagenActiva === imagen) {
        imagen.classList.remove("activa");
        galeria.classList.remove("imagen-abierta");
        return;
    }

    if (imagenActiva) {
        imagenActiva.classList.remove("activa");
    }

    imagen.classList.add("activa");
    galeria.classList.add("imagen-abierta");

}


/* ==================================
   FORMULARIO
================================== */

function enviarFormulario(evento) {

    evento.preventDefault();

    let nombre =
        document.getElementById("nombre").value;

    let correo =
        document.getElementById("correo").value;

    alert(
        "Gracias " +
        nombre +
        ". Hemos recibido tu mensaje."
    );

    console.log(
        "Nombre:",
        nombre
    );

    console.log(
        "Correo:",
        correo
    );
}
/* =========================================
   FORMULARIO CON VALIDACIONES
========================================= */

const formulario = document.getElementById("formularioContacto");


/* =========================================
   MOSTRAR ERROR
========================================= */

function mostrarError(campo, mensaje) {

    campo.classList.add("error");

    campo.classList.remove("correcto");


    const mensajeError =
        document.getElementById(
            "error" + capitalizar(campo.id)
        );


    mensajeError.textContent = mensaje;

}


/* =========================================
   MARCAR CAMPO CORRECTO
========================================= */

function marcarCorrecto(campo) {

    campo.classList.add("correcto");

    campo.classList.remove("error");


    const mensajeError =
        document.getElementById(
            "error" + capitalizar(campo.id)
        );


    mensajeError.textContent = "";

}


/* =========================================
   LIMPIAR ERRORES
========================================= */

function limpiarErrores() {

    const campos = document.querySelectorAll(
        "#formularioContacto input, #formularioContacto textarea"
    );


    campos.forEach(function(campo) {

        campo.classList.remove("error");

        campo.classList.remove("correcto");

    });


    const mensajes =
        document.querySelectorAll(".mensaje-error");


    mensajes.forEach(function(mensaje) {

        mensaje.textContent = "";

    });

}


/* =========================================
   CAPITALIZAR
========================================= */

function capitalizar(texto) {

    return texto.charAt(0).toUpperCase()
        + texto.slice(1);

}


/* ==================================
   INICIO DE SESIÓN
================================== */

const formularioLogin = document.getElementById("loginForm");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const mensaje = document.getElementById("loginMessage");
        mensaje.textContent =
            "El formulario está listo, pero el inicio de sesión requiere conectarse a un servidor.";
    });
}


/* ==================================
   REGISTRO DE CUENTA
================================== */

const formularioRegistro = document.getElementById("registroForm");

if (formularioRegistro) {
    formularioRegistro.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const mensaje = document.getElementById("registroMessage");
        mensaje.textContent =
            "El formulario está listo, pero el registro requiere conectarse a un servidor.";
    });
}
