export function showLoadingIndicator() {
    const loadingIndicator = document.createElement("div");
    loadingIndicator.id = "loading-indicator";
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
    `;
    document.body.appendChild(loadingIndicator);
}

export function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
        loadingIndicator.style.display = "none";
    }
}
