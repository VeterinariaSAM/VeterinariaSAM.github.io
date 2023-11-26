function iniciarSesionGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // El usuario se ha autenticado con Google
            var user = result.user;
            console.log(user);

            // Puedes acceder a la información del usuario y guardarla en tu base de datos
            var nombre = user.displayName;
            var correo = user.email;
            // Dentro de la función iniciarSesionGoogle() después de obtener la información del usuario
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

function mostrarMensajeExito(mensaje) {
    Swal.fire({
        title: 'Registro exitoso',
        text: mensaje,
        icon: 'success',
        timer: 2000, // 2 segundos
        showConfirmButton: false
    }).then(() => {
        // Puedes realizar alguna acción adicional después de que se cierre el mensaje
    });
}

function mostrarMensajeError(mensaje) {
    Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
    });
}

function mostrarMensajeAdvertencia(mensaje) {
    Swal.fire({
        title: 'Advertencia',
        text: mensaje,
        icon: 'warning',
    });
}
