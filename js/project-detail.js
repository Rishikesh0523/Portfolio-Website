// Project Detail Page Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Gallery thumbnails functionality
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.gallery-thumbs .thumb');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.src;
            mainImage.alt = this.alt;
            
            // Add animation
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});