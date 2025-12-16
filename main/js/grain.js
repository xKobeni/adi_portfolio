// CSS-Based Grain Effect - No Canvas, Pure Performance
// This replaces the expensive canvas-based grain with CSS-only solution
(function() {
    'use strict';
    
    // Check if grain elements exist
    const grainElements = document.querySelectorAll('.grain');
    
    if (grainElements.length === 0) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Apply CSS-based grain to all grain elements
    grainElements.forEach(function(grainElement) {
        // Skip if already initialized
        if (grainElement.dataset.grainInitialized === 'true') return;
        grainElement.dataset.grainInitialized = 'true';
        
        // Remove any existing canvas (from old implementation)
        const existingCanvas = grainElement.querySelector('canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        
        // Add static grain class for reduced motion, or keep animated
        if (prefersReducedMotion) {
            grainElement.classList.add('grain-static');
            grainElement.classList.remove('grain');
        }
    });
    
    // Watch for dynamically added grain elements (like nav overlay)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    // Check if the added node is a grain element
                    if (node.classList && node.classList.contains('grain')) {
                        if (!node.dataset.grainInitialized) {
                            node.dataset.grainInitialized = 'true';
                            const existingCanvas = node.querySelector('canvas');
                            if (existingCanvas) {
                                existingCanvas.remove();
                            }
                            if (prefersReducedMotion) {
                                node.classList.add('grain-static');
                                node.classList.remove('grain');
                            }
                        }
                    }
                    // Check if the added node contains grain elements
                    const grainElements = node.querySelectorAll && node.querySelectorAll('.grain');
                    if (grainElements) {
                        grainElements.forEach(function(grainEl) {
                            if (!grainEl.dataset.grainInitialized) {
                                grainEl.dataset.grainInitialized = 'true';
                                const existingCanvas = grainEl.querySelector('canvas');
                                if (existingCanvas) {
                                    existingCanvas.remove();
                                }
                                if (prefersReducedMotion) {
                                    grainEl.classList.add('grain-static');
                                    grainEl.classList.remove('grain');
                                }
                            }
                        });
                    }
                }
            });
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
