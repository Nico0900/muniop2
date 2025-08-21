// Array con los IDs de tus radios
const slides = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'];
let current = 0; // slide inicial
const intervalTime = 7000; // 5 segundos entre slides

setInterval(() => {
    // desmarcar slide actual
    document.getElementById(slides[current]).checked = false;

    // siguiente slide
    current = (current + 1) % slides.length;

    // marcar slide siguiente
    document.getElementById(slides[current]).checked = true;
}, intervalTime);

