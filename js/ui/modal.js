export const setupModal = (postImage, modalElements) => {
    const { modal, modalImage, caption, closeModal } = modalElements;

    postImage.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImage.src = postImage.src;
        caption.innerHTML = postImage.alt;
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};
