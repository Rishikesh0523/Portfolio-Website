/*==================== HEADER SCROLL EFFECT ====================*/
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    // Add sticky class when scrolled
    header.classList.toggle('sticky', window.scrollY > 10);
});

/*==================== ACTIVE LINK & NAVIGATION ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // This will be handled by the module-loader.js
    
    /*==================== SCROLL REVEAL ====================*/
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .skills-container, .projects-container, .blog-container, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
    ScrollReveal().reveal('.skill-item, .project-box, .blog-post', { origin: 'bottom', interval: 200 });

    /*==================== FORM VALIDATION ====================*/
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // The form submission is handled by the form-specific script in index.html
        });
    }

    /*==================== SCROLL TO TOP BUTTON ====================*/
    window.addEventListener('scroll', function() {
        const scrollTopBtn = document.querySelector('.footer-iconTop a');
        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        }
    });
    
    // Add click event to scroll top button
    const scrollTopBtn = document.querySelector('.footer-iconTop a');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});