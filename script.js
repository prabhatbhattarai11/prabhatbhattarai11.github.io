// --- Light/Dark Theme Switcher Logic (Default: Light) ---
const themeToggleBtn = document.getElementById('themeToggleBtn');
const bodyElement = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    bodyElement.classList.add('dark-theme');
    themeToggleBtn.textContent = '☀️';
} else {
    bodyElement.classList.remove('dark-theme');
    themeToggleBtn.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-theme');
    
    if (bodyElement.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
    }
});

// --- Formspree Async Submission Handler ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'json' }
            });
            
            if (response.ok) {
                formStatus.style.color = '#22c55e';
                formStatus.textContent = 'Thanks! Your message has been sent successfully.';
                contactForm.reset();
            } else {
                formStatus.style.color = '#ef4444';
                formStatus.textContent = 'Oops! There was a problem submitting your form.';
            }
        } catch (error) {
            formStatus.style.color = '#ef4444';
            formStatus.textContent = 'Network error. Please check your connection.';
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// --- Page Loader Handler ---
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 600);
});
