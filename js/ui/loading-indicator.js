export function showLoadingIndicator() {
    try {
        const loadingIndicator = document.createElement("div");
        loadingIndicator.id = "loading-indicator";
        loadingIndicator.innerHTML = `
            <div class="spinner"></div>
        `;
        document.body.appendChild(loadingIndicator);
    } catch (error) {
        console.error("Error displaying loading indicator:", error);
        alert("Sorry, there was an issue displaying the loading indicator.");
    }
}

export function hideLoadingIndicator() {
    try {
        const loadingIndicator = document.getElementById("loading-indicator");
        if (loadingIndicator) {
            loadingIndicator.style.display = "none";
        } else {
            throw new Error("Loading indicator not found.");
        }
    } catch (error) {
        console.error("Error hiding loading indicator:", error);
        alert("Sorry, there was an issue hiding the loading indicator.");
    }
}
