import { setupHamburgerMenu } from './ui/hamburger-menu.js';
import { showLoadingIndicator, hideLoadingIndicator } from './ui/loading-indicator.js';

showLoadingIndicator();

window.addEventListener("load", () => {
    hideLoadingIndicator();

    const hamburgerElements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        closeHamburger: document.querySelector('.close-hamburger')
    };

    if (hamburgerElements.hamburger && hamburgerElements.navLinks && hamburgerElements.closeHamburger) {
        setupHamburgerMenu(hamburgerElements);
    } else {
        console.error("One or more required elements are missing.");
    }
});
