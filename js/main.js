// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    setupNavigation();
    setupFooter();
    setupUtilities();
});

// Setup Navigation
function setupNavigation() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // User Dropdown in Dashboard
    const userDropdownBtn = document.querySelector('.dashboard-user-btn');
    const userDropdownMenu = document.querySelector('.dashboard-dropdown-menu');

    if (userDropdownBtn && userDropdownMenu) {
        userDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdownMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!userDropdownBtn.contains(e.target) && !userDropdownMenu.contains(e.target)) {
                userDropdownMenu.classList.remove('active');
            }
        });
    }

    // Logout functionality
    const logoutBtns = document.querySelectorAll('#logout-btn, #sidebar-logout-btn');
    logoutBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    });
}

// Setup Footer
function setupFooter() {
    // Update current year in footer
    const yearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element) {
            element.textContent = currentYear;
        }
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // In a real application, this would be an API call
                setTimeout(() => {
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                }, 500);
            }
        });
    }
}

// Setup Utilities
function setupUtilities() {
    // Password visibility toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                const passwordInput = toggle.parentElement.querySelector('input');
                const icon = toggle.querySelector('i');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    feather.replace(icon, { name: 'eye-off' });
                } else {
                    passwordInput.type = 'password';
                    feather.replace(icon, { name: 'eye' });
                }
            });
        }
    });

    // FAQ toggles
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                const faqItem = toggle.closest('.faq-item');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                
                toggle.classList.toggle('active');
                if (faqAnswer.style.display === 'block') {
                    faqAnswer.style.display = 'none';
                } else {
                    faqAnswer.style.display = 'block';
                }
            });
        }
    });

    // Modal functionality
    setupModals();

    // Service quote request
    setupQuoteRequests();

    // Update cart count from localStorage
    updateCartCount();
}

// Setup Modals
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });

    modalCloses.forEach(close => {
        if (close) {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    modals.forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
}

// Setup Quote Requests
function setupQuoteRequests() {
    const quoteButtons = document.querySelectorAll('.request-quote');
    const quoteModal = document.getElementById('quote-modal');
    const quoteForm = document.getElementById('quote-form');
    const quoteServiceInput = document.getElementById('quote-service');

    quoteButtons.forEach(button => {
        if (button && quoteModal) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceName = button.getAttribute('data-service');
                if (quoteServiceInput) {
                    quoteServiceInput.value = serviceName;
                }
                quoteModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, this would be an API call
            setTimeout(() => {
                quoteModal.classList.remove('active');
                document.body.style.overflow = '';
                alert('Your quote request has been submitted. We will contact you shortly.');
                quoteForm.reset();
            }, 500);
        });
    }
}

// Authentication Functions
function login(email, password) {
    // In a real application, this would be an API call
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            // For demo purposes, accept any email/password combination
            if (email && password) {
                const user = {
                    id: 1,
                    firstName: 'John',
                    lastName: 'Doe',
                    email: email,
                    isAuthenticated: true
                };
                
                // Store user in localStorage
                localStorage.setItem('user', JSON.stringify(user));
                
                resolve(user);
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 1000);
    });
}

function register(userData) {
    // In a real application, this would be an API call
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            if (userData.firstname && userData.lastname && userData.email && userData.password) {
                // Check if passwords match
                if (userData.password !== userData.confirm) {
                    reject(new Error('Passwords do not match'));
                    return;
                }
                
                const user = {
                    id: 1,
                    firstName: userData.firstname,
                    lastName: userData.lastname,
                    email: userData.email,
                    isAuthenticated: true
                };
                
                // Store user in localStorage
                localStorage.setItem('user', JSON.stringify(user));
                
                resolve(user);
            } else {
                reject(new Error('All fields are required'));
            }
        }, 1000);
    });
}

function logout() {
    // Clear user from localStorage
    localStorage.removeItem('user');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

function isAuthenticated() {
    const user = localStorage.getItem('user');
    return !!user;
}

function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Cart Functions
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const cartItems = getCartItems();
    
    cartCountElements.forEach(element => {
        if (element) {
            element.textContent = cartItems.length;
        }
    });
}

function getCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
}

