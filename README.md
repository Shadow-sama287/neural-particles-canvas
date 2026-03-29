# Neural Particle System - Cool Particle Canvas

An interactive, high-performance particle system with physics simulation, mouse interaction, and dynamic connectivity. Particles drift across the canvas, connect with glowing lines, respond to mouse attraction, and repel each other to create an organic, living network effect.

**Perfect for**: Portfolio websites, interactive backgrounds, creative visualizations, and dynamic UI elements.

---

## ✨ Features

### Core Features

- **1-120 Scalable Particles** - Automatically adjusts particle count based on viewport size
- **Emerald Green Network** - RGBA(16,185,129) particles with smooth connections
- **Dynamic Connections** - Glowing lines appear between particles within 130px (opacity fades with distance)
- **Mouse Interaction** - Particles subtly attracted to cursor within 180px radius
- **Gravitational Repulsion** - Particles push away from each other (60px field) preventing clustering
- **Physics Simulation** - Continuous drift, velocity vectors, edge bouncing, and speed limiting
- **Smooth Animation** - 60fps performance via requestAnimationFrame
- **Responsive Canvas** - Auto-scales and recalculates on window resize

### Visual Effects

- Particles continuously move with independent velocity vectors
- Lines fade based on particle distance (closer = brighter)
- Creates a neural network-like aesthetic
- Fully dark background for contrast
- Crosshair cursor for interactivity

---

## 🚀 Quick Start

### 1. Basic Setup

The project is ready to use out of the box! Simply open `src/index.html` in your browser.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Neural Particle System</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #000;
      }
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        cursor: crosshair;
      }
    </style>
  </head>
  <body>
    <canvas></canvas>
    <script src="canvas.js"></script>
  </body>
</html>
```

### 2. Basic Usage

The particle system initializes automatically on page load. Move your mouse to interact!

```javascript
// Particles are created automatically
// Mouse interaction is enabled by default
// Just watch them move!
```

---

## ⚙️ Configuration

All settings are easily customizable in the `config` object at the top of `canvas.js`:

```javascript
const config = {
  particleColor: "rgba(16,185,129", // Emerald green color
  connectionDistance: 130, // Max pixels to draw connecting lines
  mouseInfluenceDistance: 180, // Cursor's pull radius
  maxSpeed: 0.5, // Max velocity per frame
  mouseAttraction: 0.012, // Strength of cursor pull
  particleOpacity: 1, // Particle transparency (0-1)
  lineOpacity: 0.82, // Line transparency (0-1)
  particleSizeMin: 0.5,
  particleSizeMax: 1.8,
  repulsionDistance: 60, // Gravitational field radius
  repulsionStrength: 0.015, // Strength of particle repulsion
};
```

### Common Adjustments

| Parameter                | Effect                                           | Suggested Range |
| ------------------------ | ------------------------------------------------ | --------------- |
| `connectionDistance`     | How visually connected the network feels         | 80-160          |
| `mouseInfluenceDistance` | How far your cursor affects particles            | 100-250         |
| `repulsionDistance`      | How close particles can get before pushing apart | 40-100          |
| `repulsionStrength`      | How forcefully particles repel each other        | 0.005-0.03      |
| `mouseAttraction`        | How strongly cursor pulls particles              | 0.005-0.025     |
| `particleOpacity`        | Brightness of particles                          | 0.3-1           |
| `lineOpacity`            | Brightness of connecting lines                   | 0.1-0.5         |

---

## 🎮 Interaction Model

### Mouse Attraction

- Particles within **180px** of your cursor are gently pulled toward it
- Effect is subtle and creates flowing patterns
- Cursor position is tracked with `mousemove` event
- Mouse influence deactivates when you leave the window

### Gravitational Repulsion (Push-Pull Field)

- Particles push away from nearby particles within **60px**
- Prevents clustering when mouse pulls them together
- Creates organic, dispersed network patterns
- Can be fine-tuned with `repulsionStrength` parameter

### Physics Simulation

1. **Drift** - Each particle moves by its velocity vector
2. **Bounce** - Velocity reverses at canvas edges
3. **Mouse Pull** - Cursor attracts nearby particles
4. **Repulsion** - Particles push away from neighbors
5. **Speed Cap** - Maximum velocity prevents runaway motion

---

## 📊 Physics Breakdown

### Particle Update Loop

```
For each particle:
  1. Add velocity to position (DRIFT)
  2. Bounce if hitting canvas edges
  3. Calculate distance to mouse, apply attraction force
  4. Calculate distance to ALL other particles, apply repulsion force
  5. Cap velocity to max speed
  6. Repeat next frame
```

### Force Calculations

**Mouse Attraction:**

```javascript
distance = sqrt((mouse.x - particle.x)² + (mouse.y - particle.y)²)
if distance < mouseInfluenceDistance:
  force = (direction_to_mouse / distance) * mouseAttraction
  velocity += force
```

**Particle Repulsion:**

```javascript
for each other_particle:
  distance = sqrt((particle.x - other.x)² + (particle.y - other.y)²)
  if distance < repulsionDistance:
    force = (direction_away_from_other / distance) * repulsionStrength
    velocity += force
