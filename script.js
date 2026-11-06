// ==================================
// CONEXIÓN CON SUPABASE
// ==================================

const supabaseClient = window.supabase.createClient(
    "https://ompgpgkthqhqmzicpanx.supabase.co",
    "sb_publishable_qkWeQmbdzIWCPTFrXHLF1g_BZjGs885"
);/* ==================================
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
   FORMULARIO DE CONTACTO
================================== */
async function enviarFormulario(evento) {
    evento.preventDefault();
    // Obtener información del formulario
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let mensaje = document.getElementById("mensaje").value;
    // Obtener el formulario
    const formulario = evento.target;
    // Guardar información en Supabase
    const { data, error } = await supabaseClient
        .from("mensajes_contacto")
        .insert([
            {
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            }
        ]);
    // Comprobar si ocurrió un error
    if (error) {
        alert("Error al enviar el mensaje: " + error.message);
        console.error(error);
    } else {
        alert("¡Gracias " + nombre + "! Tu mensaje fue enviado correctamente.");
        // Limpiar formulario
        formulario.reset();
        console.log("Mensaje guardado correctamente");
    }
}/* =========================================
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
/* ==================================
   SUPABASE
================================== */
const formularioLogin = document.getElementById("loginForm");
if (formularioLogin) {
    formularioLogin.addEventListener("submit", async function(evento) {
        evento.preventDefault();
        const correo = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const mensaje = document.getElementById("loginMessage");
        if (!supabaseClient) {
            mensaje.textContent = "No se pudo conectar con Supabase.";
            return;
        }
        mensaje.textContent = "Verificando usuario...";
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: correo,
            password: password
        });
        if (error) {
            mensaje.textContent = "Correo o contraseña incorrectos.";
        } else {
            mensaje.textContent = "¡Bienvenido! Inicio de sesión exitoso.";
            console.log("Usuario conectado:", data.user);
        }
    });
}
/* ==================================
   REGISTRO DE CUENTA
================================== */
/* ==================================
   SUPABASE
================================== */
const formularioRegistro = document.getElementById("registroForm");
if (formularioRegistro) {
    formularioRegistro.addEventListener("submit", async function(evento) {
        evento.preventDefault();
        // Obtener los datos del formulario
        const nombre = document.getElementById("registroNombre").value;
        const correo = document.getElementById("registroEmail").value;
        const password = document.getElementById("registroPassword").value;
        const mensaje = document.getElementById("registroMessage");
        mensaje.textContent = "Creando cuenta...";
        // Registrar usuario en Supabase
        const { data, error } = await supabaseClient.auth.signUp({
            email: correo,
            password: password,
            options: {
                data: {
                    nombre: nombre
                }
            }
        });
        // Comprobar resultado
        if (error) {
            mensaje.textContent = "Error al registrar: " + error.message;
        } else {
            mensaje.textContent =
                "¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.";
            formularioRegistro.reset();
            console.log("Usuario registrado:", data.user);
        }
    });
}
