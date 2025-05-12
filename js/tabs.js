// Tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeFAQs();
});

function initializeTabs() {
    const tabsContainers = document.querySelectorAll('.tabs-container');
    
    tabsContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab-btn');
        const contents = container.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Get the tab content to show
                const tabId = tab.getAttribute('data-tab');
                
                // Hide all tab contents
                contents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the selected tab content
                document.getElementById(tabId).classList.add('active');
            });
        });
    });
}

function initializeFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the item
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Tab navigation updating based on URL hash
window.addEventListener('load', function() {
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const section = document.getElementById(hash);
        
        if (section) {
            // If section has tabs, open the first tab
            const tabContainer = section.querySelector('.tabs-container');
            if (tabContainer) {
                const firstTab = tabContainer.querySelector('.tab-btn');
                firstTab.click();
            }
            
            // Smooth scroll to section
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth' });
            }, 200);
        }
    }
});

// Update tabs based on scroll position
window.addEventListener('scroll', function() {
    const tabsSections = document.querySelectorAll('.section-with-tabs');
    let activeSection = null;
    
    tabsSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
            activeSection = section;
        }
    });
    
    if (activeSection) {
        const id = activeSection.getAttribute('id');
        const navLink = document.querySelector(`.navbar a[href="#${id}"]`);
        
        if (navLink) {
            document.querySelectorAll('.navbar a').forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    }
});