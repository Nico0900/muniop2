// Cargamos el grid de Noticias
const noticiasContainer = document.getElementById("noticias-container-full");
const detalleContainer = document.getElementById("noticia-detalle-full");

fetch("../json/noticias.json")
    .then(res => res.json())
    .then(data => {
        data.forEach((noticia, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const preview = noticia.contenido[0].substring(0, 150) + "...";

            card.innerHTML = `
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

            noticiasContainer.appendChild(card);

            // Guardamos la noticia seleccionada en localStorage
            card.addEventListener("click", () => {
                localStorage.setItem("noticiaSeleccionada", JSON.stringify(noticia));
                // Redirigimos a la sección de detalle
                window.location.href = "#NoticiaID";
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        });
    });

// Mostrar la noticia seleccionada en NoticiaID
window.addEventListener("DOMContentLoaded", () => {
    const noticia = JSON.parse(localStorage.getItem("noticiaSeleccionada"));
    if (noticia && detalleContainer) {
        detalleContainer.innerHTML = "";

        const detalle = document.createElement("div");
        detalle.classList.add("noticia-completa");

        // Título
        const titulo = document.createElement("h2");
        titulo.textContent = noticia.titulo;
        detalle.appendChild(titulo);

        // Tipo
        const tipo = document.createElement("div");
        tipo.classList.add("tipo-noticia-full");
        tipo.textContent = noticia.tipo;
        detalle.appendChild(tipo);

        // Perfil
        const perfil = document.createElement("img");
        perfil.src = noticia.perfil;
        perfil.alt = "Perfil Noticia";
        perfil.classList.add("perfil-noticia");
        detalle.appendChild(perfil);

        // Contenido completo
        noticia.contenido.forEach(p => {
            const parrafo = document.createElement("p");
            parrafo.textContent = p;
            detalle.appendChild(parrafo);
        });

        // Galería
        noticia.galeria.forEach(imgSrc => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = "Imagen noticia";
            img.classList.add("imagen-noticia");
            detalle.appendChild(img);
        });

        detalleContainer.appendChild(detalle);

        // Limpiamos localStorage para que no se repita al recargar
        localStorage.removeItem("noticiaSeleccionada");
    }
});
