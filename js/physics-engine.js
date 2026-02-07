/* * THE ENTROPY ENGINE
 * Calculates displacement vectors for text elements based on chaos level.
 */

const entropySlider = document.getElementById('entropy-slider');
const spans = document.querySelectorAll('.physics-text span');

// State
let entropy = 0; // 0 to 100
let elements = [];

// Initialize Elements with original positions
spans.forEach((span, index) => {
    // Assign random velocity vectors
    elements.push({
        node: span,
        x: 0,
        y: 0,
        r: 0, // rotation
        vx: (Math.random() - 0.5) * 2, // Velocity X
        vy: (Math.random() - 0.5) * 2, // Velocity Y
        vr: (Math.random() - 0.5) * 0.5 // Angular Velocity
    });
});

entropySlider.addEventListener('input', (e) => {
    entropy = parseInt(e.target.value);
});

// The Physics Loop
function animate() {
    if (entropy > 0) {
        elements.forEach(el => {
            // Logic: The higher the entropy, the further they can drift
            // We use a sine wave to make them float rather than fly away indefinitely
            
            const chaosFactor = entropy / 10; 
            
            // Update positions
            el.x += el.vx * (chaosFactor * 0.1);
            el.y += el.vy * (chaosFactor * 0.1);
            el.r += el.vr * (chaosFactor * 0.05);

            // Boundary "soft" return (Elasticity)
            // If entropy is lowered, they magnetize back to 0,0
            if (entropy < 10) {
                 el.x *= 0.9;
                 el.y *= 0.9;
                 el.r *= 0.9;
            }

            el.node.style.transform = `translate(${el.x}px, ${el.y}px) rotate(${el.r}deg)`;
        });
    } else {
        // Reset if entropy is absolutely 0
        elements.forEach(el => {
            if(el.x !== 0) {
                el.x = 0; el.y = 0; el.r = 0;
                el.node.style.transform = `translate(0px, 0px) rotate(0deg)`;
            }
        });
    }

    requestAnimationFrame(animate);
}

animate();
