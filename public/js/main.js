// Debounce function to limit how often adjustFontSize is called
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Adjust font size to screen
function adjustFontSize() {
    const element = document.getElementById("twhead");
    const parentWidth = window.innerWidth;
    let fontSize = parseFloat(window.getComputedStyle(element).getPropertyValue('font-size'));

    // Safety measure to prevent reducing the font size too much
    const minFontSize = 10;

    // Check if the element's scrollWidth is larger than the parent's width
    while (element.scrollWidth > parentWidth && fontSize > minFontSize) {
        fontSize--;
        element.style.fontSize = fontSize + 'px';
    }
}

// Debounce the resize event so it doesn't trigger too frequently
const debouncedResize = debounce(adjustFontSize, 150);

// Adjust font size when the page loads and when the window resizes
window.onload = adjustFontSize;
window.onresize = debouncedResize;

// Typing Effect
const phrases = [
    "SELECT * FROM dbo.Work_History"
];

let currentPhrase = 0;
let currentChar = 0;
const typewriterElement = document.getElementById("twjs");
const typingSpeed = 100; // Adjust typing speed here

function typePhrase() {
    const phrase = phrases[currentPhrase];
    if (currentChar < phrase.length) {
        typewriterElement.textContent = phrase.substring(0, currentChar + 1); // Show next char
        currentChar++;
        setTimeout(typePhrase, typingSpeed);
    } else {
        setTimeout(() => {
            currentChar = 0;
            currentPhrase = (currentPhrase + 1) % phrases.length; // Loop through phrases
            typePhrase();
        }, 30000); // Pause before typing the next phrase
    }
}

// Start typing the first phrase
typePhrase();