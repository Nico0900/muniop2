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
menu.addEventListener('click', () => {
    sidebar.classList.toggle('menu-toggle');
    main.classList.toggle('menu-toggle');
    menu.classList.toggle('rotated'); // rotación
});
