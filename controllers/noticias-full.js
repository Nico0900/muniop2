const noticiasContainerFull = document.getElementById("noticias-container-full");

const modalFull = document.getElementById("modal-noticia-full");
const modalTituloFull = document.getElementById("modal-titulo-full");
const modalTipoFull = document.getElementById("modal-tipo-full");
const modalContenidoFull = document.getElementById("modal-contenido-full");
const modalPerfilFull = document.getElementById("modal-perfil-full");
const modalGaleriaFull = document.getElementById("modal-galeria-full");
const spanCloseFull = document.getElementById("close-modal-full");

let modalSwiperFull;

fetch("../json/noticias.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(noticia => {
            const cardFull = document.createElement("div");
            cardFull.classList.add("card");

            const preview = noticia.contenido[0].substring(0, 150) + "...";

            cardFull.innerHTML = `
                <div class="card-image">
                    <img src="${noticia.galeria[0]}" alt="${noticia.titulo}" />
                    <div class="tipo-noticia-full">${noticia.tipo}</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${noticia.titulo}</h3>
                    <p class="card-text">${preview}</p>
                    <div class="card-footer">
                        <div class="card-profile">
                            <img src="${noticia.perfil}" alt="Perfil Noticia" />
                        </div>
                    </div>
                </div>
            `;
            noticiasContainerFull.appendChild(cardFull);

            cardFull.addEventListener("click", () => {
                modalTituloFull.textContent = noticia.titulo;
                modalTipoFull.textContent = noticia.tipo;
                modalPerfilFull.src = noticia.perfil;

                modalContenidoFull.innerHTML = "";
                noticia.contenido.forEach(p => {
                    const parrafo = document.createElement("p");
                    parrafo.textContent = p;
                    modalContenidoFull.appendChild(parrafo);
                });

                modalGaleriaFull.innerHTML = "";
                if (noticia.galeria.length === 1) {
                    const img = document.createElement("img");
                    img.src = noticia.galeria[0];
                    img.alt = "Imagen noticia";
                    img.classList.add("modal-imagen-full");
                    modalGaleriaFull.appendChild(img);
                } else if (noticia.galeria.length > 1) {
                    const imgPrincipal = document.createElement("img");
                    imgPrincipal.src = noticia.galeria[0];
                    imgPrincipal.alt = "Imagen noticia";
                    imgPrincipal.classList.add("modal-imagen-full");
                    modalGaleriaFull.appendChild(imgPrincipal);

                    const galeriaExtrasFull = document.createElement("div");
                    galeriaExtrasFull.classList.add("swiper", "modal-swiper-full");
                    galeriaExtrasFull.innerHTML = `
                        <div class="swiper-wrapper">
                            ${noticia.galeria.slice(1).map(img => `
                                <div class="swiper-slide">
                                    <img src="${img}" alt="Imagen noticia" />
                                </div>
                            `).join('')}
                        </div>
                    `;
                    modalGaleriaFull.appendChild(galeriaExtrasFull);

                    if (modalSwiperFull) modalSwiperFull.destroy(true, true);
                    modalSwiperFull = new Swiper(".modal-swiper-full", {
                        slidesPerView: 1,
                        loop: true,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                        breakpoints: { 0: { slidesPerView: 1 }, 860: { slidesPerView: 2 }, 1400: { slidesPerView: 3 }, 1920: { slidesPerView: 4 }, 2100: { slidesPerView: 6 } }
                    });
                }

                modalFull.style.display = "block";
            });
        });
    });

spanCloseFull.onclick = () => modalFull.style.display = "none";
window.addEventListener("click", e => {
    if (e.target == modalFull) modalFull.style.display = "none";
});
