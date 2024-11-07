import { setupHamburgerMenu } from './ui/hamburger-menu.js';
import { showLoadingIndicator, hideLoadingIndicator } from './ui/loading-indicator.js';

showLoadingIndicator();

window.addEventListener("load", hideLoadingIndicator);

window.addEventListener("error", (event) => {
    console.error("Global error caught:", event.error);
    alert("An unexpected error occurred. Please try again later.");
});

try {
    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
    };

    if (!elements.hamburger || !elements.navLinks) {
        throw new Error("Required elements not found.");
    }

    setupHamburgerMenu(elements);
} catch (error) {
    console.error('An error occurred while loading page elements:', error);
    alert('Sorry, there was an issue loading the page elements. Please try again later.');
}
