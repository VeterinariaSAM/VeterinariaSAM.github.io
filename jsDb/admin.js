function validarAdministrador() {
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
          // Agregar aquí cualquier animación o efecto deseado
          // Por ejemplo, cambiar el fondo del formulario
          document.body.style.backgroundColor = "#e6ffe6";
          window.location.href = "Empleado.html";
      });
      return false; // Evitar que el formulario se envíe
  } else {
      // Credenciales de administrador incorrectas, continuar con la autenticación de Firebase
      return true; // Permitir que el formulario se envíe y que la función inicie sesión en Firebase
  }
}


function cerrarSesion() {
  // Limpia la información del usuario en el Local Storage
  localStorage.removeItem("userData");

  // Redirecciona a la página de inicio de sesión
  window.location.href = "iniciar_Sesion.html";
}