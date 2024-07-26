/* scripts.js */
document.addEventListener('DOMContentLoaded', (event) => {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const next = document.querySelector('.carousel-control-next');
    const prev = document.querySelector('.carousel-control-prev');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close');

    let index = 0;
    const totalItems = items.length;

    const showItem = (n) => {
        items.forEach((item, i) => {
            item.style.opacity = (i === n) ? '1' : '0';
        });
    };

    const nextItem = () => {
        index = (index + 1) % totalItems;
        showItem(index);
    };

    const prevItem = () => {
        index = (index - 1 + totalItems) % totalItems;
        showItem(index);
    };

    next.addEventListener('click', nextItem);
    prev.addEventListener('click', prevItem);

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            const src = e.target.src || e.target.querySelector('source').src;
            modal.style.display = 'block';
            modalImg.src = src;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    let autoSlide = setInterval(nextItem, 3000);

    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    carousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextItem, 3000);
    });
});
