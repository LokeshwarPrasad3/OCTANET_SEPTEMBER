//Script used for : Responsive Navigation Menu with Popup Animation and Smooth Scrolling

// Get references to elements
const checkbox = document.getElementById("click");
const ulElement = document.querySelector("ul");
const menu_button = document.getElementById('menu_button');

// Toggle popup visibility when menu button is clicked
function togglePopup() {
    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
        ulElement.style.left = '0'; // Show the popup
        console.log("Popup opened");
    } else {
        ulElement.style.left = '100%'; // Hide the popup
        console.log("Popup closed");
    }
}

// Add event listener to menu button
menu_button.addEventListener('click', togglePopup);

// Handle navigation links inside the popup menu
const list = document.querySelectorAll('.nav-link');
list.forEach((element) => {
    element.addEventListener('click', function () {
        document.getElementById("click").checked = false; // Uncheck the checkbox
        ulElement.style.left = '0'; // Hide the popup
        location.href = `#${element.value}`; // Scroll to the clicked section
    })
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Close popup and uncheck checkbox when navigation link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(navLink => {
    navLink.addEventListener('click', () => {
        ulElement.style.left = '100%'; // Hide the popup
        checkbox.checked = false; // Uncheck the checkbox
        console.log("Popup closed");
    });
});