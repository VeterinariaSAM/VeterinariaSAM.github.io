function iniciarSesionGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            console.log(user);

            var nombre = user.displayName;
            var correo = user.email;

            var usuarioRef = db.collection("usuarios").doc(user.uid);

            usuarioRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Usuario ya registrado:", doc.data());
                    mostrarMensajeAdvertencia("Ya estás registrado. No es necesario volver a registrarte.");
                } else {
                    usuarioRef.set({
                        nombre: user.displayName,
                        correo: user.email,
                    }).then(() => {
                        console.log("Usuario registrado con éxito");
                        mostrarMensajeExito("Tu registro se ha completado correctamente");
                        
                        // Redirige al usuario a "inicio.html" después del registro exitoso
                        window.location.href = "inicio.html";
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
            console.error(error);
            mostrarMensajeError("Hubo un problema al autenticar con Google. Por favor, inténtalo de nuevo.");
        });
}

function mostrarMensajeExito(mensaje) {
    Swal.fire({
        title: 'Registro exitoso',
        text: mensaje,
        icon: 'success',
        timer: 2000,
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

window.onload = function () {
    handleRedirectResult();
};
