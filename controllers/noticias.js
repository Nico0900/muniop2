// Obtener el contenedor
const noticiasContainer = document.getElementById("noticias-container");

// Cargar noticias desde el JSON
fetch("../json/noticias.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(noticia => {
            // Crear la estructura HTML de la card
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
                <a href="Noticia.html?id=${noticia.id}" class="card-button">Ver más</a>
            </div>
        </div>
      `;
            noticiasContainer.appendChild(card);
        });

        // Inicializar Swiper después de crear las cards
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
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                860: { slidesPerView: 2 },
                1400: { slidesPerView: 3 },
                1920: { slidesPerView: 5 }
            },
        });
    })
    .catch(error => console.error("Error cargando noticias:", error));
