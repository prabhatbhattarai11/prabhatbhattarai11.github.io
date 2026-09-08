// --- Dark/Light Mode Switch ---
const themeToggleBtn = document.getElementById('themeToggleBtn');
const bodyElement = document.body;

// Read saved state or system configuration
const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
  bodyElement.classList.add('light-mode');
  if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
} else {
  bodyElement.classList.remove('light-mode');
  if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('light-mode');
    const isLight = bodyElement.classList.contains('light-mode');
    themeToggleBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// --- Mobile Navigation Toggle ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = navLinks.style.display === 'flex';
    navLinks.style.display = isExpanded ? 'none' : 'flex';
    if (!isExpanded) {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '60px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--nav-bg)';
      navLinks.style.padding = '20px';
    }
  });
}
