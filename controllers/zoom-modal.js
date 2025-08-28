const modalImagenGrande = document.getElementById("mostrar-imagen");
const imagenGrande = document.getElementById("imagen-noticia");
const closeGrande = modalImagenGrande.querySelector(".close");

// Abrir imagen al click
document.querySelectorAll(".modal-left .modal-imagen").forEach(img => {
    img.addEventListener("click", () => {
        imagenGrande.src = img.src;
        modalImagenGrande.style.display = "flex";
    });
});

// Cerrar modal de imagen grande
closeGrande.onclick = () => modalImagenGrande.style.display = "none";
window.addEventListener("click", e => {
    if (e.target == modalImagenGrande) modalImagenGrande.style.display = "none";
});
