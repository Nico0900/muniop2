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
    // Si está abierto y el click no está en el sidebar ni en el botón
    if (
        sidebar.classList.contains("menu-toggle") &&
        !sidebar.contains(e.target) &&
        !menu.contains(e.target)
    ) {
        sidebar.classList.remove("menu-toggle");
        main.classList.remove("menu-toggle");
        menu.classList.remove("rotated");
    }
}, true); // true para que capte bien antes de otros handlers

// Cerrar sidebar al hacer click en cualquier link del sidebar
sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        sidebar.classList.remove("menu-toggle");
        main.classList.remove("menu-toggle");
        menu.classList.remove("rotated");
    });
});
