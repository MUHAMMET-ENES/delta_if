/* UI MANAGER: Handle Scroll Visibility */
const header = document.getElementById('smart-header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Show header if at the very top
    if (currentScrollY < 50) {
        header.classList.remove('nav-hidden');
        header.classList.remove('nav-visible'); // Transparent at top
        return;
    }

    if (currentScrollY > lastScrollY) {
        // Scroll Down -> Hide
        header.classList.add('nav-hidden');
        header.classList.remove('nav-visible');
    } else {
        // Scroll Up -> Show
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
    }
    lastScrollY = currentScrollY;
});
