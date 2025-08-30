let noticiasData = [];

// Cargar noticias desde JSON
fetch("json/noticias.json")
    .then(response => response.json())
    .then(data => {
        noticiasData = data;
        renderNoticiasGrid(data);
    })
    .catch(error => console.error("Error cargando noticias:", error));

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
            <img src="${portada}" alt="${noticia.titulo}">
            <h3>${noticia.titulo}</h3>
            <p>${noticia.contenido[0]?.substring(0, 80) ?? ''}...</p>
        `;

        grid.appendChild(card);
    });
}

function abrirModalNoticia(id) {
    const noticia = noticiasData.find(n => n.id === id);
    if (!noticia) return;

    const modal = document.getElementById("modal-noticias-grid");
    const titulo = document.getElementById("modal-grid-titulo");
    const contenido = document.getElementById("modal-grid-contenido");
    const galeria = document.getElementById("modal-grid-galeria");

    titulo.innerText = noticia.titulo;
    contenido.innerHTML = noticia.contenido
        .map(p => `<p>${p}</p>`).join("");

    galeria.innerHTML = "";
    noticia.galeria.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = noticia.titulo;

        // al hacer clic en la imagen, abrir modal-imagen2
        img.addEventListener("click", (e) => {
            e.stopPropagation(); // evita que cierre el modal-noticias-grid
            abrirImagenGrande(src);
        });

        galeria.appendChild(img);
    });

    modal.style.display = "flex";
}

function cerrarModalNoticia() {
    const modal = document.getElementById("modal-noticias-grid");
    modal.style.display = "none";
}

// ================================
// Modal Imagen Grande (modal-imagen2)
// ================================
const modalImagen2 = document.getElementById("modal-imagen2");
const imagenGrande2 = document.getElementById("imagen-grande2");
const cerrarImagen2 = modalImagen2.querySelector(".close");

function abrirImagenGrande(src) {
    imagenGrande2.src = src;
    modalImagen2.style.display = "flex";
}

// Cerrar con el botón ✖
cerrarImagen2.addEventListener("click", () => {
    modalImagen2.style.display = "none";
    imagenGrande2.src = "";
});

// Cerrar al hacer clic fuera de la imagen
modalImagen2.addEventListener("click", (e) => {
    if (e.target === modalImagen2) {
        modalImagen2.style.display = "none";
        imagenGrande2.src = "";
    }
});
