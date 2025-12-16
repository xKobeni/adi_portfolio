// Performance Detection and Optimization
(function() {
    'use strict';
    
    // Detect device performance
    function detectPerformance() {
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        const deviceMemory = navigator.deviceMemory || 4; // GB
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        // Check for low-end device
        const isLowEnd = hardwareConcurrency <= 2 || deviceMemory <= 2;
        
        // Check connection speed
        const isSlowConnection = connection && (
            connection.effectiveType === 'slow-2g' || 
            connection.effectiveType === '2g' ||
            connection.saveData === true
        );
        
        return {
            isLowEnd,
            isSlowConnection,
            shouldReduceEffects: isLowEnd || isSlowConnection
        };
    }
    
    const perf = detectPerformance();
    
    // Apply performance optimizations
    if (perf.shouldReduceEffects) {
        document.documentElement.classList.add('low-performance');
        
        // Convert animated grain to static grain (CSS handles this)
        const grainElements = document.querySelectorAll('.grain');
        grainElements.forEach(el => {
            el.classList.add('grain-static');
            el.classList.remove('grain');
        });
        
        // Reduce animation complexity
        const style = document.createElement('style');
        style.textContent = `
            .low-performance .bubble {
                animation-duration: 12s !important;
            }
            .low-performance .cursor-follower,
            .low-performance .cursor-dot {
                display: none !important;
            }
            .low-performance .grain {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Expose performance info
    window.performanceInfo = perf;
})();

