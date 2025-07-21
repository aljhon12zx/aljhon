 // Initialize EmailJS with your public key
      emailjs.init("zzW2oUFbpP-JqoeS_");

      // Email validation function
      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      // Show success message
      function showSuccess() {
        const errorMessage = document.getElementById("errorMessage");
        const successMessage = document.getElementById("successMessage");

        if (errorMessage) errorMessage.style.display = "none";
        if (successMessage) {
          successMessage.style.display = "block";
          setTimeout(() => {
            successMessage.style.display = "none";
          }, 5000);
        }
      }

      // Show error message
      function showError(message = "Please fill in all required fields.") {
        const successMessage = document.getElementById("successMessage");
        const errorElement = document.getElementById("errorMessage");

        if (successMessage) successMessage.style.display = "none";
        if (errorElement) {
          errorElement.textContent = `❌ ${message}`;
          errorElement.style.display = "block";
          setTimeout(() => {
            errorElement.style.display = "none";
          }, 5000);
        }
      }

      // FIXED Contact form submission with correct template parameters
      document.addEventListener("DOMContentLoaded", function () {
        const contactForm = document.getElementById("contactForm");

        if (contactForm) {
          contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = document.getElementById("submitBtn");
            const name = document.getElementById("name")?.value?.trim() || "";
            const email = document.getElementById("email")?.value?.trim() || "";
            const subject =
              document.getElementById("subject")?.value?.trim() || "";
            const message =
              document.getElementById("message")?.value?.trim() || "";

            // Validation
            if (!name || !email || !subject || !message) {
              showError("Please fill in all required fields.");
              return;
            }

            if (!isValidEmail(email)) {
              showError("Please enter a valid email address.");
              return;
            }

            // Disable submit button
            if (submitBtn) {
              submitBtn.disabled = true;
              submitBtn.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            // CORRECTED EmailJS template parameters - matching your template exactly
            const templateParams = {
              name: name, // {{name}} - matches your template
              title: subject, // {{title}} - matches your template (using subject as title)
              email: email, // {{email}} - matches your template
              message: message, // {{message}} - add this if you have it in template
            };

            console.log("Sending email with parameters:", templateParams);

            // Send email using EmailJS - ALWAYS include templateParams as 3rd parameter
            emailjs
              .send("service_b0gqcsa", "template_a2tgv8x", templateParams)
              .then(function (response) {
                console.log("SUCCESS!", response.status, response.text);
                showSuccess();
                contactForm.reset();
              })
              .catch(function (error) {
                console.error("FAILED...", error);
                console.error("Error details:", error);

                // Enhanced error handling
                if (error.status === 422) {
                  showError(
                    "Template variable mismatch. Please check your EmailJS template configuration."
                  );
                } else if (error.status === 400) {
                  showError(
                    "Bad request. Please verify your EmailJS service and template IDs."
                  );
                } else if (error.status === 401) {
                  showError(
                    "Authentication failed. Please check your EmailJS public key."
                  );
                } else if (error.status === 403) {
                  showError(
                    "Access denied. Please check your EmailJS account permissions."
                  );
                } else if (error.text && error.text.includes("template")) {
                  showError(
                    "Template not found. Please verify your template ID."
                  );
                } else if (error.text) {
                  showError(`Failed to send: ${error.text}`);
                } else {
                  showError(
                    "Failed to send message. Please try again or contact me directly."
                  );
                }
              })
              .finally(function () {
                // Re-enable submit button
                if (submitBtn) {
                  submitBtn.disabled = false;
                  submitBtn.innerHTML =
                    '<i class="fas fa-paper-plane"></i> Send Message';
                }
              });
          });
        }
      });

      document.addEventListener("DOMContentLoaded", function () {
        const downloadBtn = document.getElementById("downloadBtn");

        downloadBtn.addEventListener("click", function (e) {
          e.preventDefault();

          // Create a temporary link element
          const link = document.createElement("a");
          link.href = "pdf/My_Resume.pdf";
          link.download = "Aljhon_Resume.pdf"; // This will be the downloaded filename

          // Trigger download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      });

      // Navbar scroll effect
      window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
          if (window.scrollY > 50) {
            navbar.style.background = "rgba(255, 255, 255, 0.98)";
            navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
          } else {
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.boxShadow = "none";
          }
        }
      });

      // Add scroll animation to elements
      function addScrollAnimation() {
        const elements = document.querySelectorAll(".section");

        const scrollObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
              }
            });
          },
          { threshold: 0.1 }
        );

        elements.forEach((element) => {
          element.style.opacity = "0";
          element.style.transform = "translateY(30px)";
          element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          scrollObserver.observe(element);
        });
      }

      
      // Initialize everything when DOM is loaded
      document.addEventListener("DOMContentLoaded", function () {
        addScrollAnimation();
        initMobileMenu();
        handleResize();

        // Add loading animation
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
          document.body.style.opacity = "1";
        }, 100);
      });

      // Handle window resize
      window.addEventListener("resize", handleResize);

      // Add smooth page loading
      window.addEventListener("load", function () {
        document.body.classList.add("loaded");
      });

      // Typing Animation
      document.addEventListener("DOMContentLoaded", function () {
        const typedTextElement = document.getElementById("typed-text");

        // Array of words to cycle through
        const words = ["PROGRAMMER", "WEB DEVELOPER", "FULL STACK DEVELOPER"];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function typeWriter() {
          const currentWord = words[wordIndex];

          if (isDeleting) {
            // Remove characters
            typedTextElement.textContent = currentWord.substring(
              0,
              charIndex - 1
            );
            charIndex--;
            typeSpeed = 50; // Faster when deleting
          } else {
            // Add characters
            typedTextElement.textContent = currentWord.substring(
              0,
              charIndex + 1
            );
            charIndex++;
            typeSpeed = 150; // Normal typing speed
          }

          // If word is complete
          if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            typeSpeed = 2000;
            isDeleting = true;
          } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before starting new word
          }

          setTimeout(typeWriter, typeSpeed);
        }

        // Start the typing animation
        typeWriter();
      });

     // Complete Mobile Navigation System
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Initialize mobile menu functionality
    function initMobileMenu() {
        if (hamburger && navMenu) {
            // Toggle mobile menu
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                // Change hamburger icon
                const icon = hamburger.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            });

            // Close menu when clicking on nav links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        closeMenu();
                    }
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    closeMenu();
                }
            });
        }
    }

    // Close mobile menu function
    function closeMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.className = 'fas fa-bars';
    }

    // Handle responsive behavior
    function handleResize() {
        if (window.innerWidth > 768) {
            // Desktop view - reset menu
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href;
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Initialize all functions
    initMobileMenu();
    initSmoothScrolling();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Initial resize check
    handleResize();
});