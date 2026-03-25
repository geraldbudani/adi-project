const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let currentSlide = 0;
const slideWidth = slides[0].getBoundingClientRect().width;
const intervalTime = 3000; // Change slides every 3 seconds

// Arrange the slides next to each other
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

// Function to move to the next slide
function moveToSlide(currentSlideIndex) {
    track.style.transform = 'translateX(-' + slideWidth * currentSlideIndex + 'px)';
}

// Function to move to the next slide (with auto-rotation)
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    moveToSlide(currentSlide);
}

// Function to move to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    moveToSlide(currentSlide);
}

// Automatically switch slides every 3 seconds
setInterval(nextSlide, intervalTime);