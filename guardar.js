function guardar() {
    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById("name").value;
    var apellido = document.getElementById("last").value;
    var nombre_usuario = document.getElementById("usName").value;
    var correo = document.getElementById("email").value;
    var fecha_nac = document.getElementById("fechaNac").value;
    var contraseña = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Realizar validaciones
    if (!nombre || !apellido || !nombre_usuario || !correo || !fecha_nac || !contraseña || !confirmPassword) {
        alert("Todos los campos son obligatorios");
        return;
    }

    // Validar la fecha de nacimiento
    var fechaNacimiento = new Date(fecha_nac);
    var hoy = new Date();
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    if (edad < 18) {
        alert("Debes ser mayor de 18 años para registrarte");
        return;
    }

    db.collection("usuarios").add({
        nombre: nombre,
        apellido: apellido,
        nombre_usuario: nombre_usuario,
        correo: correo,
        fecha_nac: fecha_nac,
        contraseña: contraseña
    })
        .then((docRef) => {
            // Mostrar un mensaje de éxito con SweetAlert
            Swal.fire({
                title: 'Registro exitoso',
                text: 'Tu registro se ha completado correctamente',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                // Ocultar el formulario de registro
                document.getElementById("registrarse").style.display = "none";
                // Mostrar el formulario de inicio de sesión
                document.getElementById("iniciar-sesion").style.display = "block";
            });
        })
        .catch((error) => {
            // Mostrar un mensaje de error genérico con SweetAlert
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al registrar tus datos. Por favor, inténtalo de nuevo.',
                icon: 'error',
            });
        });
}

function iniciarSesionGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider)
        .then(() => {
            // No hay código adicional aquí, ya que el flujo de autenticación se manejará después de la redirección
        })
        .catch((error) => {
            // Maneja los errores, si los hay
            console.error(error);
            mostrarMensajeError("Hubo un problema al autenticar con Google. Por favor, inténtalo de nuevo.");
        });
}

// Agrega esta función para manejar la respuesta después de la redirección
function handleRedirectResult() {
    firebase.auth().getRedirectResult()
        .then((result) => {
            if (result.credential) {
                // Este es un token OAuth con información sobre el usuario
                var credential = result.credential;
                // ...
            }
            // El objeto 'user' contiene información sobre el usuario que ha iniciado sesión
            var user = result.user;
            console.log(user);

            // Puedes acceder a la información del usuario y guardarla en tu base de datos
            var nombre = user.displayName;
            var correo = user.email;
            // Dentro de la función handleRedirectResult() después de obtener la información del usuario
            var usuarioRef = db.collection("usuarios").doc(user.uid);

            usuarioRef.get().then((doc) => {
                if (doc.exists) {
                    // El usuario ya está registrado, puedes actualizar su información si es necesario
                    console.log("Usuario ya registrado:", doc.data());
                    mostrarMensajeAdvertencia("Ya estás registrado. No es necesario volver a registrarte.");
                } else {
                    // El usuario no está registrado, guarda su información en la base de datos
                    usuarioRef.set({
                        nombre: user.displayName,
                        correo: user.email,
                        // Otras propiedades que quieras almacenar
                    }).then(() => {
                        console.log("Usuario registrado con éxito");
                        mostrarMensajeExito("Tu registro se ha completado correctamente");
                    }).catch((error) => {
                        console.error("Error al registrar usuario:", error);
                        mostrarMensajeError("Hubo un problema al registrar tus datos. Por favor, inténtalo de nuevo.");
                    });
                }
            }).catch((error) => {
                console.error("Error al verificar registro de usuario:", error);
                mostrarMensajeError("Hubo un problema al verificar tu registro. Por favor, inténtalo de nuevo.");
            });
        })
        .catch((error) => {
            // Maneja los errores, si los hay
            console.error(error);
            mostrarMensajeError("Hubo un problema al autenticar con Google. Por favor, inténtalo de nuevo.");
        });
}

window.onload = function () {
    handleRedirectResult();
};
