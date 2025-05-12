// Blog Post Page Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Table of Contents link scrolling
    const tocLinks = document.querySelectorAll('.blog-post-toc a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate position accounting for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // Add active state to current section in TOC
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('h2[id], h3[id]');
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Get the corresponding TOC link
                const tocLink = document.querySelector(`.blog-post-toc a[href="#${section.id}"]`);
                
                // Remove active from all links
                document.querySelectorAll('.blog-post-toc a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active to current section's link
                if (tocLink) {
                    tocLink.classList.add('active');
                }
            }
        });
    });
    
    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const title = document.title;
            const url = window.location.href;
            
            if (this.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
            } else if (this.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            } else if (this.classList.contains('linkedin')) {
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
            }
        });
    });
    
    // Highlight code blocks using highlight.js
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
});