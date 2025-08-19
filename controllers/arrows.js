document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('cardSlider');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const cardItems = slider.querySelectorAll('.card-item');

    const cardWidth = cardItems[0].offsetWidth + 20; // ancho + gap
    let autoScrollInterval;

    function scrollRight() {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    }

    function scrollLeft() {
        if (slider.scrollLeft <= 0) {
            slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    }

    rightBtn.addEventListener('click', scrollRight);
    leftBtn.addEventListener('click', scrollLeft);

    autoScrollInterval = setInterval(scrollRight, 3000);

    slider.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    slider.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(scrollRight, 3000);
    });
});
