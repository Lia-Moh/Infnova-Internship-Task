// Search functionality for homepage
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const courseCards = document.querySelectorAll('.course-card');
  const courseCountElement = document.getElementById('courseCount');
  const coursesGrid = document.getElementById('coursesGrid');
  
  if (!searchInput || !courseCards.length || !courseCountElement) return;
  
  // Debounce function for performance
  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  // Filter courses function
  function filterCourses() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;
    
    courseCards.forEach(card => {
      const cardText = card.innerText.toLowerCase();
      const matchesSearch = searchTerm === '' || cardText.includes(searchTerm);
      
      card.style.display = matchesSearch ? 'flex' : 'none';
      if (matchesSearch) visibleCount++;
    });
    
    // Update course count
    updateCourseCount(visibleCount);
    
    // Show/hide no results message
    toggleNoResultsMessage(visibleCount);
  }
  
  // Update course count display
  function updateCourseCount(visibleCount) {
    const total = courseCards.length;
    
    if (visibleCount === 0) {
      courseCountElement.textContent = 'No courses found';
      courseCountElement.style.color = '#ef4444';
    } else {
      courseCountElement.textContent = `Showing ${visibleCount} of ${total} courses`;
      courseCountElement.style.color = '#6b7280';
    }
  }
  
  // Toggle no results message
  function toggleNoResultsMessage(visibleCount) {
    // Remove existing message
    const existingMessage = document.querySelector('.no-results');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Add message if no results
    if (visibleCount === 0 && coursesGrid) {
      const noResultsMessage = document.createElement('div');
      noResultsMessage.className = 'no-results';
      noResultsMessage.innerHTML = `
        <i class="fas fa-search" style="font-size: 48px; color: #d1d5db; margin-bottom: 20px;"></i>
        <h3 style="margin-bottom: 8px;">No courses found</h3>
        <p style="color: #6b7280;">Try adjusting your search term or browse all courses</p>
      `;
      coursesGrid.appendChild(noResultsMessage);
    }
  }
  
  // Add input event listener with debounce
  searchInput.addEventListener('input', debounce(filterCourses, 300));
  
  // Add keyboard shortcut (Ctrl + /) to focus search
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      searchInput.focus();
    }
  });
  
  // Initial course count
  updateCourseCount(courseCards.length);
});