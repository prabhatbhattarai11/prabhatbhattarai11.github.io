// Theme Toggle Functionality with LocalStorage Persistence
const themeBtn = document.getElementById('themeToggleBtn');

// Read saved preference or default to dark
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  if (themeBtn) themeBtn.textContent = '☀️';
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    
    // Update icon and save state
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}
