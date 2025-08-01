// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature, .social-card, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.gradient-text');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add particle effect to hero section
    createParticles();

    // Add scroll progress indicator
    createScrollProgress();
});

// Create floating particles in hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        hero.appendChild(particle);
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add CSS for loading animation
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// Add mobile menu functionality
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        navbar.appendChild(mobileMenuBtn);
        
        // Add mobile menu styles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                .nav-links {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    right: 0;
                    background: rgba(10, 10, 10, 0.98);
                    backdrop-filter: blur(10px);
                    flex-direction: column;
                    padding: 2rem;
                    transform: translateY(-100%);
                    transition: transform 0.3s ease;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .nav-links.active {
                    transform: translateY(0);
                }
                
                .nav-links a {
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .nav-links a:last-child {
                    border-bottom: none;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Initialize mobile menu
createMobileMenu();

// Handle window resize
window.addEventListener('resize', createMobileMenu);

// Add cursor trail effect
function createCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// Uncomment the line below to enable cursor trail effect
// createCursorTrail(); 