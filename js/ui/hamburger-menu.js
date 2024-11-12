export const setupHamburgerMenu = (elements) => {
    try {
        if (!elements.hamburger || !elements.navLinks) {
            throw new Error("Missing hamburger or navigation elements.");
        }

        const toggleMenu = (isOpen) => {
            elements.navLinks.classList.toggle('active', isOpen);
            elements.hamburger.innerHTML = isOpen ? '&times;' : '&#9776;';
            elements.hamburger.classList.toggle('is-active', isOpen);
        };

        elements.hamburger.addEventListener('click', () => {
            const isActive = elements.navLinks.classList.contains('active');
            toggleMenu(!isActive);
        });

        document.querySelectorAll('.nav-links a').forEach(item => {
            item.addEventListener('click', (event) => {
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                event.target.classList.add('active');
                toggleMenu(false);
            });
        });
    } catch (error) {
        console.error("Error setting up hamburger menu:", error);
        alert(`Sorry, there was an issue setting up the menu. Please reload the page.`);
    }
};
