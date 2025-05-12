// Projects Filtering Logic
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.project-box');
    
    // Initialize the filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            filterItems(projectBoxes, filterValue);
        });
    });
    
    // Check if detailed versions exist
    checkDetailedVersions();
});

// Filter items based on category
function filterItems(items, filter) {
    items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            // Show the item with animation
            item.style.opacity = '0';
            item.style.display = 'block';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // Hide the item with animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Check if detailed versions of projects exist
function checkDetailedVersions() {
    document.querySelectorAll('.project-detail-link').forEach(link => {
        const detailUrl = link.getAttribute('href');
        const exists = link.getAttribute('data-exists') === 'true';
        
        if (!exists) {
            link.innerHTML = '<i class=\'bx bx-code\'></i> View Code';
            const githubLink = link.parentElement.querySelector('a[href*="github"]');
            if (githubLink) {
                link.setAttribute('href', githubLink.getAttribute('href'));
            }
        }
    });
}