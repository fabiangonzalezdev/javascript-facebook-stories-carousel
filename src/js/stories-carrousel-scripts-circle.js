document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item_circle img');
    
    carouselItems.forEach(img => {
        img.addEventListener('load', function() {
            const loadingContainer = this.parentElement.querySelector('.loading-container');
            loadingContainer.style.display = 'none';
        });
        
        img.addEventListener('error', function() {
            const loadingContainer = this.parentElement.querySelector('.loading-container span');
            loadingContainer.innerText = 'Error al cargar';
        });
        
        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item_vips img');
    
    carouselItems.forEach(img => {
        img.addEventListener('load', function() {
            const loadingContainer = this.parentElement.querySelector('.loading-container');
            loadingContainer.style.display = 'none';
        });
        
        img.addEventListener('error', function() {
            const loadingContainer = this.parentElement.querySelector('.loading-container span');
            loadingContainer.innerText = 'Error al cargar';
        });
        
        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item_famosa img');
    
    carouselItems.forEach(img => {
        img.addEventListener('load', function() {
            const loadingContainer = this.parentElement.querySelector('.loading-container');
            loadingContainer.style.display = 'none';
        });
        
        img.addEventListener('error', function() {
            const loadingContainer = this.parentElement.querySelector('.loading-container span');
            loadingContainer.innerText = 'Error al cargar';
        });
        
        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });
});