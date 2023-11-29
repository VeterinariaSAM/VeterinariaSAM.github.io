const headerDiv = document.querySelector('.one-header');
// Contenido HTML que deseas insertar
const contenidoHTML = `
<nav class="sidebar">
<header>
    <div class="scroll-header">
        <div class="header-title">
            <button id="toggleSidebar" class="desktop toggleSidebar">☰</button>
            <div class="header-logo">
                <a href="index.html">
                <img src="Imageneshtml/LogoSam2 (2).png" alt="Logo">
                </a>
            </div>
        </div>
        <div class="header-button desktop ">
            <a href="carrito.html" class="header-button-container">
                <img src="Imageneshtml/shopping-cart.svg" alt="Carrito" >
                <span class="badge" style="display:none;">0</span>
            </a>
        </div>
        <div class="menu-icon" onclick="toggleMenu()">
            <a href="iniciar_Sesion.html" class="header-button desktop">
                <span class="nombreDeUsuario"></span>
                <img src="Imageneshtml/usuario.png" alt="Usuario">
            </a>
        </div>
    </div>
   
    <div class="navbar mobile">
        <button id="toggleSidebarMobile" class="toggleSidebar">☰</button>
        <div class="header-button">
            <a href="carrito.html" class="header-button-container">
                <img src="Imageneshtml/shopping-cart.svg" alt="Carrito" >
                <span class="badge" style="display:none;">0</span>
            </a>
        </div>

        <div class="navbar" id="navbar">
            <div class="navbar-left">
                <button type="button" onclick="terminaSesión()">Cerrar Sesión</button>
                <fieldset>
                    <legend>Email</legend>
                    <output id="email"><progress max="100">Cargando…</progress></output>
                </fieldset>
                <br>
                <fieldset>
                    <legend>Nombre</legend>
                    <output id="nombre"></output>
                </fieldset>
                <br>
            </div>
            <figure><img src="" id="avatar" alt="avatar" class="navbar-profile-image"></figure>
        </div>
        
    </div>

</header>


<ul>
    <li class="active nav-option-general"><a href="catalogoProductos.html">Productos</a></li>
    <li class="active nav-option-general"><a href="contacto.html">Contacto</a></li>
    <li class="active nav-option-general"><a href="citas.html">Agendar Cita</a></li>
    <li class="active nav-option-general"><a href="somos.html">¿Quienes Somos?</a></li>
    <li class="active nav-option-general"><a href="Dudas.html">Preguntas frecuentes</a></li>
    <li class="active nav-option-general"><a href="ver_Citas.html">Ver citas</a></li>

</ul>
</nav>
`;

// Usar insertAdjacentHTML() para agregar el contenido HTML dentro del div "catalog"
headerDiv.insertAdjacentHTML('afterbegin', contenidoHTML);



//***** TEAM ******/

    // Este we se encarga de que el header se minimice al bajar o navegar en la pagina
    window.addEventListener('scroll', function () {
        var header = document.querySelector('.scroll-header');
        if (window.scrollY > 100) {
            header.classList.add('small');
        } else {
            header.classList.remove('small');
        }
    });

    // este es pa cuando se haga clic fuera del banner, este se cierre auto
    document.addEventListener('click', function (event) {
        var sidebar = document.querySelector('.sidebar');
        var targetElement = event.target;

        if (!sidebar.contains(targetElement) && targetElement.id !== 'toggleSidebar') {
            sidebar.classList.remove('open');
        }
    });











(() => {

    // Agregar el evento a todos los botones con la clase "toggleSidebar"
    const toggleButtons = document.querySelectorAll('.toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    });

    // Cargar y Mostrar Usuario
    function documentReady() {
        const misElementos = document.getElementsByClassName('nombreDeUsuario');
        for (let i = 0; i < misElementos.length; i++) {
            misElementos[i].textContent = localStorage.getItem("nombre");
        }


        
        let carrito = localStorage.getItem('shoppingCart');
        let carritoObjeto = JSON.parse(carrito);
        let totalItems = 0;
    
        if (carritoObjeto !== null) {
            carritoObjeto.forEach((product) => {
                totalItems += 1;
            });
            if(totalItems != 0){
                const misBadges = document.getElementsByClassName('badge');
                for (let i = 0; i < misBadges.length; i++) {
                    misBadges[i].textContent = totalItems;
                    misBadges[i].style.display = 'block';
                }
            } else {
                const misBadges = document.getElementsByClassName('badge');
                for (let i = 0; i < misBadges.length; i++) {
                    misBadges[i].style.display = 'none';
                }
            }
        } else {
            const misBadges = document.getElementsByClassName('badge');
            for (let i = 0; i < misBadges.length; i++) {
                misBadges[i].style.display = 'none';
            }
        }


    }
    document.addEventListener('DOMContentLoaded', documentReady);
})();


    