const generateBtn = document.getElementById("generateDescription");
const submitBtn = document.getElementById("submitListing");   // NEW
const titleInput = document.getElementById("title");
const locationInput = document.getElementById("location");
const countryInput = document.getElementById("country");
const categorySelect = document.getElementById("category");
const descriptionBox = document.getElementById("description");
const messageBox = document.getElementById("aiMessage");

// NEW: the button's normal look, saved once so we can restore it
const IDLE_LABEL = "✨ Generate Description";
const LOADING_LABEL = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generating...`;

// NEW: one function that switches the page in and out of "loading mode"
function setLoading(isLoading) {
    generateBtn.disabled = isLoading;
    submitBtn.disabled = isLoading;
    descriptionBox.readOnly = isLoading;
    generateBtn.innerHTML = isLoading ? LOADING_LABEL : IDLE_LABEL;
    generateBtn.setAttribute("aria-busy", String(isLoading));
}

generateBtn.addEventListener("click", async () => {
    messageBox.textContent = "";

    const title = titleInput.value.trim();
    const location = locationInput.value.trim();
    const country = countryInput.value.trim();
    const category = categorySelect.value
        ? categorySelect.options[categorySelect.selectedIndex].text
        : "";

    if (!title) {
        messageBox.textContent = "Please enter a title first.";
        titleInput.focus();
        return;
    }
    if (!location) {
        messageBox.textContent = "Please enter a location first.";
        locationInput.focus();
        return;
    }

    if (
        descriptionBox.value.trim() &&
        !confirm("This will replace your current description. Continue?")
    ) {
        return;
    }

    setLoading(true);   // CHANGED: replaces the two button lines

    try {
        const response = await fetch("/ai/generate-description", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, location, country, category }),
            signal: AbortSignal.timeout(30000),
        });

        let data = {};
        try {
            data = await response.json();
        } catch (parseError) {
            console.error("Server did not return JSON:", parseError);
        }

        if (!response.ok) {
            messageBox.textContent =
                data.error || "Something went wrong. Please try again.";
            return;
        }

        if (!data.description) {
            messageBox.textContent = "No description was received. Please try again.";
            return;
        }

        descriptionBox.value = data.description;
    } catch (err) {
        console.error(err);

        if (err.name === "TimeoutError") {
            messageBox.textContent =
                "This is taking too long. Please try again in a moment.";
        } else {
            messageBox.textContent =
                "Could not reach the server. Check your connection and try again.";
        }
    } finally {
        setLoading(false);   // CHANGED: replaces the two button lines
    }
});