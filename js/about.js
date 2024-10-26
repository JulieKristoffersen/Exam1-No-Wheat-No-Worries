import { setupHamburgerMenu } from './ui/hamburger-menu.js';

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        closeHamburger: document.querySelector('.close-hamburger'),
    };

    setupHamburgerMenu(elements);
});