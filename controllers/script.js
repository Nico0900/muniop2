const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

// Estado inicial según el tamaño de pantalla
function setInitialMenuState() {
    if (window.innerWidth > 1024) { // PC → siempre abierto
        sidebar.classList.add('menu-toggle');
        main.classList.add('menu-toggle');
        menu.classList.add('rotated');
    } else { // Tablet/Móvil → cerrado por defecto
        sidebar.classList.remove('menu-toggle');
        main.classList.remove('menu-toggle');
        menu.classList.remove('rotated');
    }
}

// Al cargar
setInitialMenuState();

// Al cambiar tamaño de pantalla
window.addEventListener('resize', setInitialMenuState);

// Toggle con el botón
menu.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('menu-toggle');
    main.classList.toggle('menu-toggle');
    menu.classList.toggle('rotated');
});

// Cerrar sidebar al hacer click fuera (solo móviles/tablets)
document.addEventListener("click", (e) => {
    if (
        window.innerWidth <= 1024 && // ✅ solo en móvil/tablet
        sidebar.classList.contains("menu-toggle") &&
        !sidebar.contains(e.target) &&
        !menu.contains(e.target)
    ) {
        sidebar.classList.remove("menu-toggle");
        main.classList.remove("menu-toggle");
        menu.classList.remove("rotated");
    }
}, true);

// Cerrar sidebar al hacer click en links (excepto el dropdown "Municipio")
sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        const isDropdownBtn = link.classList.contains("dropbtn");

        if (!isDropdownBtn && window.innerWidth <= 1024) { 
            sidebar.classList.remove("menu-toggle");
            main.classList.remove("menu-toggle");
            menu.classList.remove("rotated");
        }
    });
});