function addToCart(product) {
    const cartItems = getCartItems();
    
    // Check if product already exists in cart
    const existingProduct = cartItems.find(item => item.id === product.id);
    
    if (existingProduct) {
        // Update quantity
        existingProduct.quantity += 1;
    } else {
        // Add new product
        cartItems.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart count
    updateCartCount();
}

function removeFromCart(productId) {
    let cartItems = getCartItems();
    
    // Remove product from cart
    cartItems = cartItems.filter(item => item.id !== productId);
    
    // Save cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart count
    updateCartCount();
    
    return cartItems;
}

function updateCartItemQuantity(productId, quantity) {
    const cartItems = getCartItems();
    
    // Find product in cart
    const product = cartItems.find(item => item.id === productId);
    
    if (product) {
        // Update quantity
        product.quantity = Math.max(1, quantity);
    }
    
    // Save cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart count
    updateCartCount();
    
    return cartItems;
}

function clearCart() {
    // Clear cart items from localStorage
    localStorage.removeItem('cartItems');
    
    // Update cart count
    updateCartCount();
}

// Testimonial Slider
// function setupTestimonialsSlider() {
//     const slider = document.getElementById('testimonials-slider');
//     const dots = document.querySelectorAll('.testimonials-dots .dot');
//     const prevBtn = document.getElementById('testimonial-prev');
//     const nextBtn = document.getElementById('testimonial-next');
    
//     if (slider && dots.length > 0) {
//         let currentSlide = 0;
//         const slides = slider.children;
//         const slideCount = slides.length;
        
//         // Initial setup
//         updateSlider();
        
//         // Update slider display
//         function updateSlider() {
//             // Hide all slides
//             for (let i = 0; i < slideCount; i++) {
//                 slides[i].style.display = 'none';
//                 dots[i].classList.remove('active');
//             }
            
//             // Show current slide
//             slides[currentSlide].style.display = 'block';
//             dots[currentSlide].classList.add('active');
//         }
        
//         // Next slide
//         function nextSlide() {
//             currentSlide = (currentSlide + 1) % slideCount;
//             updateSlider();
//         }
        
//         // Previous slide
//         function prevSlide() {
//             currentSlide = (currentSlide - 1 + slideCount) % slideCount;
//             updateSlider();
//         }
        
//         // Event listeners
//         if (nextBtn) {
//             nextBtn.addEventListener('click', nextSlide);
//         }
        
//         if (prevBtn) {
//             prevBtn.addEventListener('click', prevSlide);
//         }
        
//         // Dot navigation
//         dots.forEach((dot, index) => {
//             dot.addEventListener('click', () => {
//                 currentSlide = index;
//                 updateSlider();
//             });
//         });
        
//         // Auto slide (optional)
//         // setInterval(nextSlide, 5000);
//     }
// }

function setupTestimonialsSlider() {
    const slider = document.getElementById('testimonials-slider');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (slider && dots.length > 0) {
        let currentSlide = 0;
        const slides = slider.children;
        const slideCount = slides.length;

        // Assumes 3 cards per view
        const cardsPerView = 3;
        const maxSlide = Math.ceil(slideCount / cardsPerView) - 1;

        // Update slider display
        function updateSlider() {
            const cardWidth = slides[0].offsetWidth + 20; // width + gap
            slider.scrollTo({
                left: currentSlide * cardWidth * cardsPerView,
                behavior: 'smooth',
            });

            // Update active dot
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        // Next slide
        function nextSlide() {
            if (currentSlide < maxSlide) {
                currentSlide++;
                updateSlider();
            }
        }

        // Previous slide
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        }

        // Initial setup
        updateSlider();

        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });

        // Optional: enable dragging manually with scroll behavior
        slider.style.scrollSnapType = 'x mandatory';
    }
}


// Helper Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Check if user is authenticated and redirect if needed
function checkAuth() {
    const isAuthPage = window.location.pathname.includes('login.html') || 
                        window.location.pathname.includes('register.html');
    
    const isDashboardPage = window.location.pathname.includes('dashboard');
    
    if (isAuthenticated()) {
        // If user is authenticated and trying to access auth pages, redirect to dashboard
        if (isAuthPage) {
            window.location.href = 'dashboard/index.html';
        }
    } else {
        // If user is not authenticated and trying to access dashboard, redirect to login
        if (isDashboardPage) {
            window.location.href = '../login.html';
        }
    }
}

// Export functions for use in other scripts
window.appFunctions = {
    login,
    register,
    logout,
    isAuthenticated,
    getCurrentUser,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartItems,
    formatCurrency,
    formatDate
};