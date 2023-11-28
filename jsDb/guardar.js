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

    // Validar longitud de contraseña
    if (contraseña.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
    }

    // Validar contraseñas coincidentes
    if (contraseña !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Crear el usuario en Firebase Authentication
    auth.createUserWithEmailAndPassword(correo, contraseña)
        .then((userCredential) => {
            // Obtener el ID del usuario registrado
            var userId = userCredential.user.uid;

            // Guardar información en Firestore
            firestore.collection("usuarios").doc(userId).set({
                nombre: nombre,
                apellido: apellido,
                nombre_usuario: nombre_usuario,
                correo: correo,
                fecha_nac: fecha_nac,
            })
            .then(() => {
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
                console.error("Error al crear usuario:", error.code, error.message);
                // Mostrar un mensaje de error genérico con SweetAlert
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al registrar tus datos en Firestore. Por favor, inténtalo de nuevo.',
                    icon: 'error',
                });
            });
        })
        .catch((error) => {
            // Mostrar un mensaje de error genérico con SweetAlert
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al registrar tus datos en Authentication. Por favor, inténtalo de nuevo.',
                icon: 'error',
            });
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

