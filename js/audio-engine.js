/*
 * THE SENSORY FIELD
 * Maps cursor X position to Stereo Panning.
 */

let audioCtx;
let panner;
let source;
let isAudioInit = false;

// Audio Initialization (Must be triggered by user interaction)
document.getElementById('start-overlay').addEventListener('click', async function() {
    this.style.opacity = '0';
    setTimeout(() => this.remove(), 1000);
    
    initAudio();
});

async function initAudio() {
    if(isAudioInit) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // Create Stereo Panner
    panner = audioCtx.createStereoPanner();
    
    // Load Audio
    const audioEl = new Audio('assets/ambient.mp3');
    audioEl.loop = true;
    audioEl.crossOrigin = "anonymous";

    // Connect Nodes
    source = audioCtx.createMediaElementSource(audioEl);
    source.connect(panner).connect(audioCtx.destination);
    
    audioEl.play();
    isAudioInit = true;
}

// Spatial Calculation
document.addEventListener('mousemove', (e) => {
    if (!isAudioInit) return;

    const width = window.innerWidth;
    const x = e.clientX;
    
    // Map 0 -> Width to -1 -> +1
    // Formula: (x / width) * 2 - 1
    const panValue = (x / width) * 2 - 1;

    // Smooth transition to prevent audio popping
    panner.pan.setTargetAtTime(panValue, audioCtx.currentTime, 0.1);
});
