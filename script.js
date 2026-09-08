// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('themeToggleBtn');
const bodyElement = document.body;

// Check for saved user preference in localStorage on page load
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
  bodyElement.classList.add('light-mode');
  if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
} else {
  if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
}

// Listen for click event on the toggle button
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('light-mode');
    
    let theme = 'dark';
    if (bodyElement.classList.contains('light-mode')) {
      theme = 'light';
      themeToggleBtn.textContent = '☀️';
    } else {
      themeToggleBtn.textContent = '🌙';
    }
    
    // Save preference to localStorage
    localStorage.setItem('theme', theme);
  });
}
