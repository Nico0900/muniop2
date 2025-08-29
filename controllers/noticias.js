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

// Función para abrir modal individual de imagen
function abrirImagenModal(src) {
    imagenGrande.src = src;
    modalImagen.style.display = "block";
}

// Cerrar modal individual de imagen
closeImagen.onclick = () => modalImagen.style.display = "none";
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

                // Galería Masonry
                modalGaleria.innerHTML = "";
                noticia.galeria.forEach(imgSrc => {
                    const img = document.createElement("img");
                    img.src = imgSrc;
                    img.alt = "Imagen noticia";
                    img.onclick = () => abrirImagenModal(imgSrc);
                    modalGaleria.appendChild(img);
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
    });

// Cerrar modal noticia
spanClose.onclick = () => modal.style.display = "none";
