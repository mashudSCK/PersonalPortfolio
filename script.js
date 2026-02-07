/**
 * Personal Portfolio - Interactive JavaScript
 * Handles animations, navigation, and interactive elements
 */

// =============================================================================
// DOM Elements
// =============================================================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const themeToggle = document.getElementById('themeToggle');

// =============================================================================
// Theme Management
// =============================================================================

/**
 * Get the system's preferred color scheme
 */
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get the current theme (user preference or system preference)
 */
function getCurrentTheme() {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || getSystemTheme();
}

/**
 * Apply theme to the document
 */
function applyTheme(theme, savePreference = true) {
    if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    if (savePreference) {
        localStorage.setItem('theme', theme);
    }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

/**
 * Initialize theme on page load
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // User has a saved preference
        applyTheme(savedTheme, false);
    } else {
        // Default to light mode on first visit
        applyTheme('light', false);
        
        // Listen for system theme changes (only if user hasn't set preference)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only apply system theme if user hasn't set a preference
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light', false);
            }
        });
    }
}

// =============================================================================
// Navigation
// =============================================================================

/**
 * Handle navbar scroll effect
 */
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

/**
 * Close mobile menu when clicking a link
 */
function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// =============================================================================
// Smooth Scroll
// =============================================================================

/**
 * Smooth scroll to anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// =============================================================================
// Intersection Observer for Animations
// =============================================================================

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    // Scroll-reveal animations intentionally disabled.
}

/**
 * Animate skill progress bars
 */
function animateSkillBars(container) {
    const progressBars = container.querySelectorAll('.skill-progress');
    
    progressBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, index * 100);
    });
}

// =============================================================================
// Card Tilt Effect
// =============================================================================

/**
 * Initialize subtle tilt effect on project cards
 */
function initCardTilt() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = this;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
}

function resetTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
}


// =============================================================================
// Contact Form
// =============================================================================

/**
 * Handle contact form submission
 */
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const formMessage = document.getElementById('form-message');
    const originalBtnContent = submitBtn.innerHTML;

    // Hide any existing messages
    formMessage.className = 'form-message';
    formMessage.textContent = '';

    // Show loading state
    submitBtn.innerHTML = `
        <span>Sending...</span>
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
            </path>
        </svg>
    `;
    submitBtn.disabled = true;

    // Get form data and set replyto to user's email
    const formData = new FormData(contactForm);
    const userEmail = formData.get('email');
    document.getElementById('replyto').value = userEmail;
    formData.set('replyto', userEmail);
    
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        // Send to Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Show success state
            submitBtn.innerHTML = `
                <span>Message Sent!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Show success message
            formMessage.textContent = '✓ Thanks for reaching out! I\'ll get back to you soon.';
            formMessage.className = 'form-message success';

            // Reset form
            contactForm.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 5000);
        } else {
            throw new Error(result.message || 'Something went wrong');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error state
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
        
        formMessage.textContent = '✗ Oops! Something went wrong. Please try again or email me directly.';
        formMessage.className = 'form-message error';
        
        // Hide error message after delay
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
}

// =============================================================================
// Typing Effect for Hero Section
// =============================================================================

/**
 * Create a typing effect for the tagline
 */
function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--color-accent)';

    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            tagline.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 50);
        } else {
            // Remove cursor after typing completes
            setTimeout(() => {
                tagline.style.borderRight = 'none';
            }, 1000);
        }
    }

    // Start typing after a small delay
    setTimeout(type, 500);
}

// =============================================================================
// Parallax Effect for Hero
// =============================================================================

/**
 * Subtle parallax effect on hero section
 */
function initParallax() {
    const heroImage = document.querySelector('.hero-image-container');
    
    if (heroImage && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// =============================================================================
// Theme Toggle (Optional - for future enhancement)
// =============================================================================

/**
 * Initialize theme toggle button
 * Toggle between light and dark theme
 */
function initThemeToggle() {
    // Initialize theme on page load
    initTheme();
    
    // Add click listener to theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// =============================================================================
// Performance Optimizations
// =============================================================================

/**
 * Debounce function for scroll events
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for frequent events
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =============================================================================
// Initialize Everything
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    window.addEventListener('scroll', throttle(handleNavbarScroll, 100));
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    navToggle.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // Initialize features
    initSmoothScroll();
    // Scroll-reveal animations disabled
    initCardTilt();
    initContactForm();
    initTypingEffect();
    initParallax();
    initThemeToggle();

    // Skills: set bar widths immediately (no reveal trigger)
    skillProgressBars.forEach((bar) => {
        const progress = bar.getAttribute('data-progress');
        if (progress) {
            bar.style.width = `${progress}%`;
        }
    });

    // Initial state
    handleNavbarScroll();
    updateActiveNavLink();

    console.log('🚀 Portfolio initialized successfully!');
});

// =============================================================================
// Handle page visibility changes
// =============================================================================

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Resume any paused animations
    }
});

// =============================================================================
// Handle window resize
// =============================================================================

window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250));
