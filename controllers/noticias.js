const noticiasContainer = document.getElementById("noticias-container");

const modal = document.getElementById("modal-noticia");
const modalTitulo = document.getElementById("modal-titulo");
const modalTipo = document.getElementById("modal-tipo");
const modalContenido = document.getElementById("modal-contenido");
const modalPerfil = document.getElementById("modal-perfil");
const modalGaleria = document.getElementById("modal-galeria");
const spanClose = document.querySelector(".close");

let modalSwiper;

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

            // Listener para toda la card
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

                // Galería
                modalGaleria.innerHTML = ""; // Limpiar
                if (noticia.galeria.length === 1) {
                    const img = document.createElement("img");
                    img.src = noticia.galeria[0];
                    img.alt = "Imagen noticia";
                    img.classList.add("modal-imagen");
                    modalGaleria.appendChild(img);
                } else if (noticia.galeria.length > 1) {
                    const imgPrincipal = document.createElement("img");
                    imgPrincipal.src = noticia.galeria[0];
                    imgPrincipal.alt = "Imagen noticia";
                    imgPrincipal.classList.add("modal-imagen");
                    modalGaleria.appendChild(imgPrincipal);

                    const galeriaExtras = document.createElement("div");
                    galeriaExtras.classList.add("swiper", "modal-swiper");
                    galeriaExtras.innerHTML = `
                        <div class="swiper-wrapper">
                            ${noticia.galeria.slice(1).map(img => `
                                <div class="swiper-slide">
                                    <img src="${img}" alt="Imagen noticia" />
                                </div>
                            `).join('')}
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div> 
                        <div class="swiper-button-prev"></div>
                    `;
                    modalGaleria.appendChild(galeriaExtras);

                    if (modalSwiper) modalSwiper.destroy(true, true);
                    modalSwiper = new Swiper(".modal-swiper", {
                        slidesPerView: 1,
                        loop: true,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                    });
                }

                modal.style.display = "block";
            });
        });

        // Swiper principal de tarjetas
        new Swiper(".swiper", {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            autoplay: { delay: 7000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: { 0: { slidesPerView: 1 }, 860: { slidesPerView: 2 }, 1400: { slidesPerView: 3 }, 1920: { slidesPerView: 4 }, 2100: { slidesPerView: 5 } }
        });
    });


// Cerrar modal
spanClose.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };
