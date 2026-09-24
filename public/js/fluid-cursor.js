window.addEventListener("DOMContentLoaded", () => {
    if (window.SmokyFluid) {
        SmokyFluid.initFluid();
    } else {
        console.error("SmokyFluid not found!");
    }
});