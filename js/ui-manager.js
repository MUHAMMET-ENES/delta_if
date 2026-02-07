/*
 * UI MANAGER
 * Handles Scroll Direction & Header Visibility
 */

const header = document.getElementById('smart-header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Determine direction
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling DOWN -> Hide Header
        header.classList.add('nav-hidden');
        header.classList.remove('nav-visible');
    } else {
        // Scrolling UP -> Show Header
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
    }

    // Special case: At very top, remove background
    if (currentScrollY < 10) {
        header.classList.remove('nav-visible');
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
    }

    lastScrollY = currentScrollY;
});
