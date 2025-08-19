const cardList = document.getElementById("cardList");
const cards = cardList.querySelectorAll(".card-item");
const dotsContainer = document.getElementById("sliderDots");

// Crear un dot por cada card
cards.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  // Click en el dot → scroll y actualizar dot
  dot.addEventListener("click", () => {
    cards[i].scrollIntoView({ behavior: "smooth", inline: "start" });

    // Forzamos actualización de dot después de la animación
    const checkActive = () => {
      updateActiveDot();
      if (Math.abs(cardList.scrollLeft - cards[i].offsetLeft) > 5) {
        requestAnimationFrame(checkActive); // sigue revisando mientras se mueve
      }
    };
    requestAnimationFrame(checkActive);
  });
});

const dots = dotsContainer.querySelectorAll(".dot");

// Función que detecta la card más cercana al inicio y actualiza el dot
function updateActiveDot() {
  let activeIndex = 0;
  let closestDistance = Infinity;

  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const distance = Math.abs(rect.left - cardList.getBoundingClientRect().left);
    if (distance < closestDistance) {
      closestDistance = distance;
      activeIndex = i;
    }
  });

  dots.forEach((d, i) => d.classList.toggle("active", i === activeIndex));
}

// Scroll normal
cardList.addEventListener("scroll", updateActiveDot);
