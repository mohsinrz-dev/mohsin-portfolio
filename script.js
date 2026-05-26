// Portfolio Website JavaScript

// Website loaded message
console.log("Website Loaded Successfully");

// Button popup function
function showMessage() {
    alert("Welcome to Mohsin's Portfolio Website!");
}

// Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Simple fade animation on page load
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
})
