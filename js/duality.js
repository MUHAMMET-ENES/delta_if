const switchBtn = document.getElementById('reality-switch');
const stateAbsence = document.getElementById('state-absence');
const stateExcess = document.getElementById('state-excess');
const title = document.getElementById('dynamic-title');
const root = document.documentElement;

let isExcess = false;

switchBtn.addEventListener('click', () => {
    isExcess = !isExcess;

    if (isExcess) {
        // Switch to Excess
        stateAbsence.classList.remove('active');
        stateAbsence.classList.add('hidden');
        stateExcess.classList.remove('hidden');
        stateExcess.classList.add('active');
        
        switchBtn.innerText = "Switch to Silence";
        title.innerText = "What if it were excessive?";
        
        // CSS Variable Injection for Atmosphere Change
        root.style.setProperty('--color-base', '#f0f0f0'); // Cooler grey
        root.style.setProperty('--color-ink', '#000000'); // Harsher black

    } else {
        // Switch to Absence
        stateExcess.classList.remove('active');
        stateExcess.classList.add('hidden');
        stateAbsence.classList.remove('hidden');
        stateAbsence.classList.add('active');

        switchBtn.innerText = "Switch to Excess";
        title.innerText = "What if it were missing?";
        
        root.style.setProperty('--color-base', '#fdfbf7');
        root.style.setProperty('--color-ink', '#1a1a1a');
    }
});

// Custom Cursor Logic
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor Hover Effects
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2) rotate(0deg)';
        cursor.style.background = 'var(--color-accent)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(45deg)';
        cursor.style.background = 'white';
    });
});
