// js/ui/hamburger-menu.js

export const setupHamburgerMenu = (elements) => {
    const toggleMenu = (isOpen) => {
        elements.navLinks.classList.toggle('active', isOpen);
        elements.hamburger.innerHTML = isOpen ? '&times;' : '&#9776;';
        elements.hamburger.classList.toggle('is-active', isOpen);
    };

    if (!elements.hamburger || !elements.navLinks) return;
    
    elements.hamburger.addEventListener('click', () => {
        const isActive = elements.navLinks.classList.contains('active');
        toggleMenu(!isActive);
    });

    elements.closeHamburger?.addEventListener('click', () => toggleMenu(false));

    document.querySelectorAll('.nav-links a').forEach(item => {
        item.addEventListener('click', () => toggleMenu(false));
    });
};