```

---

## 🎨 Customization Ideas

### Color Change

```javascript
// In config, change particleColor:
particleColor: "rgba(255, 0, 127"; // Hot pink
particleColor: "rgba(100, 200, 255"; // Sky blue
particleColor: "rgba(138, 43, 226"; // Blue violet
```

### High Density Network (More Particles)

```javascript
// In initParticles(), change the calculation:
const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 200);
```

### Looser Clustering

```javascript
// Increase repulsion:
repulsionDistance: 100,
repulsionStrength: 0.025
```

### Tight Network Clustering

```javascript
// Decrease repulsion:
repulsionDistance: 40,
repulsionStrength: 0.008
```

---

## 📁 Project Structure

```
cool-particle-canvas/
├── src/
│   ├── index.html          # Main HTML entry point
│   ├── canvas.js           # Particle system implementation
│   └── utils/
│       ├── colorArrays.js  # Color palettes (optional)
│       └── utils.js        # Utility functions (optional)
├── assets/                 # Static files (favicon, images, etc.)
├── README.md               # This file
└── .git/                   # Version control
```

---

## 🔧 Development

### File Descriptions

**canvas.js** - Main particle system logic

- `config` - All configuration parameters
- `init()` - Initializes particles based on canvas size
- `updateParticles()` - Updates physics each frame (drift, attraction, repulsion)
- `drawParticles()` - Renders particles to canvas
- `drawConnections()` - Renders connection lines
- `animate()` - Main animation loop

**index.html** - Canvas setup and styling

- Black background optimal for particle visibility
- Responsive canvas element
- Crosshair cursor for better interactivity

### Performance Tips

- **Particle Count**: Limited to 120 max particles to maintain 60fps
- **Repulsion Calculations**: Only checks particles within 60px (early exit)
- **Distance Caching**: Store distance values instead of recalculating
- **RequestAnimationFrame**: Uses browser's optimal rendering timing

---

## 🎯 Use Cases

1. **Portfolio Background** - Add to personal/portfolio website for visual interest
2. **Loading Screen** - Use as animated loading indicator
3. **Data Visualization** - Represent network/connection data
4. **Web App Background** - Subtle moving background for SaaS platforms
5. **Art Installation** - Interactive digital art display
6. **Game Background** - Living, breathing UI backdrop

---

## 📝 Browser Compatibility

Compatible with all modern browsers supporting:

- HTML5 Canvas 2D Context
- ES6+ JavaScript (Classes, Arrow Functions, Destructuring)
- RequestAnimationFrame API

**Tested on:**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🚀 Future Enhancements

- [ ] Touch/mobile support with swipe gestures
- [ ] Particle trails or fade effects
- [ ] Different color modes (rainbow, gradient)
- [ ] Customizable particle shapes (circles, squares, stars)
- [ ] Sound reaction (particles respond to audio)
- [ ] Preset animation profiles
- [ ] Export/download as PNG or video

---

## 📄 License

This project is free to use for personal and commercial projects.

---

## 🎓 Learning Resources

This implementation demonstrates:

- Canvas 2D API fundamentals
- Physics simulation in games/graphics
- Vector math (distance, normalization, magnitude)
- RequestAnimationFrame for smooth animation
- Event handling (resize, mousemove)
- Performance optimization for particle systems
- Functional programming patterns in JavaScript

---

## 💡 Tips & Tricks

### Adjust Feel for Your Use Case

**Professional/Corporate:**

```javascript
repulsionStrength: 0.02,
mouseAttraction: 0.008,
lineOpacity: 0.5
```

**Playful/Energetic:**

```javascript
repulsionStrength: 0.025,
mouseAttraction: 0.02,
lineOpacity: 0.8
```

**Calm/Meditative:**

```javascript
repulsionStrength: 0.01,
mouseAttraction: 0.005,
maxSpeed: 0.3,
lineOpacity: 0.3
```

---

**Enjoy your neural particle system!** 🌟
class Circle {
constructor(x, y, radius) {
this.x = x;
this.y = y;
this.radius = radius;
this.color = randomColor(color1); // Use the imported function
}

    update() {
        // Calculate distance to mouse for interactive effects
        const distToMouse = distance(this.x, this.y, mouse.x, mouse.y);
        if (distToMouse < 200) {
            // Do something when mouse is nearby
        }
        this.draw();
    }

}

// In init function:
function init() {
for (let i = 0; i < 100; i++) {
const radius = randomIntFromRange(5, 30);
const circle = new Circle(
randomIntFromRange(radius, canvas.width - radius),
randomIntFromRange(radius, canvas.height - radius),
radius
);
}
}

````

### Option 2: Webpack Bundler Setup

If you need more complex build setup, see the `gravity/canvas-boilerplate/` folder for a webpack configuration example.

## Getting Started

1. **Clone or copy this template** to start a new canvas project
2. **Edit `index.html`** - Change the title and meta information
3. **Edit `canvas.js`** - Build your animation or interactive graphic
4. **Add colors** - Define your own color arrays in `colorArrays.js` or use the existing ones
5. **Use utilities** - Leverage the helper functions to reduce boilerplate code

## Live Reload (Optional)

For development, you can use a simple HTTP server:

```bash
python -m http.server 8000
# or
npx http-server
````

Then open `http://localhost:8000/src/index.html` in your browser.

## Tips & Best Practices

- **Keep it modular** - Add new utility functions to `utils.js` for reusable logic
- **Organize colors** - Create new color arrays in `colorArrays.js` for different themes
- **Performance** - Use `requestAnimationFrame()` for smooth animations (already included)
- **Responsive design** - The resize event listener keeps the canvas full-screen

## Common Use Cases

### Creating a particle effect

```javascript
class Particle extends Circle {
  constructor(x, y, radius, color, velocityX, velocityY) {
    super(x, y, radius, color);
    this.vx = velocityX;
    this.vy = velocityY;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.draw();
  }
}
```

### Interactive mouse detection

```javascript
function update() {
  circles.forEach((circle) => {
    const d = distance(circle.x, circle.y, mouse.x, mouse.y);
    if (d < 100) {
      circle.color = "#ff0000"; // Highlight on hover
    }
  });
}
```
