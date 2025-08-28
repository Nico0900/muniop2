const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

// Estado inicial según el tamaño de pantalla
function setInitialMenuState() {
    if (window.innerWidth > 500) {
        sidebar.classList.add('menu-toggle');
        main.classList.add('menu-toggle');
        menu.classList.add('rotated'); // ya abierto → icono rotado
    } else {
        sidebar.classList.remove('menu-toggle');
        main.classList.remove('menu-toggle');
        menu.classList.remove('rotated'); // cerrado → sin rotación
    }
}

// Al cargar
setInitialMenuState();

// Al cambiar tamaño de pantalla
window.addEventListener('resize', setInitialMenuState);

// Toggle con el botón
menu.addEventListener('click', (e) => {
    e.stopPropagation(); // evita que dispare el listener global
    sidebar.classList.toggle('menu-toggle');
    main.classList.toggle('menu-toggle');
    menu.classList.toggle('rotated'); // rotación
});

// Cerrar sidebar al hacer click fuera
document.addEventListener("click", (e) => {
    if (
        sidebar.classList.contains("menu-toggle") &&
        !sidebar.contains(e.target) &&
        !menu.contains(e.target)
    ) {
        sidebar.classList.remove("menu-toggle");
        main.classList.remove("menu-toggle");
        menu.classList.remove("rotated");
    }
}, true);

// Cerrar sidebar al hacer click en cualquier link del sidebar,
// excepto el botón principal del dropdown "Municipio"
sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
        const isDropdownBtn = link.classList.contains("dropbtn"); // el botón principal

        if (!isDropdownBtn) {
            // Cierra el sidebar normalmente
            sidebar.classList.remove("menu-toggle");
            main.classList.remove("menu-toggle");
            menu.classList.remove("rotated");
        } 
        // Si es el botón "Municipio" (dropbtn), no hace nada, solo abre/cierra su lista
    });
});
