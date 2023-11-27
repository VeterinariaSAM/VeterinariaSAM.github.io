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

    // Validar contraseñas coincidentes
    if (contraseña !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Continuar con el registro si todas las validaciones son exitosas
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

function iniciarSesion() {
    var email = document.getElementById("emailInicioSesion").value;
    var password = document.getElementById("passwordInicioSesion").value;

    // Realizar la autenticación con Firebase
    auth.signInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            // Verificar el rol del usuario
            var user = userCredential.user;
            checkUserRole(user.uid);
        })
        .catch(function (error) {
            // Manejar errores de autenticación
            console.error("Error al iniciar sesión:", error);
        });
}

function checkUserRole(userId) {
    // Obtener el documento del usuario desde Firestore
    db.collection("usuarios").doc(userId).get()
        .then(function (doc) {
            if (doc.exists) {
                var userRole = doc.data().rol;

                // Verificar si el usuario es un administrador
                if (userRole === "administrador") {
                    // Redirigir al panel de administrador
                    window.location.href = "Empleado.html";
                } else {
                    // El usuario no tiene permisos de administrador
                    console.log("No tienes permisos de administrador.");
                }
            } else {
                // El documento del usuario no existe en Firestore
                console.log("Usuario no encontrado en la base de datos.");
            }
        })
        .catch(function (error) {
            console.error("Error al obtener el documento del usuario:", error);
        });
}

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
        checkUserRole(user.uid);
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

