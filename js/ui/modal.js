export const setupModal = (postImage, modalElements) => {
    try {
        const { modal, modalImage, caption, closeModal } = modalElements;

        if (!modal || !modalImage || !caption || !closeModal) {
            throw new Error("Modal elements are missing or undefined.");
        }

        postImage.addEventListener('click', () => {
            try {
                modal.style.display = 'block';
                modalImage.src = postImage.src;
                caption.innerHTML = postImage.alt;
            } catch (error) {
                console.error("Error opening modal:", error);
                alert("Sorry, an error occurred while opening the image.");
            }
        });

        closeModal.addEventListener('click', () => {
            try {
                modal.style.display = 'none';
            } catch (error) {
                console.error("Error closing modal:", error);
                alert("Sorry, an error occurred while closing the image.");
            }
        });

        window.addEventListener('click', (event) => {
            try {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            } catch (error) {
                console.error("Error handling window click for modal:", error);
                alert("Sorry, an error occurred while closing the modal.");
            }
        });
    } catch (error) {
        console.error("Error setting up modal:", error);
        alert("Sorry, there was an issue setting up the image modal.");
    }
};
