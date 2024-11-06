import { setupHamburgerMenu } from './ui/hamburger-menu.js';
import { showLoadingIndicator, hideLoadingIndicator } from './ui/loading-indicator.js';

showLoadingIndicator();

window.addEventListener("load", hideLoadingIndicator);

document.addEventListener('DOMContentLoaded', () => {
    setupFormValidation();

    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        closeHamburger: document.querySelector('.close-hamburger')
    };
    setupHamburgerMenu(elements);
});

function setupFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        if (nameInput.value.trim().length <= 5) {
            nameError.textContent = "Name must be more than 5 characters long.";
            isValid = false;
        } else {
            nameError.textContent = "";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        if (subjectInput.value.trim().length <= 15) {
            subjectError.textContent = "Subject must be more than 15 characters long.";
            isValid = false;
        } else {
            subjectError.textContent = "";
        }

        if (messageInput.value.trim().length <= 25) {
            messageError.textContent = "Message must be more than 25 characters long.";
            isValid = false;
        } else {
            messageError.textContent = "";
        }

        if (isValid) {
            alert("Form submitted successfully!");
            form.reset();
        }
    });
}
