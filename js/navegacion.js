// navigation.js

document.addEventListener('DOMContentLoaded', function () {
    const navOptions = document.querySelector('.sidebar ul');
    const userEmail = localStorage.getItem('email');

    if (userEmail === 'adminsam@gmail.com') {
        navOptions.innerHTML = `
            <li><a href="index.html" style="font-size: 1.5vw;">Inicio</a></li>
            <li style="margin-top: 10%;"><a href="AgregarProducto.html" style= "font-size: 1.5vw;">Agregar productos</a></li>
            <li style="margin-top: 10%;"><a href="Empleado.html" style= "font-size: 1.5vw;">Personal</a></li>
            <li style="margin-top: 10%;"><a href="horarios.html" style= "font-size: 1.5vw;">Horarios</a></li>
            <li class="active" style="margin-top: 10%;"><a href="catalogoProductos.html" style= "font-size: 1.5vw;">Productos</a></li>
            <li class="active" style="margin-top: 10%;"><a href="contacto.html" style= "font-size: 1.5vw;">Contacto</a></li>
            <li class="active" style="margin-top: 10%;"><a href="citas.html" style= "font-size: 1.5vw;">Agendar Cita</a></li>
            <li class="active" style="margin-top: 10%;"><a href="somos.html" style= "font-size: 1.5vw;">¿Quienes Somos?</a></li>
            <li class="active" style="margin-top: 10%;"><a href="Dudas.html" style= "font-size: 1.5vw;">Preguntas frecuentes</a></li>
            <!-- Otras opciones de navegación para usuarios con el correo específico -->
          `;
    } else {
        navOptions.innerHTML = `
            <li><a href="index.html"qa>Inicio</a></li>
            <li class="active"><a href="catalogoProductos.html">Productos</a></li>
            <li class="active"><a href="contacto.html">Contacto</a></li>
            <li class="active"><a href="citas.html">Agendar Cita</a></li>
            <li class="active"><a href="somos.html">¿Quienes Somos?</a></li>
            <li class="active"><a href="Dudas.html">Preguntas frecuentes</a></li>
            <li class="active"><a href="ver_Citas.html">Ver citas</a></li>

            <!-- Otras opciones de navegación estándar -->
        `;
    }
});

