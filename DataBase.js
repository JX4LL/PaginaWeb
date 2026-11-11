// ==================================
// CONEXIÓN CON SUPABASE
// ==================================

const supabaseClient = window.supabase.createClient(
    "https://ompgpgkthqhqmzicpanx.supabase.co",
    "sb_publishable_qkWeQmbdzIWCPTFrXHLF1g_BZjGs885"
);

// ==================================
// FORMULARIO DE CONTACTO
// ==================================
async function enviarFormulario(evento) {
    evento.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let mensaje = document.getElementById("mensaje").value;
    const formulario = evento.target;

    const { data, error } = await supabaseClient
        .from("mensajes_contacto")
        .insert([
            {
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            }
        ]);

    if (error) {
        alert("Error al enviar el mensaje: " + error.message);
        console.error(error);
    } else {
        alert("¡Gracias " + nombre + "! Tu mensaje fue enviado correctamente.");
        formulario.reset();
        console.log("Mensaje guardado correctamente");
    }
}

// ==================================
// INICIO DE SESIÓN
// ==================================
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

// ==================================
// REGISTRO DE CUENTA
// ==================================
const formularioRegistro = document.getElementById("registroForm");
if (formularioRegistro) {
    formularioRegistro.addEventListener("submit", async function(evento) {
        evento.preventDefault();
        const nombre = document.getElementById("registroNombre").value;
        const correo = document.getElementById("registroEmail").value;
        const password = document.getElementById("registroPassword").value;
        const mensaje = document.getElementById("registroMessage");
        
        mensaje.textContent = "Creando cuenta...";
        const { data, error } = await supabaseClient.auth.signUp({
            email: correo,
            password: password,
            options: {
                data: {
                    nombre: nombre
                }
            }
        });
        
        if (error) {
            mensaje.textContent = "Error al registrar: " + error.message;
        } else {
            mensaje.textContent = "¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.";
            formularioRegistro.reset();
            console.log("Usuario registrado:", data.user);
        }
    });
}