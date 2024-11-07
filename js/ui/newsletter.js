document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    try {
        event.preventDefault(); 

        const confirmationMessage = document.getElementById('confirmation-message');

        if (!confirmationMessage) {
            throw new Error("Confirmation message element is missing.");
        }

        confirmationMessage.style.display = 'block';

        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 3000);

        event.target.reset();
    } catch (error) {
        console.error("Error during form submission:", error);
        alert("Sorry, an error occurred while submitting the form. Please try again.");
    }
});
