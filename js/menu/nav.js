export function initMenu(hamburger, navLinks, closeHamburger) {
    function toggleMenu(isOpen) {
        if (isOpen) {
            navLinks.classList.add('active');
            hamburger.innerHTML = '&times;';
        } else {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '&#9776;';
        }
        hamburger.classList.toggle('is-active', isOpen);
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            toggleMenu(!isActive);
        });

        if (closeHamburger) {
            closeHamburger.addEventListener('click', () => toggleMenu(false));
        }

        document.querySelectorAll('.nav-links a').forEach(item => {
            item.addEventListener('click', () => toggleMenu(false));
        });
    }
}
