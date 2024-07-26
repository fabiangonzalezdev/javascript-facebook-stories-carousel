document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prev = document.querySelector('.carousel-control-prev');
    const next = document.querySelector('.carousel-control-next');
    let currentIndex = 0;

    function updateCarousel() {
        const width = items[0].clientWidth;
        carousel.style.transform = `translateX(${-currentIndex * (width + 10)}px)`;
    }

    prev.addEventListener('click', function (e) {
        e.preventDefault();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        updateCarousel();
    });

    next.addEventListener('click', function (e) {
        e.preventDefault();
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Swipe functionality for touch devices
    let startX;
    carousel.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchmove', function (e) {
        if (!startX) return;
        let currentX = e.touches[0].clientX;
        let diffX = startX - currentX;

        if (diffX > 50) {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
            startX = null;
        } else if (diffX < -50) {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            updateCarousel();
            startX = null;
        }
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const closeModal = document.querySelector('.close');

    items.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');
            const video = this.querySelector('video');
            modal.style.display = 'flex';
            if (img) {
                modalImage.src = img.src;
                modalImage.style.display = 'block';
                modalVideo.style.display = 'none';
            } else if (video) {
                modalVideo.src = video.querySelector('source').src;
                modalVideo.style.display = 'block';
                modalImage.style.display = 'none';
                modalVideo.play();
            }
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});
