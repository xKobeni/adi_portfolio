// Navigation Controls - Burger Menu and Theme Toggle (Optimized)

// Track if controls are initialized (per element)
const initializedElements = new WeakSet();

function initializeNavControls() {
    // Burger Menu Toggle
    const burgerMenu = document.getElementById('burger-menu');
    const navOverlay = document.getElementById('nav-overlay');
    
    if (burgerMenu && navOverlay) {
        // Only add event listener if not already added
        if (!initializedElements.has(burgerMenu)) {
            initializedElements.add(burgerMenu);
            
            // Add click event listener
            burgerMenu.addEventListener('click', function burgerMenuClickHandler(e) {
            e.preventDefault();
            e.stopPropagation();
                const overlay = document.getElementById('nav-overlay');
                if (overlay) {
                    const isActive = overlay.classList.toggle('active');
            document.body.classList.toggle('nav-overlay-open', isActive);
                    // Update visibility of language and theme toggles
                    if (typeof toggleNavElementsVisibility === 'function') {
                        toggleNavElementsVisibility();
                    }
                }
        }, { passive: false });
        }
        
        // Close overlay when clicking on a link - Use event delegation
        if (!initializedElements.has(navOverlay)) {
            initializedElements.add(navOverlay);
            
            navOverlay.addEventListener('click', function overlayClickHandler(e) {
            const link = e.target.closest('.nav-overlay-link');
            if (link) {
                navOverlay.classList.remove('active');
                document.body.classList.remove('nav-overlay-open');
                // Update visibility of language and theme toggles
                if (typeof toggleNavElementsVisibility === 'function') {
                    toggleNavElementsVisibility();
                }
            }
        }, { passive: true });
        
        // Close overlay when clicking on background
        const overlayBackground = navOverlay.querySelector('.nav-overlay-background');
            if (overlayBackground && !initializedElements.has(overlayBackground)) {
                initializedElements.add(overlayBackground);
                overlayBackground.addEventListener('click', function backgroundClickHandler(e) {
                if (e.target === overlayBackground) {
                navOverlay.classList.remove('active');
                document.body.classList.remove('nav-overlay-open');
                    // Update visibility of language and theme toggles
                    if (typeof toggleNavElementsVisibility === 'function') {
                        toggleNavElementsVisibility();
                    }
                }
            }, { passive: true });
            }
        }
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle && !initializedElements.has(themeToggle)) {
        initializedElements.add(themeToggle);
        themeToggle.addEventListener('click', function themeToggleHandler(e) {
            e.preventDefault();
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            // Store preference in localStorage
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        }, { passive: false });
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.documentElement.classList.add('light-theme');
        }
    }

    // Language Toggle (if needed) - Use event delegation (only add once)
    if (!window.languageToggleInitialized) {
        window.languageToggleInitialized = true;
        document.addEventListener('click', function languageToggleHandler(e) {
        const button = e.target.closest('.nav-item');
        if (button && (button.textContent.trim() === 'EN' || button.textContent.trim() === 'FR')) {
                // Add language switching logic here
                console.log('Language toggle clicked');
        }
    }, { passive: true });
    }
}

// Retry initialization if elements aren't found
function retryInitialization(maxRetries = 10, delay = 100) {
    let retries = 0;
    
    function attemptInit() {
        const burgerMenu = document.getElementById('burger-menu');
        const navOverlay = document.getElementById('nav-overlay');
        
        if (burgerMenu && navOverlay) {
            initializeNavControls();
            return true;
        }
        
        retries++;
        if (retries < maxRetries) {
            setTimeout(attemptInit, delay);
        } else {
            console.warn('Navigation controls: Elements not found after retries');
        }
        return false;
    }
    
    return attemptInit();
}

// Initialize on DOMContentLoaded (for pages without nav-loader)
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() {
        // Use requestAnimationFrame for smoother initialization
        requestAnimationFrame(() => {
            setTimeout(() => retryInitialization(), 50);
        });
    });
} else {
    requestAnimationFrame(() => {
        setTimeout(() => retryInitialization(), 50);
});
}

