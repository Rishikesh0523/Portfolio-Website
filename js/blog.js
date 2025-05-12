// Blog Filtering Logic
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    // Initialize the filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter blog posts
            filterItems(blogPosts, filterValue);
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

// Check if detailed versions of blogs exist
function checkDetailedVersions() {
    document.querySelectorAll('.blog-detail-link').forEach(link => {
        const detailUrl = link.getAttribute('href');
        const exists = link.getAttribute('data-exists') === 'true';
        
        if (!exists) {
            link.innerHTML = 'View Summary <i class=\'bx bx-news\'></i>';
            // Modify behavior for non-existent blog posts
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const blogTitle = this.closest('.blog-post').querySelector('h3').textContent;
                alert(`Full post "${blogTitle}" coming soon! This is just a summary for now.`);
            });
        }
    });
}