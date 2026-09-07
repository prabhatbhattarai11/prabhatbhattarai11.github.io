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

// --- Page Loader Handler ---
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 600);
});
