document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = 'block';

    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 3000);

    event.target.reset();
});
