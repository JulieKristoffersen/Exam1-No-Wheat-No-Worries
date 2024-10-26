import { setupHamburgerMenu } from './ui/hamburger-menu.js';

document.addEventListener('DOMContentLoaded', () => {
    // Form validation logic
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;
        // Validation code for each input field here...
    });

    // Hamburger menu setup
    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        closeHamburger: document.querySelector('.close-hamburger')
    };

    setupHamburgerMenu(elements);
});

