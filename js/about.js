import { setupHamburgerMenu } from './ui/hamburger-menu.js';
import { showLoadingIndicator, hideLoadingIndicator } from './ui/loading-indicator.js';

showLoadingIndicator();

window.addEventListener("load", hideLoadingIndicator);

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
    };

    setupHamburgerMenu(elements); 
});
