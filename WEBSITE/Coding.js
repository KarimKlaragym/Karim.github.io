//Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').toLowerCase();
        if (linkHref === currentPage || (linkHref === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        }
    });
});



//Dark mode
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = "Toggle Dark Mode";
    document.body.prepend(toggleButton);

    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
});

//Picture zoom
document.querySelectorAll('.image-content img').forEach(image => {
    image.addEventListener('click', function() {
        const fullScreenImage = document.createElement('div');
        fullScreenImage.classList.add('lightbox');
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        fullScreenImage.appendChild(imgElement);
        document.body.appendChild(fullScreenImage);

        // Close lightbox on click
        fullScreenImage.addEventListener('click', function() {
            document.body.removeChild(fullScreenImage);
        });
    });
});

//Scroll to the top
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.textContent = 'Top';
    scrollToTopButton.classList.add('scroll-top');
    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});

//Feedback or contact us
// Contact Us Modal
document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.getElementById('openModal');
    const modal = document.getElementById('contactModal');
    const closeButton = document.querySelector('.close-button');

    // Open the modal
    openModalButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Close the modal
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form submission with EmailJS
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Send email using EmailJS
        emailjs.send("service_3wfgw0a", "template_hpi5psw", {
            name: name,
            email: email,
            message: message
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert(`Thank you, ${name}. Your message has been sent!`);
            modal.style.display = 'none'; // Close modal on successful submission
            document.getElementById('contactForm').reset(); // Reset form fields
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! Something went wrong. Please try again.');
        });
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("VXB_UyVqt4pHwMfYx"); // Replace with your EmailJS public key
})();
