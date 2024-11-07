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

const showError = (errorElement, message) => {
    errorElement.textContent = message;
};

const clearError = (errorElement) => {
    errorElement.textContent = "";
};

function setupFormValidation({ form, nameInput, emailInput, subjectInput, messageInput, nameError, emailError, subjectError, messageError }) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        let isValid = true;

        if (nameInput.value.trim().length <= 5) {
            showError(nameError, "Name must be more than 5 characters long.");
            isValid = false;
        } else {
            clearError(nameError);
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailError, "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError(emailError);
        }

        if (subjectInput.value.trim().length <= 15) {
            showError(subjectError, "Subject must be more than 15 characters long.");
            isValid = false;
        } else {
            clearError(subjectError);
        }

        if (messageInput.value.trim().length <= 25) {
            showError(messageError, "Message must be more than 25 characters long.");
            isValid = false;
        } else {
            clearError(messageError);
        }

        if (isValid) {
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim(),
            };

            alert("Form submitted successfully!");
            form.reset();
        }
    });
}
