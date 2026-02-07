/* AUDIO ENGINE */
let audioCtx;
let audioEl;
let isPlaying = false;

const btn = document.getElementById('audio-toggle');
const icon = document.getElementById('audio-icon');

btn.addEventListener('click', () => {
    if (!audioCtx) {
        // First Interaction: Init
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        
        audioEl = new Audio('assets/ambient.mp3');
        audioEl.loop = true;
        audioEl.crossOrigin = "anonymous";
        
        // Connect to Output
        const source = audioCtx.createMediaElementSource(audioEl);
        source.connect(audioCtx.destination);
    }

    if (isPlaying) {
        audioEl.pause();
        icon.className = "ph ph-speaker-slash";
        btn.classList.remove('active');
        isPlaying = false;
    } else {
        // Resume context if suspended (browser policy)
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        audioEl.play();
        icon.className = "ph ph-speaker-high";
        btn.classList.add('active'); // Presses the key down visually
        isPlaying = true;
    }
});
