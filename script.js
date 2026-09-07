// --- Three.js 3D Interactive Background Setup ---
const container = document.getElementById('canvas-container');

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Create Floating 3D Torus Knot & Materials
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x6366f1, 
    wireframe: true,
    roughness: 0.3,
    metalness: 0.8
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Add Ambient and Point Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x38bdf8, 2);
pointLight.position.set(25, 25, 25);
scene.add(pointLight);

camera.position.z = 30;

// Mouse Interaction variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    targetX = mouseX * 2;
    targetY = mouseY * 2;

    torusKnot.rotation.x += 0.005 + (targetY - torusKnot.rotation.x) * 0.05;
    torusKnot.rotation.y += 0.007 + (targetX - torusKnot.rotation.y) * 0.05;

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

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
