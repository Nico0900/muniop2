document.addEventListener("DOMContentLoaded", function() {
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".popup-close");

  // Mostrar el popup con retraso de 0.5s para suavidad
  setTimeout(() => {
    popup.classList.add("active");
  }, 500);

  // Cerrar al hacer click en la X
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  // Cerrar al hacer click fuera del contenido
  popup.addEventListener("click", (e) => {
    if(e.target === popup) {
      popup.classList.remove("active");
    }
  });
});