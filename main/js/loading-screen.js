// Loading Screen Handler
(function() {
    'use strict';

    // Check IMMEDIATELY if this is a navigation transition (synchronously at script load)
    // page-transitions.js sets 'pageTransition' = 'fadeIn' when navigating between pages
    // We check this BEFORE page-transitions.js has a chance to remove it
    // This must be checked synchronously at the top level, not inside any function
    try {
        const navigationFlag = sessionStorage.getItem('pageTransition');
        if (navigationFlag === 'fadeIn') {
            // This is a navigation transition - don't show loading screen
            // The page-transitions.js will handle the transition animation instead
            return; // Exit immediately - don't initialize loading screen
        }
    } catch (e) {
        // If sessionStorage is not available, continue normally
    }

    // Create loading screen HTML
    function createLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.id = 'loadingScreen';
        
        loadingScreen.innerHTML = `
            <!-- Background Gradient -->
            <div class="background-container">
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
            </div>
            <div class="grain"></div>
            <div class="loading-screen-content">
                <div class="loading-icon animate">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <!-- Letter A - Left diagonal -->
                        <path d="M 30 160 L 50 100" />
                        <!-- Letter A - Right diagonal -->
                        <path d="M 50 100 L 70 160" />
                        <!-- Letter A - Crossbar -->
                        <path d="M 42 135 L 58 135" />
                        <!-- Dot between A and P -->
                        <circle cx="85" cy="130" r="3" />
                        <!-- Letter P - Vertical stem -->
                        <path d="M 100 100 L 100 160" />
                        <!-- Letter P - Top horizontal line -->
                        <path d="M 100 100 L 135 100" />
                        <!-- Letter P - Curved top right -->
                        <path d="M 135 100 Q 145 100, 145 110 Q 145 120, 135 120" />
                        <!-- Letter P - Bottom horizontal line (connects back to stem) -->
                        <path d="M 135 120 L 100 120" />
                    </svg>
                </div>
                <div class="loading-text"><span class="text-capitalize">Materializing</span> <span class="text-lowercase">shapes...</span></div>
            </div>
            <div class="loading-copyright">Designed and coded by Adrian Perce © 2025</div>
        `;
        
        return loadingScreen;
    }

    // Initialize loading screen
    function initLoadingScreen() {

        // Minimum display time in milliseconds (4 seconds)
        const MIN_DISPLAY_TIME = 4000;
        
        // Track when loading screen started
        const startTime = Date.now();
        let hideTimeout = null;

        // Create and append loading screen immediately
        const loadingScreen = createLoadingScreen();
        
        // Insert at the beginning of body or html
        if (document.body) {
            document.body.appendChild(loadingScreen);
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                document.body.appendChild(loadingScreen);
            });
        }

        // Hide loading screen when both conditions are met:
        // 1. Page is fully loaded
        // 2. Minimum display time has passed
        function hideLoadingScreen() {
            const screen = document.getElementById('loadingScreen');
            if (!screen) return;

            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);

            // Clear any existing timeout
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }

            // Wait for remaining minimum time, then start transition
            hideTimeout = setTimeout(() => {
                // Add fade-out class to trigger animations
                // Content moves up like curtain (1s), then background fades out (1.2s starting at 0.6s)
                screen.classList.add('fade-out');
                
                // Trigger page content fade-in animations after loading screen starts fading
                // Start content animation when loading screen content starts moving up (at 0.6s)
                // This creates a smooth transition where content appears as loading screen fades
                setTimeout(() => {
                    document.body.classList.add('page-loaded');
                }, 600);
                
                // Remove from DOM after all animations complete (1.8s total: 0.6s delay + 1.2s fade)
                setTimeout(() => {
                    screen.classList.add('hidden');
                    if (screen.parentNode) {
                        screen.parentNode.removeChild(screen);
                    }
                }, 1800);
            }, remainingTime);
        }

        // Mark page as loaded and attempt to hide
        function onPageLoad() {
            hideLoadingScreen();
        }

        // Check if page is already loaded
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            // Wait for page to fully load
            window.addEventListener('load', onPageLoad);
        }
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoadingScreen);
    } else {
        initLoadingScreen();
    }
})();

