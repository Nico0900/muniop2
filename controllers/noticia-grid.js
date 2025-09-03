let noticiasData = [];

// Variables para navegación de imágenes
let imagenesActuales = [];
let indiceImagenActual = 0;
let noticiaActual = null;

// Cargar noticias desde JSON
fetch("json/noticias.json")
    .then(response => response.json())
    .then(data => {
        noticiasData = data;
        renderNoticiasGrid(data);
    })
    .catch(error => {
        console.error("Error cargando noticias:", error);
        const grid = document.querySelector(".noticias-grid");
        if (grid) {
            grid.innerHTML = '<p class="error-message">Error al cargar las noticias. Inténtalo más tarde.</p>';
        }
    });

function renderNoticiasGrid(noticias) {
    const grid = document.querySelector(".noticias-grid");
    if (!grid) return;
    grid.innerHTML = ""; // limpiar contenido previo

    noticias.forEach(noticia => {
        const card = document.createElement("div");
        card.classList.add("noticia-card");
        card.onclick = () => abrirModalNoticia(noticia.id);

        // tomo la primera imagen de la galería
        const portada = noticia.galeria && noticia.galeria.length > 0
            ? noticia.galeria[0]
            : "src/images/png/logomun.png"; // fallback

        card.innerHTML = `
            <div class="card-image-container">
                <img src="${portada}" alt="${noticia.titulo}" loading="lazy">
                <div class="card-overlay">
                    <div class="card-tag">${noticia.tipo || 'Noticia'}</div>
                    <div class="expand-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15,3 21,3 21,9"></polyline>
                            <polyline points="9,21 3,21 3,15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.contenido[0]?.substring(0, 80) ?? ''}...</p>
                <div class="card-meta">
                    <span class="image-count">${noticia.galeria ? noticia.galeria.length : 0} imágenes</span>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

function abrirModalNoticia(id) {
    const noticia = noticiasData.find(n => n.id === id);
    if (!noticia) return;

    noticiaActual = noticia;
    const modal = document.getElementById("modal-noticias-grid");
    const titulo = document.getElementById("modal-grid-titulo");
    const tipo = document.getElementById("modal-grid-tipo");
    const contenido = document.getElementById("modal-grid-contenido");
    const galeria = document.getElementById("modal-grid-galeria");

    titulo.innerText = noticia.titulo;

    // Agregar tipo si existe
    if (tipo && noticia.tipo) {
        tipo.innerText = noticia.tipo;
        tipo.style.display = "inline-block";
    } else if (tipo) {
        tipo.style.display = "none";
    }

    contenido.innerHTML = noticia.contenido
        .map(p => `<p>${p}</p>`).join("");

    // Crear galería grid moderna
    galeria.innerHTML = "";
    galeria.className = "modal-galeria-grid";

    if (noticia.galeria && noticia.galeria.length > 0) {
        noticia.galeria.forEach((src, index) => {
            const imgContainer = document.createElement("div");
            imgContainer.className = "imagen-container";

            const img = document.createElement("img");
            img.src = src;
            img.alt = `Imagen ${index + 1} de ${noticia.titulo}`;
            img.loading = "lazy";

            // Overlay con icono de expansión
            const overlay = document.createElement("div");
            overlay.className = "imagen-overlay";
            overlay.innerHTML = `
                <div class="expand-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15,3 21,3 21,9"></polyline>
                        <polyline points="9,21 3,21 3,15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                </div>
            `;

            imgContainer.appendChild(img);
            imgContainer.appendChild(overlay);

            // al hacer clic en la imagen, abrir modal-imagen2 con navegación
            imgContainer.addEventListener("click", (e) => {
                e.stopPropagation(); // evita que cierre el modal-noticias-grid
                abrirImagenGrande(src, noticia.galeria);
            });

            galeria.appendChild(imgContainer);
        });
    } else {
        galeria.innerHTML = '<p class="no-images">No hay imágenes disponibles</p>';
    }

    modal.style.display = "flex";
}

function cerrarModalNoticia() {
    const modal = document.getElementById("modal-noticias-grid");
    modal.style.display = "none";
    noticiaActual = null;
}

// ================================
// Modal Imagen Grande (modal-imagen2) - MEJORADO
// ================================
const modalImagen2 = document.getElementById("modal-imagen2");
const imagenGrande2 = document.getElementById("imagen-grande2");
const cerrarImagen2 = modalImagen2.querySelector(".close");

function abrirImagenGrande(src, todasLasImagenes = []) {
    imagenesActuales = todasLasImagenes.length > 0 ? todasLasImagenes : [src];
    indiceImagenActual = imagenesActuales.findIndex(img => img === src);

    mostrarImagenEnModal2();
    modalImagen2.style.display = "flex";
}

// Función para mostrar imagen actual en el modal
function mostrarImagenEnModal2() {
    imagenGrande2.src = imagenesActuales[indiceImagenActual];

    // Actualizar contador
    const contador = document.getElementById("contador-imagenes2");
    if (contador) {
        contador.textContent = `${indiceImagenActual + 1} / ${imagenesActuales.length}`;
    }

    // Habilitar/deshabilitar botones de navegación
    const btnPrev = document.getElementById("btn-prev-imagen2");
    const btnNext = document.getElementById("btn-next-imagen2");
    const flechaIzq = document.getElementById("flecha-izq2");
    const flechaDer = document.getElementById("flecha-der2");

    const esPrimera = indiceImagenActual === 0;
    const esUltima = indiceImagenActual === imagenesActuales.length - 1;
    const hayUnaImagenSola = imagenesActuales.length === 1;

    if (btnPrev) btnPrev.disabled = esPrimera || hayUnaImagenSola;
    if (btnNext) btnNext.disabled = esUltima || hayUnaImagenSola;
    if (flechaIzq) flechaIzq.disabled = esPrimera || hayUnaImagenSola;
    if (flechaDer) flechaDer.disabled = esUltima || hayUnaImagenSola;

    // Ocultar controles si solo hay una imagen
    const controles = modalImagen2.querySelectorAll('.btn-nav-imagen, .flecha-nav');
    controles.forEach(control => {
        control.style.display = hayUnaImagenSola ? 'none' : 'flex';
    });
}

// Navegación de imágenes
function imagenAnterior2() {
    if (indiceImagenActual > 0) {
        indiceImagenActual--;
        mostrarImagenEnModal2();
    }
}

function imagenSiguiente2() {
    if (indiceImagenActual < imagenesActuales.length - 1) {
        indiceImagenActual++;
        mostrarImagenEnModal2();
    }
}

// Event listeners para navegación con teclado
document.addEventListener('keydown', (e) => {
    // Si el modal de imagen está abierto
    if (modalImagen2.style.display === 'flex') {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                imagenAnterior2();
                break;
            case 'ArrowRight':
                e.preventDefault();
                imagenSiguiente2();
                break;
            case 'Escape':
                e.preventDefault();
                cerrarModalImagen2();
                break;
        }
    }
    // Si el modal de noticia está abierto
    else if (document.getElementById("modal-noticias-grid").style.display === 'flex' && e.key === 'Escape') {
        e.preventDefault();
        cerrarModalNoticia();
    }
});

function cerrarModalImagen2() {
    modalImagen2.style.display = "none";
    imagenGrande2.src = "";
    imagenesActuales = [];
    indiceImagenActual = 0;
}

// Cerrar con el botón ✖
if (cerrarImagen2) {
    cerrarImagen2.addEventListener("click", cerrarModalImagen2);
}

// Cerrar al hacer clic fuera de la imagen
modalImagen2.addEventListener("click", (e) => {
    if (e.target === modalImagen2) {
        cerrarModalImagen2();
    }
});

// Event listeners adicionales para los nuevos botones de navegación
document.addEventListener('DOMContentLoaded', () => {
    // Botones de navegación superiores
    const btnPrev2 = document.getElementById("btn-prev-imagen2");
    const btnNext2 = document.getElementById("btn-next-imagen2");

    if (btnPrev2) btnPrev2.addEventListener("click", imagenAnterior2);
    if (btnNext2) btnNext2.addEventListener("click", imagenSiguiente2);

    // Flechas laterales
    const flechaIzq2 = document.getElementById("flecha-izq2");
    const flechaDer2 = document.getElementById("flecha-der2");

    if (flechaIzq2) flechaIzq2.addEventListener("click", imagenAnterior2);
    if (flechaDer2) flechaDer2.addEventListener("click", imagenSiguiente2);

    // Cerrar modal de noticia con Escape o clic fuera
    const modalNoticias = document.getElementById("modal-noticias-grid");
    if (modalNoticias) {
        modalNoticias.addEventListener("click", (e) => {
            if (e.target === modalNoticias) {
                cerrarModalNoticia();
            }
        });
    }
});