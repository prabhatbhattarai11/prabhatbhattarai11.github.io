// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('themeToggleBtn');
const bodyElement = document.body;

// Check localStorage or system preference on page load
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  bodyElement.classList.add('dark-mode');
  if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
} else {
  bodyElement.classList.remove('dark-mode');
  if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
}

// Toggle Theme Event listener
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    
    const isDark = bodyElement.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// --- Safety Fallback Loader Dismissal ---
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }
});

setTimeout(() => {
  const loader = document.getElementById('pageLoader');
  if (loader && loader.style.display !== 'none') {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }
}, 1200);
