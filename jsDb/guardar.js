function guardar() {
    var nombre = document.getElementById('name').value;
    var apellido = document.getElementById('last').value;
    var email = document.getElementById('email').value;
    var usName = document.getElementById('usName').value;
    var fechaNac = document.getElementById('fechaNac').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Validación de campos obligatorios
    if (!nombre || !apellido || !email || !usName || !fechaNac || !password || !confirmPassword) {
        Swal.fire("Error", "Todos los campos son obligatorios", "error");
        return;
    }

    // Validaciones adicionales
    if (password.length < 8) {
        Swal.fire("Error", "La contraseña debe tener al menos 8 caracteres", "error");
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire("Error", "Las contraseñas no coinciden", "error");
        return;
    }

    var today = new Date();
    var birthDate = new Date(fechaNac);
    var age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
        Swal.fire("Error", "Debes tener al menos 18 años para registrarte", "error");
        return;
    }

    // Registra usuario en Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Guarda datos adicionales en Firestore
            firebase.firestore().collection("usuarios").doc(userCredential.user.uid).set({
                nombre: nombre,
                apellido: apellido,
                email: email,
                contraseña: password,
                nombre_usuario: usName,
                fechaNac: fechaNac
            })
                .then(() => {
                    // Registro exitoso
                    Swal.fire("Éxito", "Usuario registrado correctamente", "success")
                        .then(() => {
                            // Redirecciona al usuario a iniciar sesión
                            window.location.href = "iniciar_Sesion#inicio-sesion";
                        });
                })
                .catch((error) => {
                    Swal.fire("Error", "Error al guardar datos adicionales: " + error.message, "error");
                });
        })
        .catch((error) => {
            Swal.fire("Error", "Error en el registro: " + error.message, "error");
        });
}

function iniciarSesionGoogle() {
    // Muestra SweetAlert indicando que se está iniciando sesión con Google
    Swal.fire({
        title: "Iniciando sesión",
        text: "Espere un momento...",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false
    });

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Cierra el SweetAlert después de iniciar sesión
            Swal.close();

            // Verifica si el usuario ya está registrado
            var isNewUser = result.additionalUserInfo.isNewUser;

            if (isNewUser) {
                // Si es un nuevo usuario, muestra SweetAlert de registro exitoso
                Swal.fire("Éxito", "Registro con Google exitoso!", "success");
            } else {
                // Si el usuario ya existe, muestra SweetAlert de cuenta ya registrada
                Swal.fire("Advertencia", "Esta cuenta ya está registrada", "warning");
            }
        })
        .catch((error) => {
            // Cierra el SweetAlert en caso de error
            Swal.close();

            // Muestra SweetAlert en caso de error
            Swal.fire("Error", "Error en el registro con Google: " + error.message, "error");
        });
}
