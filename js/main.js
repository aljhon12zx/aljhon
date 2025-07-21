// Initialize EmailJS with your public key
emailjs.init("zzW2oUFbpP-JqoeS_");

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccess() {
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    if (errorMessage) errorMessage.style.display = 'none';
    if (successMessage) {
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

// Show error message
function showError(message = 'Please fill in all required fields.') {
    const successMessage = document.getElementById('successMessage');
    const errorElement = document.getElementById('errorMessage');
    
    if (successMessage) successMessage.style.display = 'none';
    if (errorElement) {
        errorElement.textContent = `❌ ${message}`;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

// FIXED Contact form submission with correct template parameters
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const name = document.getElementById('name')?.value?.trim() || '';
            const email = document.getElementById('email')?.value?.trim() || '';
            const subject = document.getElementById('subject')?.value?.trim() || '';
            const message = document.getElementById('message')?.value?.trim() || '';
            
            // Validation
            if (!name || !email || !subject || !message) {
                showError('Please fill in all required fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address.');
                return;
            }
            
            // Disable submit button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
            
            // CORRECTED EmailJS template parameters - matching your template exactly
            const templateParams = {
                name: name,                    // {{name}} - matches your template
                title: subject,                // {{title}} - matches your template (using subject as title)
                email: email,                  // {{email}} - matches your template
                message: message               // {{message}} - add this if you have it in template
            };
            
            console.log('Sending email with parameters:', templateParams);
            
            // Send email using EmailJS - ALWAYS include templateParams as 3rd parameter
            emailjs.send('service_b0gqcsa','template_a2tgv8x', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccess();
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    console.error('Error details:', error);
                    
                    // Enhanced error handling
                    if (error.status === 422) {
                        showError('Template variable mismatch. Please check your EmailJS template configuration.');
                    } else if (error.status === 400) {
                        showError('Bad request. Please verify your EmailJS service and template IDs.');
                    } else if (error.status === 401) {
                        showError('Authentication failed. Please check your EmailJS public key.');
                    } else if (error.status === 403) {
                        showError('Access denied. Please check your EmailJS account permissions.');
                    } else if (error.text && error.text.includes('template')) {
                        showError('Template not found. Please verify your template ID.');
                    } else if (error.text) {
                        showError(`Failed to send: ${error.text}`);
                    } else {
                        showError('Failed to send message. Please try again or contact me directly.');
                    }
                })
                .finally(function() {
                    // Re-enable submit button
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    }
                });
        });
    }
});

// Download resume functionality
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a sample resume data
        const resumeContent = `
ALJHON CAANGAY
Full Stack Developer

Contact Information:
Phone: +63 905 7466 197
Email: aljhoncaangay@gmail.com
Location: Philippines
Facebook: Aljhon Caangay

About:
I am a dedicated and results-driven developer with a proven track record of creating 
innovative web solutions. With a keen understanding of both frontend and backend 
technologies, I excel in building scalable applications and delivering value-driven 
solutions that meet both client and business objectives.

Skills:
- HTML (85%)
- CSS (80%)
- JavaScript (75%)
- PHP (70%)
- MySQL (78%)

Languages:
- Tagalog
- English
- Cebuano

Personal Information:
Age: 23 years old
Nationality: Filipino
        `;
        
        // Create and download the resume file
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Aljhon_Caangay_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Add scroll animation to elements
function addScrollAnimation() {
    const elements = document.querySelectorAll('.section');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isVisible = navMenu.style.display === 'flex';
            
            if (isVisible) {
                navMenu.style.display = 'none';
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navMenu.style.display = 'flex';
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            }
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
}

// Handle responsive behavior
function handleResize() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        if (navMenu) {
            navMenu.style.display = 'flex';
            navMenu.style.position = 'static';
            navMenu.style.flexDirection = 'row';
            navMenu.style.background = 'none';
            navMenu.style.boxShadow = 'none';
            navMenu.style.padding = '0';
        }
        if (hamburger) {
            hamburger.style.display = 'none';
        }
    } else {
        if (navMenu) {
            navMenu.style.display = 'none';
        }
        if (hamburger) {
            hamburger.style.display = 'block';
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addScrollAnimation();
    initMobileMenu();
    handleResize();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', handleResize);

// Add smooth page loading
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});