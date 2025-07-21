  // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Skills animation
        function animateSkills() {
            const skillBars = document.querySelectorAll('.progress-fill');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 500);
            });
        }

        // Intersection Observer for skills animation
        const skillsSection = document.querySelector('#skills');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(skillsSection);
                }
            });
        });
        observer.observe(skillsSection);

        // Contact form handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                document.getElementById('errorMessage').style.display = 'block';
                document.getElementById('successMessage').style.display = 'none';
                return;
            }
            
            // Simulate form submission
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form
            this.reset();
            
            // In a real application, you would send this data to your server
            console.log('Form submitted:', { name, email, subject, message });
        });

        // Resume download
        document.getElementById('downloadBtn').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a sample resume content
            const resumeContent = `
ALJHON CAANGAY
Email: aljhoncaangay@gmail.com
Phone: +63 905 7466 197
Location: Philippines

SUMMARY
Dedicated Full Stack Developer with experience in web development and customer service. 
Passionate about creating innovative digital solutions and delivering exceptional results.

TECHNICAL SKILLS
- HTML/CSS: 80-85%
- JavaScript: 75%
- PHP: 70%
- MySQL: 78%

EXPERIENCE
Sales Agent - PowerLinx Agency (2019-2020)
Sales Agent - Tres Alas Corp. (2020-2021)
Ticket Agent - Rose Travel And Tours (2022-2023)

EDUCATION
Senior High School - West Prime Horizon Institute Inc. (2019-Present)
High School - Norberta Guillar Memorial National High School (2013-2017)
Elementary - Nazareth Elementary School (2007-2012)

LANGUAGES
Tagalog, English, Cebuano
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

        // Typing animation
        const texts = ['PROGRAMMER', 'WEB DEVELOPER', 'FULL STACK DEVELOPER'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedElement = document.getElementById('typed-text');

        function typeAnimation() {
            const currentText = texts[textIndex];
            
            if (!isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(typeAnimation, 1500);
                    return;
                }
            } else {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
            }
            
            setTimeout(typeAnimation, isDeleting ? 100 : 150);
        }

        // Start typing animation
        typeAnimation();

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.skill-item, .contact-item, .about-text').forEach(el => {
            scrollObserver.observe(el);
        });
