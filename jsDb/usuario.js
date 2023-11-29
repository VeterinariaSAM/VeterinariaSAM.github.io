// jsDb/usuario.js

firebase.auth().onAuthStateChanged((user) => {
    const userStatusElement = document.getElementById("userStatus");
    const nombreDeUsuarioElement = document.getElementById("nombreDeUsuario");

    if (user) {
        // Usuario autenticado
        userStatusElement.innerText = "Bienvenido, ";
        nombreDeUsuarioElement.innerText = user.displayName || user.email || "Usuario";

        // Aquí puedes agregar lógica adicional si es necesario
    } else {
        // Usuario no autenticado
        userStatusElement.innerText = "Iniciar Sesión";
        nombreDeUsuarioElement.innerText = "";

        // Puedes redirigir a la página de inicio de sesión si lo deseas
        // window.location.href = "iniciar_Sesion.html";
    }
});
