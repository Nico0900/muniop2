const bannerSwiper = new Swiper(".myBannerSwiper", {
    slidesPerView: 1,   // ✅ siempre un banner a la vez
    loop: true,
    autoplay: {
        delay: 4000,
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
});
