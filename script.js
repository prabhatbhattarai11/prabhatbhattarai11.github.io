// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Dark / Light Theme Toggle Setup
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  
  // Check local storage or system preference on load (Default: Light Mode)
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }

  // Theme button click event listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      
      // Update toggle icon and store user choice
      themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }


  /* ==========================================================================
     2. Responsive Mobile Navigation Toggle
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    // Close menu when a navigation link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
      });
    });
  }


  /* ==========================================================================
     3. Hero Image Fallback Handler
     ========================================================================== */
  const heroImg = document.querySelector('.hero-photo-img');
  const fallback = document.querySelector('.photo-fallback');

  if (heroImg) {
    heroImg.addEventListener('error', () => {
      heroImg.style.display = 'none';
      if (fallback) {
        fallback.classList.add('show');
      }
    });
  }


  /* ==========================================================================
     4. Smooth Scroll Offset for Sticky Header
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 90; // Accounting for floating navbar height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
