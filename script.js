// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Prevent sections from overlapping
    const hero = document.querySelector('.hero');
    const calculator = document.querySelector('.calculator');
    
    if (hero && calculator) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const calculatorTop = calculator.offsetTop;
        const currentScrollBottom = currentScroll + window.innerHeight;
        
        // Ensure proper layering - calculator should be above hero when scrolling
        if (currentScrollBottom > heroBottom - 50) {
            calculator.style.zIndex = '3';
            hero.style.zIndex = '1';
        } else {
            calculator.style.zIndex = '2';
            hero.style.zIndex = '1';
        }
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .feature-item');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('scroll-reveal', 'revealed');
        }
    });
};

// Initial check
revealOnScroll();

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// Form submission
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message
        alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    });
}

// Add animation delay to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add animation delay to portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    };
    
    updateCounter();
};

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const originalText = statNumber.textContent;
            const hasPlus = originalText.includes('+');
            const hasPercent = originalText.includes('%');
            const number = parseInt(originalText);
            
            // Reset to 0
            statNumber.textContent = '0' + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            
            // Animate
            setTimeout(() => {
                animateStats(statNumber, number, hasPlus, hasPercent);
            }, 200);
            
            // Unobserve after animation
            statsObserver.unobserve(statNumber);
        }
    });
}, { threshold: 0.5 });

// Observe all stat numbers
statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Animate stats function
function animateStats(element, target, hasPlus, hasPercent) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const update = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            requestAnimationFrame(update);
        } else {
            element.textContent = target + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
        }
    };
    
    update();
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Add hover effect to cards
document.querySelectorAll('.service-card, .portfolio-item, .info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

const activateNavOnScroll = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', activateNavOnScroll);

// Calculator functionality
const optionCards = document.querySelectorAll('.option-card');
const areaInput = document.getElementById('area-input');
const selectedTypeEl = document.getElementById('selected-type');
const selectedAreaEl = document.getElementById('selected-area');
const pricePerMeterEl = document.getElementById('price-per-meter');
const totalPriceEl = document.getElementById('total-price');

let currentType = 'apartment';
let currentPrice = 7000;
let currentArea = 0;

// Function to format number with spaces
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Function to calculate total price
function calculateTotal() {
    if (currentArea > 0) {
        const total = currentArea * currentPrice;
        totalPriceEl.textContent = formatNumber(total) + ' ₽';
        selectedAreaEl.textContent = currentArea + ' м²';
    } else {
        totalPriceEl.textContent = '0 ₽';
        selectedAreaEl.textContent = '— м²';
    }
}

// Option card click handler
optionCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        optionCards.forEach(c => {
            c.classList.remove('active');
            c.style.transform = 'translateZ(0)';
        });
        
        // Add active class to clicked card
        this.classList.add('active');
        this.style.transform = 'translateZ(0)';
        
        // Get data from card
        currentType = this.getAttribute('data-type');
        currentPrice = parseInt(this.getAttribute('data-price'));
        
        // Update display
        selectedTypeEl.textContent = currentType === 'apartment' ? 'Квартира' : 'Дом';
        pricePerMeterEl.textContent = formatNumber(currentPrice) + ' ₽';
        
        // Recalculate total
        calculateTotal();
    });
});

// Stabilize calculator cards on scroll
let ticking = false;
function stabilizeCalculator() {
    if (!ticking) {
        requestAnimationFrame(function() {
            optionCards.forEach(card => {
                if (card.classList.contains('active')) {
                    card.style.transform = 'translateZ(0)';
                } else {
                    card.style.transform = 'translateZ(0)';
                }
            });
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', stabilizeCalculator, { passive: true });

// Area input handler
if (areaInput) {
    areaInput.addEventListener('input', function() {
        currentArea = parseFloat(this.value) || 0;
        calculateTotal();
    });
}

// Handle window resize for better responsive behavior
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculate hero height if needed
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth <= 768) {
            hero.style.minHeight = window.innerHeight + 'px';
        }
        
        // Close mobile menu on resize
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle && window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }, 250);
});

// Initialize hero height on load
window.addEventListener('load', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.minHeight = window.innerHeight + 'px';
    }
});

// Prevent zoom on double tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Handle image loading errors
document.addEventListener('DOMContentLoaded', function() {
    const teamImage = document.querySelector('.about__team-image');
    if (teamImage) {
        teamImage.addEventListener('error', function() {
            // If image fails to load, show a placeholder
            this.style.background = 'linear-gradient(135deg, #2a2520 0%, #1a1510 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = 'var(--color-text-secondary)';
            this.style.fontSize = '18px';
            this.style.textAlign = 'center';
            this.alt = 'Изображение команды KINGROOM';
            this.src = ''; // Clear broken src
        });
        
        // Check if image loaded successfully
        if (teamImage.complete && teamImage.naturalHeight === 0) {
            teamImage.dispatchEvent(new Event('error'));
        }
    }
});

// Initialize AOS or any animation library if needed
console.log('KINGROOM website loaded successfully!');

