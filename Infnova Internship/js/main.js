// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (nav && nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
      nav.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    }
  });
  
  // Highlight active navigation link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-list a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === 'index.html' && currentPath.includes('index') || 
        link.getAttribute('href') === 'course.html' && currentPath.includes('course')) {
      link.classList.add('active');
    }
  });
});

// Wishlist functionality for course page
const wishlistBtn = document.getElementById('wishlistBtn');
if (wishlistBtn) {
  wishlistBtn.addEventListener('click', function() {
    const icon = this.querySelector('i');
    if (icon.classList.contains('far')) {
      icon.classList.remove('far');
      icon.classList.add('fas');
      this.classList.add('btn-primary');
      this.classList.remove('btn-outline');
      
      // Show feedback
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Added to Wishlist';
      setTimeout(() => {
        this.innerHTML = originalText;
        icon.classList.remove('fas');
        icon.classList.add('far');
        this.classList.remove('btn-primary');
        this.classList.add('btn-outline');
      }, 2000);
    }
  });
}