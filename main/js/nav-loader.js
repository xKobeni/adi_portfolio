// Navigation Loader - Loads navigation component into pages (Optimized with caching)
(function() {
    'use strict';
    
    // Cache navigation HTML
    let navCache = null;
    let navPath = null;
    
    function getNavPath() {
        if (navPath) return navPath;
        
        const currentPath = window.location.pathname;
        navPath = currentPath.includes('/pages/') 
            ? '../components/nav.html' 
            : 'components/nav.html';
        return navPath;
    }
    
    function loadNavigation() {
        const path = getNavPath();
        
        // Use cached HTML if available
        if (navCache) {
            document.body.insertAdjacentHTML('afterbegin', navCache);
            initializeNavAfterLoad();
            return;
        }
        
            // Load and cache navigation
        fetch(path, { 
            cache: 'force-cache',
            priority: 'high'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Navigation component not found');
                }
                return response.text();
            })
            .then(html => {
                navCache = html; // Cache the HTML
                document.body.insertAdjacentHTML('afterbegin', html);
                initializeNavAfterLoad();
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
                createFallbackNav();
            });
    }
    
    function initializeNavAfterLoad() {
        // Use requestAnimationFrame for smoother initialization
        requestAnimationFrame(() => {
            // Small delay to ensure DOM is fully updated
            setTimeout(() => {
            if (typeof initializeNavControls === 'function') {
                initializeNavControls();
            }
            // Set initial visibility immediately
            toggleNavElementsVisibility();
            // Watch for navbar overlay changes
            setupNavOverlayWatcher();
            }, 10);
        });
    }
    
    // Initialize on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNavigation);
    } else {
        loadNavigation();
    }
})();

// Also run visibility check on page load (in case nav loads before this script)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(toggleNavElementsVisibility, 100);
    });
} else {
    setTimeout(toggleNavElementsVisibility, 100);
}

// Function to toggle nav elements visibility based on current page and navbar overlay state
function toggleNavElementsVisibility() {
    const languageToggle = document.getElementById('language-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    
    // If elements don't exist yet, retry after a short delay
    if (!languageToggle || !themeToggle) {
        setTimeout(toggleNavElementsVisibility, 50);
        return;
    }
    
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || currentPath;
    const fullPath = currentPath.toLowerCase();
    const currentUrl = window.location.href.toLowerCase();
    
    // Check if it's the homepage - check for home.html or index.html in the path/URL
    const isHomepage = currentPage === 'home.html' || 
                       currentPage === 'index.html' || 
                       currentPage === '' || 
                       fullPath.includes('home.html') ||
                       fullPath.includes('index.html') ||
                       currentUrl.includes('home.html') ||
                       currentUrl.includes('index.html') ||
                       (currentPage === '' && !fullPath.includes('/pages/'));
    
    // Check if navbar overlay is active
    const navOverlay = document.getElementById('nav-overlay');
    const isNavOverlayOpen = navOverlay && navOverlay.classList.contains('active');
    const isBodyNavOpen = document.body.classList.contains('nav-overlay-open');
    
    // Language toggle: ALWAYS HIDDEN on all pages
    languageToggle.style.setProperty('display', 'none', 'important');
    languageToggle.style.setProperty('visibility', 'hidden', 'important');
    languageToggle.setAttribute('hidden', '');
    
    // Theme toggle: Show ONLY if homepage OR navbar overlay is open
    const shouldShowTheme = isHomepage || isNavOverlayOpen || isBodyNavOpen;
    
    if (shouldShowTheme) {
        themeToggle.style.setProperty('display', 'block', 'important');
        themeToggle.style.setProperty('visibility', 'visible', 'important');
        themeToggle.removeAttribute('hidden');
    } else {
        themeToggle.style.setProperty('display', 'none', 'important');
        themeToggle.style.setProperty('visibility', 'hidden', 'important');
        themeToggle.setAttribute('hidden', '');
    }
}

// Watch for navbar overlay state changes
function setupNavOverlayWatcher() {
    const navOverlay = document.getElementById('nav-overlay');
    if (!navOverlay) return;
    
    // Use MutationObserver to watch for class changes on nav-overlay
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                toggleNavElementsVisibility();
            }
        });
    });
    
    observer.observe(navOverlay, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    // Also watch for body class changes (nav-overlay-open)
    const bodyObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                toggleNavElementsVisibility();
            }
        });
    });
    
    bodyObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
}

// Fallback navigation creation
function createFallbackNav() {
    const navHTML = `
        <nav class="fixed top-0 left-0 right-0 pt-24 pr-24 pl-24 pb-6 flex justify-between items-center z-[100]">
            <div class="logo-container">
                <a href="../index.html" class="logo-text">A.P</a>
            </div>
            <div class="nav-right flex items-center gap-6">
                <button id="language-toggle" class="nav-item text-white hover:text-gray-300 transition text-sm font-medium">EN</button>
                <button id="theme-toggle" class="nav-item text-white hover:text-gray-300 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                </button>
                <button id="burger-menu" class="nav-item burger-menu-btn">
                    <div class="burger-grid">
                        <span></span><span></span><span></span>
                        <span></span><span></span><span></span>
                        <span></span><span></span><span></span>
                    </div>
                </button>
            </div>
        </nav>
        <div id="nav-overlay" class="nav-overlay">
            <div class="nav-overlay-background"></div>
            <div class="nav-overlay-blobs">
                <div class="nav-blob nav-blob-1"></div>
                <div class="nav-blob nav-blob-2"></div>
                <div class="nav-blob nav-blob-3"></div>
                <div class="nav-blob nav-blob-4"></div>
            </div>
            <div class="nav-overlay-content">
                <div class="nav-overlay-menu">
                    <a href="home.html" class="nav-overlay-link">
                        <span class="nav-number">01</span>
                        <span class="nav-label">HOME</span>
                    </a>
                    <a href="projects.html" class="nav-overlay-link">
                        <span class="nav-number">02</span>
                        <span class="nav-label">PROJECTS</span>
                    </a>
                    <a href="about.html" class="nav-overlay-link">
                        <span class="nav-number">03</span>
                        <span class="nav-label">ABOUT</span>
                    </a>
                    <a href="contact.html" class="nav-overlay-link">
                        <span class="nav-number">04</span>
                        <span class="nav-label">CONTACT</span>
                    </a>
                </div>
                <div class="nav-overlay-social">
                    <a href="https://github.com/xKobeni" class="social-link">
                        <span class="social-arrow">></span>
                        <span class="social-label">github</span>
                    </a>
                    <a href="https://www.linkedin.com/in/john-adrian-perce-08/" class="social-link">
                        <span class="social-arrow">></span>
                        <span class="social-label">linkedin</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Initialize nav controls after fallback nav is created
    setTimeout(function() {
        if (typeof initializeNavControls === 'function') {
            // Small delay to ensure DOM is fully updated
            requestAnimationFrame(() => {
                setTimeout(() => {
            initializeNavControls();
            // Set initial visibility and watch for changes
            toggleNavElementsVisibility();
            setupNavOverlayWatcher();
                }, 10);
            });
        }
    }, 50);
}

