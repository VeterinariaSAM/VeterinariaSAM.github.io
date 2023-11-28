function validarAdministrador() {
    event.preventDefault();  // Evitar la redirección automática
    var correoAdmin = document.getElementById("correoInicioSesion").value;
    var passwordAdmin = document.getElementById("passwordInicioSesion").value;

    // Verificar las credenciales del administrador
    if (
        correoAdmin === "SAMadmin_2023@gmail.com" &&
        passwordAdmin === "IC-43M0401"
    ) {
        // Credenciales de administrador válidas, redirigir al administrador a Empleado.html
        Swal.fire({
            icon: "success",
            title: "¡Inicio de sesión exitoso!",
            showConfirmButton: false,
            timer: 1500, // Duración de la alerta en milisegundos
        }).then(() => {
            document.body.style.backgroundColor = "#e6ffe6";
            window.location.href = "Empleado.html";

        });
        return false; // Evitar que el formulario se envíe
    } else {
        // Credenciales de administrador incorrectas, mostrar mensaje de error
        Swal.fire({
            icon: "error",
            title: "Error de inicio de sesión",
            text: "Las credenciales del administrador son incorrectas.",
            showConfirmButton: false,
            timer: 2000, // Duración de la alerta en milisegundos
        }).catch(err => console.error(err));

        // No redirigir, permitir al usuario intentar de nuevo en la misma página
        return false; // Evitar que el formulario se envíe
    }

}


function iniciarSesion() {
    // Obtener los valores de los campos del formulario
    var correoInicioSesion = document.getElementById("correoInicioSesion").value;
    var passwordInicioSesion = document.getElementById("passwordInicioSesion").value;

    // Realizar validaciones
    if (!correoInicioSesion || !passwordInicioSesion) {
        alert("Todos los campos son obligatorios");
        return;
    }

    // Iniciar sesión en Firebase Authentication
    auth.signInWithEmailAndPassword(correoInicioSesion, passwordInicioSesion)
        .then(async (userCredential) => {
            // Obtener el ID del usuario autenticado
            var userId = userCredential.user.uid;

            // Obtener información del usuario desde Firestore
            var usuarioFirestore = await firestore.collection("usuarios").doc(userId).get()
                .then((doc) => {
                    if (doc.exists) {
                        // Usuario encontrado en Firestore
                        return doc.data();
                    } else {
                        // Usuario no encontrado en Firestore
                        console.error("Error: Usuario no encontrado en Firestore");
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un problema al obtener tus datos desde Firestore. Por favor, inténtalo de nuevo.',
                            icon: 'error',
                        });
                        return null;
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener usuario desde Firestore:", error.code, error.message);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al obtener tus datos desde Firestore. Por favor, inténtalo de nuevo.',
                        icon: 'error',
                    });
                    return null;
                });

            if (usuarioFirestore) {
                // Usuario autenticado y encontrado en Firestore
                // Puedes utilizar la información de 'usuarioFirestore' y 'userCredential.user' según tus necesidades
                
                // Mostrar un mensaje de éxito con SweetAlert
                Swal.fire({
                    title: 'Inicio de sesión exitoso',
                    text: '¡Bienvenido, ' + usuarioFirestore.nombre + '!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    // Redirigir al usuario a la página deseada
                    window.location.href = "Empleado.html";
                });
            }
        })
        .catch((error) => {
            // Mostrar un mensaje de error con SweetAlert
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.',
                icon: 'error',
            });
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

            // Mostrar animación de inicio de sesión correcto
            mostrarAnimacionInicioSesionCorrecto();

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

function mostrarAnimacionInicioSesionCorrecto() {
    // Agrega código para mostrar la animación de inicio de sesión correcto
    var animacionElement = document.getElementById("animacionInicioSesionCorrecto");
    animacionElement.style.display = "block";

    // Oculta la animación después de un tiempo (por ejemplo, 3 segundos)
    setTimeout(function () {
        animacionElement.style.display = "none";
    }, 3000); // 3000 milisegundos = 3 segundos
}



function cerrarSesion() {
    // Limpia la información del usuario en el Local Storage
    localStorage.removeItem("userData");

    // Redirecciona a la página de inicio de sesión
    window.location.href = "iniciar_Sesion.html";
}