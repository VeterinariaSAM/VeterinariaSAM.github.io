function validarYIniciarSesion() {
    event.preventDefault();  // Evitar la redirección automática

    var correoAdmin = document.getElementById("correoInicioSesion").value;
    var passwordAdmin = document.getElementById("passwordInicioSesion").value;

    // Verificar si son las credenciales del administrador
    if (
        correoAdmin === "SAMadmin_2023@gmail.com" &&
        passwordAdmin === "IC-43M0401"
    ) {
        // Credenciales de administrador válidas, mostrar mensaje de "Registro exitoso"
        Swal.fire({
            icon: "success",
            title: "¡Bienvenido Administrador!",
            showConfirmButton: false,
            timer: 1500, // Duración de la alerta en milisegundos
            onOpen: () => {
                document.body.style.backgroundColor = "#e6ffe6";
                // Puedes agregar animaciones adicionales aquí si es necesario
            },
            onClose: () => {
                window.location.href = "Empleado.html";
            }
        });
        return false; // Evitar que el formulario se envíe
    } else {
        // No es el administrador, intentar iniciar sesión en Firebase
        iniciarSesion();
    }
}

function iniciarSesion() {
    var email = document.getElementById("correoInicioSesion").value;
    var password = document.getElementById("passwordInicioSesion").value;

    // Inicia sesión en Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Inicio de sesión exitoso
        Swal.fire("Éxito", "Iniciando sesión", "success")
          .then(() => {
            // Redirecciona al usuario a la página de inicio
            window.location.href = "inicio.html";
          });
      })
      .catch((error) => {
        Swal.fire("Error", "Correo/Contraseña incorrectos: " + error.message, "error");
      });
}


function cerrarSesion() {
    // Limpia la información del usuario en el Local Storage (si es necesario)
    localStorage.removeItem("userData");

    // Redirecciona a la página de inicio de sesión
    window.location.href = "iniciar_Sesion.html";
}

function cerrarSesionYRedireccionar() {
    cerrarSesion(); // Llama a la función existente para cerrar la sesión
}
