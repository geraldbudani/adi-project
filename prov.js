const typingText = document.querySelector('.typing-text');
const text = "Welcome to Peter's Photographic Website!";
let index = 0;
const typingSpeed = 100; // Milliseconds

function type() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, typingSpeed);
    }
}
type();

// Select the Home link and other links separately
const homeLink = document.querySelector('.navbar a[href="#home"]');
const otherLinks = document.querySelectorAll('.navbar a:not([href="#home"])');

// Smooth scroll for Home link (scroll to the very top)
homeLink.addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: 'smooth' // Smooth scrolling effect
    });
});

// Smooth scroll for other links
document.addEventListener('DOMContentLoaded', function() {
    otherLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) { // Ensure the target element exists
                window.scrollTo({
                    top: targetElement.offsetTop - 96, // Scroll to one inch above the section
                    behavior: 'smooth' // Smooth scrolling effect
                });
            } else {
                console.error('Target element not found: ' + targetId);
            }
        });
    });
});
