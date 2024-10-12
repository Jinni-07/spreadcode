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
            link.classList.remove('text-[#ffffffc3]', 'text-[#ffffffcb]'); // Remove other color classes
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