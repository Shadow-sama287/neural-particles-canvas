/**
 * Neural Particle System
 * Creates an interactive particle network with mouse interaction
 * - Particles drift and bounce around the canvas
 * - Connect with glowing lines when within 130px
 * - Attracted to cursor (subtle pull within 180px)
 * - Emerald green color scheme
 */

// import { randomIntFromRange, randomColor, distance } from './utils/utils.js';
// import { color3 } from './utils/colorArrays.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Configuration - easily customizable
const config = {
    particleColor: 'rgba(16,185,129',           // Emerald green
    connectionDistance: 130,                    // Max distance to draw lines
    mouseInfluenceDistance: 180,                // How far mouse pulls particles
    maxSpeed: 0.5,                              // Velocity cap per frame
    mouseAttraction: 0.012,                     // Strength of mouse pull
    particleOpacity: 1,                         // Particle transparency
    lineOpacity: 0.82,                          // Connection line transparency
    particleSizeMin: 0.5,
    particleSizeMax: 1.8,
    repulsionDistance: 30,                      // Gravitational push-pull field distance
    repulsionStrength: 0.015                    // Strength of particle repulsion
};

// Particle array
let particles = [];

// Mouse tracking
var mouse = {
    x: -1000,
    y: -1000
}

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

// Hide mouse influence when leaving window
addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
})

/**
 * Initialize particles based on canvas size
 * Density: roughly 1 particle per 18000 pixels, max 120 particles
 */
function init() {
    particles = [];
    const count = Math.max(Math.floor((canvas.width * canvas.height) / 18000), 120);
    // console.log(canvas.width * canvas.height / 18000);  //Approx 40 particles as minimum


    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.25,  // Random initial velocity X
            vy: (Math.random() - 0.5) * 0.25,  // Random initial velocity Y
            size: Math.random() * (config.particleSizeMax - config.particleSizeMin) + config.particleSizeMin,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
}

/**
 * Update particle physics
 * - Drift by velocity
 * - Bounce off edges
 * - Mouse attraction
 * - Particle repulsion (gravitational push-pull field)
 * - Speed limiting
 */
function updateParticles() {
    for (let p of particles) {
        // 1. DRIFT: Move particle by its velocity
        p.x += p.vx;
        p.y += p.vy;

        // 2. BOUNCE: Reverse velocity at canvas edges
        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        // Keep particles within bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // 3. MOUSE ATTRACTION: Pull towards cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseInfluenceDistance && distance > 0) {
            // Normalize direction and add attraction force
            p.vx += (dx / distance) * config.mouseAttraction;
            p.vy += (dy / distance) * config.mouseAttraction;
        }

        // 4. PARTICLE REPULSION: Push away from nearby particles (gravitational field)
        for (let other of particles) {
            if (other === p) continue;

            const repelDx = p.x - other.x;
            const repelDy = p.y - other.y;
            const repelDistance = Math.sqrt(repelDx * repelDx + repelDy * repelDy);

            if (repelDistance < config.repulsionDistance && repelDistance > 0) {
                // Normalize direction and add repulsion force
                p.vx += (repelDx / repelDistance) * config.repulsionStrength;
                p.vy += (repelDy / repelDistance) * config.repulsionStrength;
            }
        }

        // 5. SPEED LIMIT: Cap maximum velocity magnitude
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > config.maxSpeed) {
            p.vx = (p.vx / speed) * config.maxSpeed;
            p.vy = (p.vy / speed) * config.maxSpeed;
        }
    }
}

/**
 * Draw all particles as circles
 */
function drawParticles() {
    for (let p of particles) {
        c.beginPath();
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        c.fillStyle = `${config.particleColor},${p.opacity})`;
        c.fill();
        c.closePath();
    }
}

/**
 * Draw connection lines between nearby particles
 * Closer particles = brighter lines
 */
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Draw line if particles are close enough
            if (distance < config.connectionDistance) {
                // Opacity fades with distance (closer = brighter)
                const opacity = (1 - distance / config.connectionDistance) * config.lineOpacity;

                c.beginPath();
                c.moveTo(p1.x, p1.y);
                c.lineTo(p2.x, p2.y);
                c.strokeStyle = `${config.particleColor},${opacity})`;
                c.lineWidth = 0.5;
                c.stroke();
                c.closePath();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Clear canvas with dark background
    c.fillStyle = 'rgba(0, 0, 0, 1)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Update physics
    updateParticles();

    // Draw in order: lines first (behind), then particles (on top)
    drawConnections();
    drawParticles();
}

init();
animate();