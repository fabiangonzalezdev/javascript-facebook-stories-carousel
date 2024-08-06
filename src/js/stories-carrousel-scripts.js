document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const closeModal = document.querySelector('.close');
    const modalPrevButton = document.querySelector('.modal-control-prev');
    const modalNextButton = document.querySelector('.modal-control-next');
    let currentIndex = 0;

    function updateCarousel() {
        const itemWidth = carouselItems[0].offsetWidth + 10; // Adding margin space
        const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
        const newTransform = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${newTransform}px)`;
    }

    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentIndex < carouselItems.length - Math.floor(carousel.offsetWidth / (carouselItems[0].offsetWidth + 10))) {
            currentIndex++;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();

    // Modal functionality
    function openModal(index) {
        const item = carouselItems[index];
        const video = item.querySelector('video');
        const img = item.querySelector('img');
        currentIndex = index;

        if (video) {
            modalImage.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = video.querySelector('source').src;
            modalVideo.play(); // Auto-play video
        } else if (img) {
            modalVideo.style.display = 'none';
            modalImage.style.display = 'block';
            modalImage.src = img.src;
        }
        modal.style.display = 'flex';
        updateModalNav();
        prevButton.style.display = 'none'; // Hide carousel arrows
        nextButton.style.display = 'none';
    }

    function closeModalFunction() {
        modal.style.display = 'none';
        modalVideo.pause();
        prevButton.style.display = 'block'; // Show carousel arrows
        nextButton.style.display = 'block';
    }

    function updateModalNav() {
        if (currentIndex === 0) {
            modalPrevButton.style.display = 'none';
        } else {
            modalPrevButton.style.display = 'block';
        }

        if (currentIndex === carouselItems.length - 1) {
            modalNextButton.style.display = 'none';
        } else {
            modalNextButton.style.display = 'block';
        }
    }

    function showPrevItem() {
        if (currentIndex > 0) {
            openModal(currentIndex - 1);
        }
    }

    function showNextItem() {
        if (currentIndex < carouselItems.length - 1) {
            openModal(currentIndex + 1);
        }
    }

    carouselItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openModal(index);
        });

        const video = item.querySelector('video');
        const img = item.querySelector('img');
        const loadingContainer = item.querySelector('.loading-container');

        if (video) {
            video.addEventListener('loadeddata', function() {
                loadingContainer.style.display = 'none';
            });

            video.addEventListener('waiting', function() {
                loadingContainer.style.display = 'flex';
            });
        }

        if (img) {
            img.addEventListener('load', function() {
                loadingContainer.style.display = 'none';
            });

            img.addEventListener('error', function() {
                loadingContainer.querySelector('span').innerText = 'Error al cargar';
            });

            // For browsers that cache images, ensure the load event still triggers correctly
            if (img.complete) {
                img.dispatchEvent(new Event('load'));
            }
        }
    });

    closeModal.addEventListener('click', closeModalFunction);

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunction();
        }
    });

    modalPrevButton.addEventListener('click', showPrevItem);
    modalNextButton.addEventListener('click', showNextItem);
});
