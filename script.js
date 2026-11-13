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
    alert("Seleccionaste: " + servicio);
}

/* ==================================
   CALCULADORA
================================== */
function obtenerNumeros() {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);
    return [numero1, numero2];
}

function sumar() {
    let numeros = obtenerNumeros();
    let resultado = numeros[0] + numeros[1];
    mostrarResultado(resultado);
}

function restar() {
    let numeros = obtenerNumeros();
    let resultado = numeros[0] - numeros[1];
    mostrarResultado(resultado);
}

function multiplicar() {
    let numeros = obtenerNumeros();
    let resultado = numeros[0] * numeros[1];
    mostrarResultado(resultado);
}

function dividir() {
    let numeros = obtenerNumeros();
    if (numeros[1] === 0) {
        alert("No es posible dividir entre cero.");
        return;
    }
    let resultado = numeros[0] / numeros[1];
    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    document.getElementById("resultado").innerText = "Resultado: " + resultado;
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

const nombrePerfil = document.getElementById("profileUserName");
if (nombrePerfil) {
    const nombreUsuario = sessionStorage.getItem("nombreUsuario");
    if (nombreUsuario) {
        nombrePerfil.textContent = nombreUsuario;
        nombrePerfil.hidden = false;
    }
}
