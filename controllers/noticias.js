const noticiasContainer = document.getElementById("noticias-container");

const modal = document.getElementById("modal-noticia");
const modalTitulo = document.getElementById("modal-titulo");
const modalTipo = document.getElementById("modal-tipo");
const modalContenido = document.getElementById("modal-contenido");
const modalPerfil = document.getElementById("modal-perfil");
const modalGaleria = document.getElementById("modal-galeria");
const spanClose = document.querySelector("#modal-noticia .close");

// Modal individual para imagen grande
const modalImagen = document.getElementById("modal-imagen");
const imagenGrande = document.getElementById("imagen-grande");
const closeImagen = document.getElementById("close-imagen");

// Variables para navegación de imágenes
let imagenesActuales = [];
let indiceImagenActual = 0;

// Función para abrir modal individual de imagen con navegación
function abrirImagenModal(src, todasLasImagenes = []) {
    imagenesActuales = todasLasImagenes.length > 0 ? todasLasImagenes : [src];
    indiceImagenActual = imagenesActuales.findIndex(img => img === src);

    mostrarImagenEnModal();
    modalImagen.style.display = "flex";
}

// Función para mostrar imagen actual en el modal
function mostrarImagenEnModal() {
    imagenGrande.src = imagenesActuales[indiceImagenActual];

    // Actualizar contador
    const contador = document.getElementById("contador-imagenes");
    if (contador) {
        contador.textContent = `${indiceImagenActual + 1} / ${imagenesActuales.length}`;
    }

    // Habilitar/deshabilitar botones de navegación
    const btnPrev = document.getElementById("btn-prev-imagen");
    const btnNext = document.getElementById("btn-next-imagen");

    if (btnPrev) btnPrev.disabled = indiceImagenActual === 0;
    if (btnNext) btnNext.disabled = indiceImagenActual === imagenesActuales.length - 1;
}

// Navegación de imágenes
function imagenAnterior() {
    if (indiceImagenActual > 0) {
        indiceImagenActual--;
        mostrarImagenEnModal();
    }
}

function imagenSiguiente() {
    if (indiceImagenActual < imagenesActuales.length - 1) {
        indiceImagenActual++;
        mostrarImagenEnModal();
    }
}

// Event listeners para navegación con teclado
document.addEventListener('keydown', (e) => {
    if (modalImagen.style.display === 'flex') {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                imagenAnterior();
                break;
            case 'ArrowRight':
                e.preventDefault();
                imagenSiguiente();
                break;
            case 'Escape':
                e.preventDefault();
                modalImagen.style.display = "none";
                break;
        }
    } else if (modal.style.display === 'block' && e.key === 'Escape') {
        e.preventDefault();
        modal.style.display = "none";
    }
});

// Cerrar modal individual de imagen
closeImagen.onclick = () => modalImagen.style.display = "none";

// Event listeners mejorados para cerrar modales
window.onclick = e => {
    if (e.target == modalImagen) modalImagen.style.display = "none";
    if (e.target == modal) modal.style.display = "none";
};

fetch("../json/noticias.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(noticia => {
            const card = document.createElement("div");
            card.classList.add("card", "swiper-slide");

            const preview = noticia.contenido[0].substring(0, 100) + "...";

            card.innerHTML = `
                <div class="card-image">
                    <img src="${noticia.galeria[0]}" alt="${noticia.titulo}" />
                    <div class="card-tag">${noticia.tipo}</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${noticia.titulo}</h3>
                    <p class="card-text">${preview}</p>
                    <div class="card-footer">
                        <div class="card-profile">
                            <img src="${noticia.perfil}" alt="Perfil Noticia" />
                        </div>
                        <button class="card-button" style="display:none;">Ver más</button>
                    </div>
                </div>
            `;
            noticiasContainer.appendChild(card);

            // Listener para abrir modal noticia
            card.addEventListener("click", () => {
                modalTitulo.textContent = noticia.titulo;
                modalTipo.textContent = noticia.tipo;
                modalPerfil.src = noticia.perfil;

                // Contenido
                modalContenido.innerHTML = "";
                noticia.contenido.forEach(p => {
                    const parrafo = document.createElement("p");
                    parrafo.textContent = p;
                    modalContenido.appendChild(parrafo);
                });

                // Galería Grid mejorada
                modalGaleria.innerHTML = "";
                modalGaleria.className = "modal-galeria-grid";

                noticia.galeria.forEach((imgSrc, index) => {
                    const imgContainer = document.createElement("div");
                    imgContainer.className = "imagen-container";

                    const img = document.createElement("img");
                    img.src = imgSrc;
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

                    imgContainer.onclick = () => abrirImagenModal(imgSrc, noticia.galeria);

                    modalGaleria.appendChild(imgContainer);
                });

                modal.style.display = "block";
            });
        });

        // Swiper principal de tarjetas
        new Swiper(".wrapper.swiper", {
            spaceBetween: 20,
            loop: true,
            autoplay: { delay: 7000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: {
                0: { slidesPerView: 1 },
                860: { slidesPerView: 2 },
                1400: { slidesPerView: 3 },
                1920: { slidesPerView: 4 },
                2100: { slidesPerView: 5 }
            }
        });
    })
    .catch(error => {
        console.error('Error al cargar las noticias:', error);
        noticiasContainer.innerHTML = '<p>Error al cargar las noticias. Inténtalo más tarde.</p>';
    });

// Cerrar modal noticia
spanClose.onclick = () => modal.style.display = "none";