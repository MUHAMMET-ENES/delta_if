/*
 * THE SENSORY FIELD (UPDATED)
 * Auto-initializes on first interaction.
 */

let audioCtx;
let panner;
let audioEl;
let isAudioInit = false;
let isMuted = true;

const toggleBtn = document.getElementById('audio-toggle');
const icon = document.getElementById('audio-icon');

// Init Audio on FIRST user interaction (Click or Scroll)
function unlockAudio() {
    if (isAudioInit) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    panner = audioCtx.createStereoPanner();
    
    audioEl = new Audio('assets/ambient.mp3');
    audioEl.loop = true;
    audioEl.crossOrigin = "anonymous";
    audioEl.volume = 0; // Start at 0 volume for fade in

    const source = audioCtx.createMediaElementSource(audioEl);
    source.connect(panner).connect(audioCtx.destination);

    audioEl.play().then(() => {
        isAudioInit = true;
        // Fade in volume
        fadeInAudio(); 
    }).catch(e => console.log("Audio waiting for interaction..."));

    // Remove listeners once initialized
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('scroll', unlockAudio);
}

function fadeInAudio() {
    let vol = 0;
    const fade = setInterval(() => {
        if (vol < 0.5) { // Max volume 50%
            vol += 0.05;
            audioEl.volume = vol;
        } else {
            clearInterval(fade);
            isMuted = false;
            updateIcon();
        }
    }, 200);
}

// User Manual Toggle
toggleBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent nav jump
    if (!isAudioInit) {
        unlockAudio();
        return;
    }

    if (isMuted) {
        audioEl.play();
        isMuted = false;
    } else {
        audioEl.pause();
        isMuted = true;
    }
    updateIcon();
});

function updateIcon() {
    if (isMuted) {
        icon.classList.remove('ph-speaker-high');
        icon.classList.add('ph-speaker-slash');
    } else {
        icon.classList.remove('ph-speaker-slash');
        icon.classList.add('ph-speaker-high');
    }
}

// Listen for first interactions
window.addEventListener('click', unlockAudio);
window.addEventListener('scroll', unlockAudio);

// Spatial Logic (Same as before)
document.addEventListener('mousemove', (e) => {
    if (!isAudioInit || isMuted) return;
    const width = window.innerWidth;
    const x = e.clientX;
    const panValue = (x / width) * 2 - 1;
    panner.pan.setTargetAtTime(panValue, audioCtx.currentTime, 0.1);
});/*
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
