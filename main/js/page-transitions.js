// Page Transitions - Fade in/out effects for page navigation
(function() {
    'use strict';
    
    // Track which links already have listeners attached
    const linksWithListeners = new WeakSet();
    let transitionOverlay = null;
    let loadingBar = null;
    
    // Initialize function
    function init() {
        // Find or create transition overlay element
        if (!transitionOverlay) {
            // Check if overlay was already created by inline script
            transitionOverlay = document.querySelector('.page-transition-overlay');
            
            if (!transitionOverlay) {
                // Create if it doesn't exist
                transitionOverlay = document.createElement('div');
                transitionOverlay.className = 'page-transition-overlay';
            }
            
            // Move to body if it's in documentElement
            if (transitionOverlay.parentNode !== document.body) {
                document.body.appendChild(transitionOverlay);
            }
        }
        
        // Find or create loading bar element
        if (!loadingBar) {
            loadingBar = document.querySelector('.page-loading-bar');
            
            if (!loadingBar) {
                loadingBar = document.createElement('div');
                loadingBar.className = 'page-loading-bar';
                document.body.appendChild(loadingBar);
            }
        }
        
        // Check if page should fade in on load (from navigation)
        const shouldFadeIn = sessionStorage.getItem('pageTransition') === 'fadeIn';
        
        if (shouldFadeIn) {
            // Remove the flag
            sessionStorage.removeItem('pageTransition');
            
            // Ensure loading bar is at 100% (should already be from previous page)
            if (loadingBar) {
                loadingBar.style.width = '100%';
                loadingBar.style.opacity = '1';
                loadingBar.classList.remove('complete');
            }
            
            // Start with overlay visible and page hidden
            transitionOverlay.style.display = 'block';
            transitionOverlay.classList.add('active');
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity var(--page-transition-duration, 0.6s) cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Fade in page and fade out overlay after a brief delay
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    document.body.style.opacity = '1';
                    transitionOverlay.classList.remove('active');
                    
                    // Trigger content animations as page becomes visible
                    document.body.classList.add('page-loaded');
                    
                    // Fade out loading bar after page is visible
                    if (loadingBar) {
                        setTimeout(() => {
                            loadingBar.classList.add('complete');
                            setTimeout(() => {
                                loadingBar.classList.remove('active', 'complete');
                                loadingBar.style.width = '0%';
                                loadingBar.style.opacity = '1';
                            }, 300);
                        }, 200);
                    }
                    
                    // Clean up after animation completes
                    setTimeout(() => {
                        document.body.style.transition = '';
                        transitionOverlay.style.display = '';
                    }, 600);
                });
            });
        } else {
            // Initial page load (refresh or direct navigation) - fade out overlay
            // Overlay is already visible via active class from head script
            // Ensure it has the active class
            if (!transitionOverlay.classList.contains('active')) {
                transitionOverlay.classList.add('active');
            }
            
            // Small delay to ensure everything is ready, then fade out overlay
            setTimeout(() => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        // Fade out overlay to reveal page content
                        transitionOverlay.classList.remove('active');
                        
                        // Clean up after animation completes
                        setTimeout(() => {
                            transitionOverlay.style.display = '';
                        }, 600);
                    });
                });
            }, 50);
        }
        
        // Attach listeners after initialization
        attachTransitionListeners();
        
        // Use event delegation on document for dynamically loaded links
        // This ensures we catch all links even if they're added after page load
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link || !link.href || link.href.startsWith('javascript:') || link.href.startsWith('#')) {
                return;
            }
            
            try {
                const url = new URL(link.href, window.location.origin);
                const currentUrl = new URL(window.location.href);
                
                // Only handle internal links that don't already have a direct listener
                if (url.origin === currentUrl.origin && 
                    url.pathname !== currentUrl.pathname && 
                    !linksWithListeners.has(link)) {
                    handleLinkClick(e);
                }
            } catch (err) {
                // Invalid URL, skip
            }
        }, true); // Use capture phase to catch before other handlers
    }
    
    // Function to handle link clicks
    function handleLinkClick(e) {
        const link = e.target.closest('a');
        
        // Only handle internal links (same origin)
        if (!link || link.href.startsWith('javascript:') || link.href.startsWith('#')) {
            return;
        }
        
        // Check if it's an internal link
        try {
            const url = new URL(link.href, window.location.origin);
            const currentUrl = new URL(window.location.href);
            
            // Skip external links and same-page anchors
            if (url.origin !== currentUrl.origin || url.pathname === currentUrl.pathname) {
                return;
            }
            
            // Prevent default navigation
            e.preventDefault();
            e.stopPropagation();
            
            // Set flag for next page to fade in
            sessionStorage.setItem('pageTransition', 'fadeIn');
            
            // Ensure overlay exists
            if (!transitionOverlay) {
                transitionOverlay = document.createElement('div');
                transitionOverlay.className = 'page-transition-overlay';
                document.body.appendChild(transitionOverlay);
            }
            
            // Ensure loading bar exists
            if (!loadingBar) {
                loadingBar = document.createElement('div');
                loadingBar.className = 'page-loading-bar';
                document.body.appendChild(loadingBar);
            }
            
            // Start loading bar animation with progress simulation
            loadingBar.style.width = '0%';
            loadingBar.classList.remove('complete');
            loadingBar.style.opacity = '1';
            
            // Simulate progress: start fast, slow down near the end
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 15 + 5; // Random increment between 5-20%
                
                if (progress > 90) {
                    progress = 90; // Cap at 90% until page loads
                }
                
                loadingBar.style.width = progress + '%';
                
                if (progress >= 90) {
                    clearInterval(progressInterval);
                }
            }, 50); // Update every 50ms
            
            requestAnimationFrame(() => {
                loadingBar.classList.add('active');
            });
            
            // Fade out overlay (this will cover the page with dark background)
            // Force the overlay to be visible immediately before transition
            transitionOverlay.style.display = 'block';
            requestAnimationFrame(() => {
                transitionOverlay.classList.add('active');
            });
            
            // Navigate after fade out completes
            setTimeout(() => {
                // Complete the progress bar before navigation
                clearInterval(progressInterval);
                loadingBar.style.width = '100%';
                window.location.href = link.href;
            }, 600); // Match CSS transition duration
        } catch (e) {
            // Invalid URL, allow default behavior
            return;
        }
    }
    
    // Attach event listeners to all navigation links
    function attachTransitionListeners() {
        // Get all internal links
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            // Skip if already has listener
            if (linksWithListeners.has(link)) {
                return;
            }
            
            // Skip external links and anchors
            if (link.href.startsWith('javascript:') || link.href.startsWith('#')) {
                return;
            }
            
            try {
                const url = new URL(link.href, window.location.origin);
                const currentUrl = new URL(window.location.href);
                
                // Only attach to internal links
                if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
                    link.addEventListener('click', handleLinkClick, { passive: false });
                    linksWithListeners.add(link);
                }
            } catch (e) {
                // Invalid URL, skip
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already ready, initialize immediately
        init();
    }
    
    // Re-attach listeners when navigation is loaded dynamically (debounced)
    let observerTimeout;
    const observer = new MutationObserver(() => {
        clearTimeout(observerTimeout);
        observerTimeout = setTimeout(() => {
            if (transitionOverlay && document.body.contains(transitionOverlay)) {
                attachTransitionListeners();
            }
        }, 100);
    });
    
    // Start observing after initialization
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
})();

