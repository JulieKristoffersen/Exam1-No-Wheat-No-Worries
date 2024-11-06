import { setupHamburgerMenu } from './ui/hamburger-menu.js';
import { showLoadingIndicator, hideLoadingIndicator } from './ui/loading-indicator.js';

showLoadingIndicator();

window.addEventListener("load", hideLoadingIndicator);

const formElements = {
    form: document.getElementById('contactForm'),
    nameInput: document.getElementById('name'),
    emailInput: document.getElementById('email'),
    subjectInput: document.getElementById('subject'),
    messageInput: document.getElementById('message'),
    nameError: document.getElementById('nameError'),
    emailError: document.getElementById('emailError'),
    subjectError: document.getElementById('subjectError'),
    messageError: document.getElementById('messageError'),
};

const hamburgerElements = {
    hamburger: document.querySelector('.hamburger'),
    navLinks: document.querySelector('.nav-links'),
    closeHamburger: document.querySelector('.close-hamburger'),
};

setupHamburgerMenu(hamburgerElements);

setupFormValidation(formElements);

function setupFormValidation({ form, nameInput, emailInput, subjectInput, messageInput, nameError, emailError, subjectError, messageError }) {
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
