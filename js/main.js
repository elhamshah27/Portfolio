/* ============================================
   PORTFOLIO JAVASCRIPT
   Author: Elham Shah
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll to top on page load
    window.scrollTo(0, 0);

    /* ============================================
       LOADING SCREEN
       ============================================ */
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1000);

    /* ============================================
       THEME TOGGLE
       ============================================ */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            // Save theme preference
            const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            
            // Add rotation animation to the toggle button
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    /* ============================================
       SMOOTH SCROLL FOR LOGO
       ============================================ */
    const logoLink = document.getElementById('logoLink');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ============================================
       CUSTOM CURSOR
       ============================================ */
    const cursor = document.getElementById('cursor');

    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });

        // Add hover effect to interactive elements
        document.querySelectorAll('a, button, .project-card, .skill-item').forEach(element => {
            element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    /* ============================================
       TYPING ANIMATION
       ============================================ */
    const typingText = document.getElementById('typing');
    if (typingText) {
        const phrases = [
            'Full-Stack Developer',
            'AI/ML Enthusiast',
            'Mobile App Developer',
            'Problem Solver',
            'Tech Innovator'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    /* ============================================
       NAVBAR SCROLL EFFECTS
       ============================================ */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ============================================
       ACTIVE NAV LINK ON SCROLL
       ============================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    /* ============================================
       SMOOTH SCROLL FOR NAV LINKS
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ============================================
       INTERSECTION OBSERVER FOR ANIMATIONS
       ============================================ */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    /* ============================================
       PARTICLE ANIMATION SYSTEM
       ============================================ */
    const particlesCanvas = document.getElementById('particles-bg');
    if (particlesCanvas) {
        const ctx = particlesCanvas.getContext('2d');
        let particles = [];
        let mouseX = 0;
        let mouseY = 0;

        // Set canvas size
        function resizeCanvas() {
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * particlesCanvas.width;
                this.y = Math.random() * particlesCanvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap around edges
                if (this.x > particlesCanvas.width) this.x = 0;
                if (this.x < 0) this.x = particlesCanvas.width;
                if (this.y > particlesCanvas.height) this.y = 0;
                if (this.y < 0) this.y = particlesCanvas.height;
                
                // Mouse interaction
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    this.x -= (dx / distance) * force * 2;
                    this.y -= (dy / distance) * force * 2;
                }
            }
            
            draw() {
                ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        function initParticles() {
            particles = [];
            const particleCount = window.innerWidth < 768 ? 30 : 50;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        // Animation loop
        function animateParticles() {
            ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
            
            // Draw connections
            particles.forEach((particle, i) => {
                particle.update();
                particle.draw();
                
                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x;
                    const dy = particles[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
            
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // Track mouse position for particles
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
    }

    /* ============================================
       PARALLAX EFFECT FOR BACKGROUND ELEMENTS
       ============================================ */
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const orbs = document.querySelectorAll('.orb');
        
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            shape.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 5;
            orb.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });

    /* ============================================
       COUNTER ANIMATION FOR ACHIEVEMENTS
       ============================================ */
    const counters = document.querySelectorAll('.achievement-number');
    const counterSpeed = 200;
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            let count = 0;
            const increment = target / counterSpeed;
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.ceil(count) + suffix;
                    setTimeout(updateCount, 10);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCount();
        });
    }

    // Check if achievements section is in view
    const achievementsSection = document.getElementById('achievements');
    if (achievementsSection) {
        const achievementsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });
        
        achievementsObserver.observe(achievementsSection);
    }

    /* ============================================
       CONTACT FORM HANDLER
       ============================================ */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Create mailto link with form data
            const subject = `Portfolio Contact from ${formData.name}`;
            const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
            const mailtoLink = `mailto:elhamshah27@yahoo.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span style="position: relative; z-index: 1;">✓ Opening Email Client...</span>';
            submitBtn.style.background = 'var(--accent)';
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
        
        // Add focus effects to form inputs
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }

}); // End DOMContentLoaded
