document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    console.log(`Page loaded: ${formattedDate}`);
    console.log(`Current user: ${getCurrentUser()}`);
    
    // Load header
    loadModule('header-container', '/includes/header.html', function() {
        // After loading header, set the active link
        setTimeout(() => {
            setActiveNavLink();
            initMobileMenu();
        }, 100);
    });
    
    // Load footer
    loadModule('footer-container', '/includes/footer.html');
    
    // Check detailed versions of content
    setTimeout(() => {
        checkContentLinks();
    }, 500);
});

// Get current user (for demonstration)
function getCurrentUser() {
    return document.cookie.split('; ')
        .find(row => row.startsWith('username='))?.split('=')[1] || 'Rishikesh0523';
}

// Load a module via fetch
function loadModule(containerId, moduleUrl, callback) {
    const container = document.getElementById(containerId);
    if (container) {
        fetch(moduleUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load module: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                container.innerHTML = data;
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch(error => {
                console.error('Error loading module:', error);
                container.innerHTML = `<div class="module-error">Failed to load content. Please refresh the page.</div>`;
            });
    }
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        // Get the link path without hash
        const linkPath = link.getAttribute('href').split('#')[0];
        
        // Check if current URL contains the link path or if we're on the home page
        if ((linkPath !== '/index.html' && currentPath.includes(linkPath)) || 
            (linkPath === '/index.html' && (currentPath === '/' || currentPath === '/index.html'))) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active to current link
            link.classList.add('active');
        }
        
        // Handle hash links on the current page
        if (window.location.hash && link.getAttribute('href').includes(window.location.hash)) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

// Initialize mobile menu
function initMobileMenu() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            });
        });
    }
}

// Check if detailed versions exist and update links accordingly
function checkContentLinks() {
    // Check project detail links
    document.querySelectorAll('.project-detail-link').forEach(link => {
        const exists = link.getAttribute('data-exists') === 'true';
        if (!exists) {
            link.innerHTML = '<i class=\'bx bx-code\'></i> View Code';
            link.classList.remove('project-detail-link');
            link.classList.add('code-link');
            
            // Find GitHub link in the same container
            const githubLink = link.closest('.project-links').querySelector('a[href*="github"]');
            if (githubLink) {
                link.setAttribute('href', githubLink.getAttribute('href'));
            }
        }
    });
    
    // Check blog detail links
    document.querySelectorAll('.blog-detail-link').forEach(link => {
        const exists = link.getAttribute('data-exists') === 'true';
        if (!exists) {
            link.innerHTML = 'View Summary <i class=\'bx bx-news\'></i>';
            link.classList.remove('blog-detail-link');
            link.classList.add('summary-link');
            
            // Update click behavior for non-existent blog posts
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const blogTitle = this.closest('.blog-post').querySelector('h3').textContent;
                alert(`Full post "${blogTitle}" coming soon! This is just a summary for now.`);
            });
        }
    });
}

// Update copyright year in footer
window.addEventListener('load', function() {
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = `© ${currentYear} Rishikesh Paudel | All Rights Reserved.`;
    }
});

// Handle smooth scrolling for all internal links
document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (!target) return;
    
    const href = target.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    e.preventDefault();
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        history.pushState(null, null, href);
        
        // Update active navigation link
        setTimeout(() => {
            setActiveNavLink();
        }, 100);
    }
});