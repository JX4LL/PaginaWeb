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
        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: correo,
                password: password
            });

            if (error) {
                mensaje.textContent = "Correo o contraseña incorrectos.";
                console.error("Error de inicio de sesión en Supabase:", error);
                return;
            }

            const metadatos = data.user.user_metadata || {};
            const nombreCompleto = [
                metadatos.nombre,
                metadatos.segundo_nombre,
                metadatos.apellidos
            ]
                .filter(parte => typeof parte === "string" && parte.trim())
                .join(" ") || metadatos.name || correo.split("@")[0];

            sessionStorage.setItem("nombreUsuario", nombreCompleto);
            mensaje.textContent = "¡Bienvenido! Inicio de sesión exitoso. Te estamos llevando al inicio...";
            console.log("Usuario conectado:", data.user);
            window.setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } catch (error) {
            mensaje.textContent = "No se pudo conectar con Supabase. Intenta de nuevo.";
            console.error("Error de conexión durante el inicio de sesión:", error);
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
        const segundoNombre = document.getElementById("registroSegundoNombre").value;
        const apellidos = document.getElementById("registroApellidos").value;
        const fechaNacimiento = document.getElementById("registroFechaNacimiento").value;
        const telefono = document.getElementById("registroTelefono").value;
        const correo = document.getElementById("registroEmail").value;
        const password = document.getElementById("registroPassword").value;
        const confirmarPassword = document.getElementById("registroConfirmarPassword").value;
        const mensaje = document.getElementById("registroMessage");

        if (password !== confirmarPassword) {
            mensaje.textContent = "Las contraseñas no coinciden.";
            alert("Las contraseñas no coinciden. Verifica ambas e intenta de nuevo.");
            return;
        }

        mensaje.textContent = "Creando cuenta...";
        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email: correo,
                password: password,
                options: {
                    data: {
                        nombre: nombre,
                        segundo_nombre: segundoNombre,
                        apellidos: apellidos,
                        fecha_nacimiento: fechaNacimiento,
                        telefono: telefono
                    }
                }
            });

            if (error) {
                mensaje.textContent = "Error al registrar: " + error.message;
                console.error("Error de registro en Supabase:", error);
            } else {
                const nombreCompleto = [nombre, segundoNombre, apellidos]
                    .filter(parte => parte.trim())
                    .join(" ");
                sessionStorage.setItem("nombreUsuario", nombreCompleto);
                mensaje.textContent = "¡Registro exitoso! Revisa tu correo para confirmar tu cuenta. Te estamos llevando al inicio...";
                console.log("Usuario registrado:", data.user);
                window.setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500);
            }
        } catch (error) {
            mensaje.textContent = "No se pudo conectar con Supabase. Intenta de nuevo.";
            console.error("Error de conexión durante el registro:", error);
        }
    });
}
