// Obtener el ID de la noticia desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Obtener referencias del DOM
const tituloEl = document.getElementById("titulo");
const tipoEl = document.getElementById("tipo");
const imagenEl = document.getElementById("imagen");
const contenidoEl = document.getElementById("contenido");
const perfilEl = document.getElementById("perfil");

// Cargar el JSON
fetch('../json/noticias.json')
    .then(response => response.json())
    .then(data => {
        // Buscar la noticia por ID
        const noticia = data.find(n => n.id == id);
        if (noticia) {
            tituloEl.textContent = noticia.titulo;
            tipoEl.textContent = noticia.tipo;
            imagenEl.src = noticia.imagen;
            contenidoEl.textContent = noticia.contenido;
            perfilEl.src = noticia.perfil;
        } else {
            tituloEl.textContent = "Noticia no encontrada";
            contenidoEl.textContent = "";
        }
    })
    .catch(error => {
        console.error("Error cargando noticias:", error);
    });
