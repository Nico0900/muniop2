const noticiasContainer = document.getElementById("noticias-container");

// Modal elementos
const modal = document.getElementById("modal-noticia");
const modalTitulo = document.getElementById("modal-titulo");
const modalTipo = document.getElementById("modal-tipo");
const modalImagen = document.getElementById("modal-imagen");
const modalContenido = document.getElementById("modal-contenido");
const modalPerfil = document.getElementById("modal-perfil");
const spanClose = document.querySelector(".close");

fetch("../json/noticias.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(noticia => {
            const card = document.createElement("div");
            card.classList.add("card", "swiper-slide");
            card.innerHTML = `
        <div class="card-image">
            <img src="${noticia.imagen}" alt="${noticia.titulo}" />
            <div class="card-tag">${noticia.tipo}</div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${noticia.titulo}</h3>
            <p class="card-text">${noticia.contenido.substring(0, 100)}...</p>
            <div class="card-footer">
                <div class="card-profile">
                    <img src="${noticia.perfil}" alt="Perfil Noticia" />
                </div>
                <button class="card-button">Ver más</button>
            </div>
        </div>
      `;
            noticiasContainer.appendChild(card);

            // Evento para abrir modal
            card.querySelector(".card-button").addEventListener("click", () => {
                modalTitulo.textContent = noticia.titulo;
                modalTipo.textContent = noticia.tipo;
                modalImagen.src = noticia.imagen;
                modalContenido.textContent = noticia.contenido;
                modalPerfil.src = noticia.perfil;
                modal.style.display = "block";
            });
        });

        // Inicializar Swiper
        const swiper = new Swiper(".swiper", {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                860: { slidesPerView: 2 },
                1400: { slidesPerView: 3 },
                1920: { slidesPerView: 5 }
            },
        });
    });

// Cerrar modal
spanClose.onclick = () => modal.style.display = "none";
window.onclick = event => {
    if (event.target == modal) modal.style.display = "none";
};
