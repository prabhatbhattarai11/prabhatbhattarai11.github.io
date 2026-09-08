document.addEventListener('DOMContentLoaded', () => {
  const detailsElement = document.getElementById('mobileMenuDetails');
  const mobLinks = document.querySelectorAll('.mob-link');

  // Close mobile dropdown menu automatically when a link is tapped
  if (detailsElement) {
    mobLinks.forEach(link => {
      link.addEventListener('click', () => {
        detailsElement.removeAttribute('open');
      });
    });
  }

  // Smooth Scrolling setup
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});
