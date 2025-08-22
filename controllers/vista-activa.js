function mostrarPantalla(id, elemento = null) {
  // Ocultar todas las pantallas
  const pantallas = document.querySelectorAll(".pantalla");
  pantallas.forEach(p => p.classList.remove("active"));

  // Mostrar la pantalla seleccionada
  const activa = document.getElementById(id);
  if (activa) {
    activa.classList.add("active");
  }

  // Quitar "selected" de todos los enlaces
  const enlaces = document.querySelectorAll(".sidebar a");
  enlaces.forEach(enlace => enlace.classList.remove("selected"));

  // Marcar como seleccionado el que se hizo click
  if (elemento) {
    elemento.classList.add("selected");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarPantalla("Inicio", document.querySelector(".sidebar a")); // pantalla inicial
});
