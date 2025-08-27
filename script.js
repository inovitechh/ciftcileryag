// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initScrollAnimations();
    initContactForm();
    initHeroNavigation();
    initSmoothScrolling();
    initLoadingAnimations();
    initHoverDropdowns(); // Desktop hover functionality
    initMobileTouchOptimizations(); // Mobil dokunmatik optimizasyonları
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--bg-dark) 0%, #2c3e50 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Mobil dokunmatik optimizasyonları
function initMobileTouchOptimizations() {
    // Dokunmatik cihaz kontrolü
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Mobil dropdown menü için dokunmatik optimizasyonları
        initMobileDropdownTouch();
        
        // Mobil navbar toggle için dokunmatik optimizasyonları
        initMobileNavbarTouch();
        
        // Mobil link tıklamaları için optimizasyonlar
        initMobileLinkTouch();
    }
}

// Mobil dropdown dokunmatik optimizasyonları
function initMobileDropdownTouch() {
    // Tüm dropdown toggle'ları bul ve Bootstrap'i devre dışı bırak
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        // Bootstrap özelliklerini tamamen kaldır
        toggle.removeAttribute('data-bs-toggle');
        toggle.removeAttribute('data-bs-target');
        toggle.removeAttribute('role');
        toggle.removeAttribute('aria-expanded');
        toggle.removeAttribute('aria-haspopup');
        
        // Bootstrap'in event listener'larını temizle
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        // Kendi event listener'ımızı ekle
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('Dropdown clicked!'); // Debug için
            
            // Dokunmatik geri bildirim
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.8';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '';
            }, 150);
            
            // Diğer açık dropdown'ları kapat
            const allDropdowns = document.querySelectorAll('.dropdown');
            allDropdowns.forEach(dropdown => {
                if (dropdown !== this.closest('.dropdown')) {
                    dropdown.classList.remove('show');
                }
            });
            
            // Bu dropdown'ı aç/kapat
            const dropdown = this.closest('.dropdown');
            const isOpen = dropdown.classList.contains('show');
            
            if (isOpen) {
                dropdown.classList.remove('show');
                console.log('Dropdown closed'); // Debug için
            } else {
                dropdown.classList.add('show');
                console.log('Dropdown opened'); // Debug için
            }
        });
        
        // Dropdown menü öğelerini işle
        const dropdownMenu = newToggle.nextElementSibling;
        if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
            const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
            
            dropdownItems.forEach(item => {
                // Mevcut event listener'ları temizle
                const newItem = item.cloneNode(true);
                item.parentNode.replaceChild(newItem, item);
                
                newItem.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    console.log('Dropdown item clicked:', this.textContent); // Debug için
                    
                    // Dokunmatik geri bildirim
                    this.style.transform = 'scale(0.98)';
                    this.style.backgroundColor = 'var(--primary-color)';
                    this.style.color = 'white';
                    
                    setTimeout(() => {
                        this.style.transform = '';
                        this.style.backgroundColor = '';
                        this.style.color = '';
                    }, 150);
                    
                    // Dropdown'ı kapat
                    const dropdown = this.closest('.dropdown');
                    dropdown.classList.remove('show');
                    
                    // Link'e git
                    const href = this.getAttribute('href');
                    if (href && href !== '#') {
                        if (href.startsWith('#')) {
                            // Sayfa içi link
                            const targetElement = document.querySelector(href);
                            if (targetElement) {
                                targetElement.scrollIntoView({ behavior: 'smooth' });
                            }
                        } else {
                            // Harici link
                            window.location.href = href;
                        }
                    }
                });
            });
        }
    });
    
    // Dropdown dışına tıklandığında kapat
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            const allDropdowns = document.querySelectorAll('.dropdown.show');
            allDropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
    
    // Touch event'leri için de aynı işlemi yap
    document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.dropdown')) {
            const allDropdowns = document.querySelectorAll('.dropdown.show');
            allDropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
}

// Mobil navbar toggle dokunmatik optimizasyonları
function initMobileNavbarTouch() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('touchstart', function(e) {
            e.preventDefault();
            
            // Dokunmatik geri bildirim
            this.style.transform = 'scale(0.95)';
            
            // Navbar'ı aç/kapat
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: true
            });
            
            // Kısa süre sonra normal haline döndür
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: false });
        
        // Navbar dışına tıklandığında kapat
        document.addEventListener('touchstart', function(e) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    }
}

// Mobil link dokunmatik optimizasyonları
function initMobileLinkTouch() {
    const mobileLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    
    mobileLinks.forEach(link => {
        link.addEventListener('touchstart', function(e) {
            // Dokunmatik geri bildirim
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.8';
            
            // Kısa süre sonra normal haline döndür
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '';
            }, 150);
            
            // Mobil menüyü kapat
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .about-content, .contact-info, .contact-form');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Lütfen tüm alanları doldurun.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Gönderiliyor...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Hero navigation
function initHeroNavigation() {
    const prevBtn = document.querySelector('.hero-nav-btn.prev');
    const nextBtn = document.querySelector('.hero-nav-btn.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            // Add hero slide animation
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.transform = 'translateX(-100px)';
            heroContent.style.opacity = '0';
            
            setTimeout(() => {
                heroContent.style.transform = 'translateX(0)';
                heroContent.style.opacity = '1';
            }, 300);
        });
        
        nextBtn.addEventListener('click', function() {
            // Add hero slide animation
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.transform = 'translateX(100px)';
            heroContent.style.opacity = '0';
            
            setTimeout(() => {
                heroContent.style.transform = 'translateX(0)';
                heroContent.style.opacity = '1';
            }, 300);
        });
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
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
    
    // Scroll to top functionality
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });
    }
}

// Loading animations
function initLoadingAnimations() {
    // Add loading animation to page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
}

// Parallax effect for hero background
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Product card hover effects
function initProductHoverEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Feature card animations
function initFeatureAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initProductHoverEffects();
    initFeatureAnimations();
});

// Mobile menu functionality
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.navbar-nav .nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
    }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});

// Desktop hover dropdown functionality
function initHoverDropdowns() {
    // Sadece hover destekleyen cihazlarda çalıştır
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            let hoverTimeout;
            
            dropdown.addEventListener('mouseenter', function() {
                // Close all other dropdowns immediately
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== this) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.style.opacity = '0';
                            otherMenu.style.transform = 'translateY(-10px)';
                            setTimeout(() => {
                                otherMenu.style.display = 'none';
                            }, 50);
                        }
                    }
                });
                
                clearTimeout(hoverTimeout);
                requestAnimationFrame(() => {
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'block';
                        dropdownMenu.style.opacity = '1';
                        dropdownMenu.style.transform = 'translateY(0)';
                    }
                });
            });
            
            dropdown.addEventListener('mouseleave', function() {
                hoverTimeout = setTimeout(() => {
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            dropdownMenu.style.display = 'none';
                        }, 50);
                    }
                }, 50); // Reduced from 150ms to 50ms for faster response
            });
        });
    }
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .hero-content {
        transition: all 0.3s ease;
    }
    
    .scroll-top {
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    /* Mobil dokunmatik optimizasyonları için ek stiller */
    @media (hover: none) and (pointer: coarse) {
        .dropdown-item {
            -webkit-tap-highlight-color: rgba(255, 107, 53, 0.2);
        }
        
        .nav-link {
            -webkit-tap-highlight-color: rgba(255, 107, 53, 0.2);
        }
        
        .navbar-toggler {
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
        }
    }
`;
document.head.appendChild(notificationStyles);
