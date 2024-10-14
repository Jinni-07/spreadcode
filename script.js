const canvas = document.getElementById('pentagonCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth; // Set canvas width to window width
canvas.height = window.innerHeight; // Set canvas height to window height

const pentagons = [];
const numberOfPentagons = 90; // Number of pentagons to draw
const maxRadius = 10; // Maximum radius when hovered
const hoverDistance = 50; // Increased distance for hover effect
const blinkDuration = 500; // Duration for each blink in milliseconds
const blinkInterval = 2000; // Time interval before the next blink in milliseconds

// Function to create a random pentagon
function createPentagon(x, y, radius, opacity) {
    return {
        x,
        y,
        radius,
        originalRadius: radius, // Store original radius
        opacity,
        dx: Math.random() * 0.5 - 0.25, // Small horizontal motion
        dy: Math.random() * 0.5 - 0.25, // Small vertical motion
        blinking: false, // Flag to indicate if the pentagon is blinking
        blinkTimer: 0, // Timer to track blink duration
        blinkDirection: -1 // -1 for decreasing opacity, 1 for increasing
    };
}

// Generate random pentagons
for (let i = 0; i < numberOfPentagons; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 4 + 1; // Radius between 1 and 5
    const opacity = Math.random() * 0.5 + 0.5; // Opacity between 0.5 and 1
    pentagons.push(createPentagon(x, y, radius, opacity));
}

// Function to draw a pentagon
function drawPentagon(x, y, radius, opacity) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));

    for (let i = 1; i <= 5; i++) {
        ctx.lineTo(x + radius * Math.cos((i * 2 * Math.PI) / 5), y + radius * Math.sin((i * 2 * Math.PI) / 5));
    }

    ctx.closePath();
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; // White color with varying opacity
    ctx.fill();
    ctx.restore();
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    pentagons.forEach(pentagon => {
        // Handle blinking logic
        if (pentagon.blinking) {
            pentagon.blinkTimer += 16; // Increment the timer (approx. 60 FPS)

            // Calculate the new opacity based on the blink timer
            if (pentagon.blinkDirection === -1) {
                pentagon.opacity -= 0.02; // Decrease opacity
                if (pentagon.opacity <= 0) {
                    pentagon.blinkDirection = 1; // Change direction to increase opacity
                }
            } else {
                pentagon.opacity += 0.02; // Increase opacity
                if (pentagon.opacity >= pentagon.originalRadius) {
                    pentagon.blinkDirection = -1; // Change direction to decrease opacity
                    pentagon.blinking = false; // Stop blinking after reaching original opacity
                    // Schedule the next pentagon to blink
                    setTimeout(scheduleNextBlink, blinkInterval); // Schedule next blink
                }
            }
        }

        drawPentagon(pentagon.x, pentagon.y, pentagon.radius, pentagon.opacity);

        // Update position for motion
        pentagon.x += pentagon.dx;
        pentagon.y += pentagon.dy;

        // Bounce off the edges
        if (pentagon.x + pentagon.radius > canvas.width || pentagon.x - pentagon.radius < 0) {
            pentagon.dx *= -1;
        }
        if (pentagon.y + pentagon.radius > canvas.height || pentagon.y - pentagon.radius < 0) {
            pentagon.dy *= -1;
        }
    });

    requestAnimationFrame(animate); // Repeat animation
}

// Function to schedule the next blink
function scheduleNextBlink() {
    // Find a random pentagon to blink
    const availablePentagons = pentagons.filter(p => !p.blinking);
    if (availablePentagons.length > 0) {
        const pentagonToBlink = availablePentagons[Math.floor(Math.random() * availablePentagons.length)];
        pentagonToBlink.blinking = true; // Start blinking
        pentagonToBlink.opacity = pentagonToBlink.originalRadius; // Reset opacity to original for the next blink
        pentagonToBlink.blinkDirection = -1; // Start decreasing opacity
    }
}

// Mouse move event to increase size of pentagons
canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    pentagons.forEach(pentagon => {
        // Calculate distance between mouse and pentagon center
        const distX = mouseX - pentagon.x;
        const distY = mouseY - pentagon.y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Check if mouse is within hover distance
        if (distance < hoverDistance) {
            pentagon.radius = maxRadius; // Increase size to max radius
        } else {
            pentagon.radius = pentagon.originalRadius; // Reset to original radius
        }
    });
});

// Start the first blink after some time
setTimeout(scheduleNextBlink, blinkInterval);
animate(); // Start animation





let menu = document.querySelector('#menu');
let ul = document.querySelector('#ul');

menu.addEventListener('click', () => {
    if (ul.style.display === 'flex') {
        ul.style.display = 'none';
        menu.src = 'menu.svg';
    } else {
        ul.style.display = 'flex';
        menu.src = 'close.svg';
    }
});

window.addEventListener('scroll', () => {
    // Get all the links
    const links = document.querySelectorAll('a[href^="#"]');

    // Loop through the links
    links.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if the section is in the viewport
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            // Set the active section color
            link.classList.add('text-white'); // Active color
            link.classList.remove('text-[#ffffffc3]'); // Remove other color classes
        } else {
            // Reset the colors for non-active sections
            link.classList.remove('text-white'); // Remove active color
            link.classList.add('text-[#ffffffc3]'); // Re-add default color for Services link
        }
    });
});

// Smooth scrolling implementation for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        const targetId = this.getAttribute('href'); // Get the target section ID
        const targetSection = document.querySelector(targetId); // Select the target section

        // Smooth scroll to the target section
        targetSection.scrollIntoView({
            behavior: 'smooth' // Use smooth scrolling
        });
    });
});

