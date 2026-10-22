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
   EVENTO ENVIAR FORMULARIO
========================================= */
formulario.addEventListener("submit", function(evento) {
    // Evita que la página se recargue
    evento.preventDefault();
    // Limpiar errores anteriores
    limpiarErrores();
    // Variable que determinará si todo está correcto
    let formularioValido = true;
    /* =====================================
       OBTENER LOS CAMPOS
    ===================================== */
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const asunto = document.getElementById("asunto");
    const mensaje = document.getElementById("mensaje");
    /* =====================================
       VALIDAR NOMBRE
    ===================================== */
    if (nombre.value.trim() === "") {
        mostrarError(
            nombre,
            "El nombre es obligatorio."
        );
        formularioValido = false;
    }
    else if (nombre.value.trim().length < 3) {
        mostrarError(
            nombre,
            "El nombre debe tener mínimo 3 caracteres."
        );
        formularioValido = false;
    }
    else if (nombre.value.trim().length > 30) {
        mostrarError(
            nombre,
            "El nombre no puede superar 30 caracteres."
        );
        formularioValido = false;
    }
    else {
        marcarCorrecto(nombre);
    }
    /* =====================================
       VALIDAR APELLIDO
    ===================================== */
    if (apellido.value.trim() === "") {
        mostrarError(
            apellido,
            "El apellido es obligatorio."
        );
        formularioValido = false;
    }
    else if (apellido.value.trim().length < 3) {
        mostrarError(
            apellido,
            "El apellido debe tener mínimo 3 caracteres."
        );
        formularioValido = false;
    }
    else if (apellido.value.trim().length > 30) {
        mostrarError(
            apellido,
            "El apellido no puede superar 30 caracteres."
        );
        formularioValido = false;
    }
    else {
        marcarCorrecto(apellido);
    }
    /* =====================================
       VALIDAR EMAIL
    ===================================== */
    const patronEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === "") {
        mostrarError(
            email,
            "El correo electrónico es obligatorio."
        );
        formularioValido = false;
    }
    else if (!patronEmail.test(email.value.trim())) {
        mostrarError(
            email,
            "Ingresa un correo electrónico válido."
        );
        formularioValido = false;
    }
    else {
        marcarCorrecto(email);
    }
    /* =====================================
       VALIDAR TELEFONO
    ===================================== */
    const patronTelefono = /^[0-9]+$/;
    if (telefono.value.trim() === "") {
        mostrarError(
            telefono,
            "El número de teléfono es obligatorio."
        );
        formularioValido = false;
    }
    else if (!patronTelefono.test(telefono.value.trim())) {
        mostrarError(
            telefono,
            "El teléfono solo debe contener números."
        );
        formularioValido = false;
    }
    else if (telefono.value.trim().length < 7) {
        mostrarError(
            telefono,
            "El teléfono debe tener mínimo 7 números."
        );
        formularioValido = false;
    }
    else if (telefono.value.trim().length > 10) {
        mostrarError(
            telefono,
            "El teléfono no puede superar 10 números."
        );
        formularioValido = false;
    }
    else {
        marcarCorrecto(telefono);
    }
    /* =====================================
       VALIDAR ASUNTO
    ===================================== */
    if (asunto.value.trim() === "") {
        mostrarError(
            asunto,
            "El asunto es obligatorio."
        );
        formularioValido = false;
    }
    else if (asunto.value.trim().length < 5) {
        mostrarError(
            asunto,
            "El asunto debe tener mínimo 5 caracteres."
        );
        formularioValido = false;
    }
    else if (asunto.value.trim().length > 80) {
        mostrarError(
            asunto,
            "El asunto no puede superar 80 caracteres."
        );
        formularioValido = false;
    }
    else {
        marcarCorrecto(asunto);
    }
    /* =====================================
       VALIDAR MENSAJE
    ===================================== */
    if (mensaje.value.trim() === "") {
        mostrarError(
            mensaje,
            "El mensaje es obligatorio."
        );
        formularioValido = false;
    }
    else if (mensaje.value.trim().length < 10) {
        mostrarError(
            mensaje,
            "El mensaje debe tener mínimo 10 caracteres."
        );
        formularioValido = false;
    }
    else if (mensaje.value.trim().length > 500) {
        mostrarError(
            mensaje,
            "El mensaje no puede superar 500 caracteres."
        );
        formularioValido = false;
    }
    else {
        marcarCorrecto(mensaje);
    }
    /* =====================================
       RESULTADO FINAL
    ===================================== */
    if (formularioValido) {
        document.getElementById("mensajeExito").textContent =
            "✓ Formulario enviado correctamente.";
        formulario.reset();
    }
    else {
        document.getElementById("mensajeExito").textContent =
            "Por favor, corrige los campos indicados.";
    }
});
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
