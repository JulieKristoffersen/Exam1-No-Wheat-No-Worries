document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (name.value.trim().length <= 5) {
            nameError.textContent = 'Name must be more than 5 characters long.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        const subject = document.getElementById('subject');
        const subjectError = document.getElementById('subjectError');
        if (subject.value.trim().length <= 15) {
            subjectError.textContent = 'Subject must be more than 15 characters long.';
            isValid = false;
        } else {
            subjectError.textContent = '';
        }

        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (message.value.trim().length <= 25) {
            messageError.textContent = 'Message must be more than 25 characters long.';
            isValid = false;
        } else {
            messageError.textContent = '';
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset(); 
        }
    });
});
