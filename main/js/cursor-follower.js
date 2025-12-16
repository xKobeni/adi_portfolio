// Optimized Smooth Cursor Follower - Circle with dot
(function() {
    'use strict';
    
    // Create cursor follower element (outer circle)
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    
    // Create inner dot (follows cursor more closely)
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorFollower);
    document.body.appendChild(cursorDot);
    
    // Add smooth transitions via CSS
    cursorFollower.style.transition = 'border-color 0.3s ease, border-width 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease, width 0.3s ease, height 0.3s ease';
    cursorDot.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease';
    
    // Cache transform strings to avoid string concatenation in animation loop
    const circleTransform = cursorFollower.style;
    const dotTransform = cursorDot.style;
    
    // Use single object for mouse position to reduce memory allocation
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const circle = { x: mouse.x, y: mouse.y };
    const dot = { x: mouse.x, y: mouse.y };
    
    // Optimized easing factors - Single pass for better performance
    const CIRCLE_EASING = 0.12; // Increased for faster response
    const DOT_EASING = 0.22; // Increased for faster response
    
    // Throttle mousemove for better performance
    let isAnimating = false;
    
    // Track hover state
    let isHovering = false;
    let targetSize = 50; // Default size
    let currentSize = 50;
    
    // Track visual properties for smooth interpolation
    let currentBorderOpacity = 0.4;
    let targetBorderOpacity = 0.4;
    let currentBorderWidth = 1;
    let targetBorderWidth = 1;
    let currentBlur = 0.8;
    let targetBlur = 0.8;
    let currentBrightness = 1;
    let targetBrightness = 1;
    let currentGlowIntensity = 0.1;
    let targetGlowIntensity = 0.1;
    
    // Dot properties
    let currentDotBorderOpacity = 0.5;
    let targetDotBorderOpacity = 0.5;
    let currentDotGlowIntensity = 0.2;
    let targetDotGlowIntensity = 0.2;
    
    // Check if element is interactive
    function isInteractiveElement(element) {
        if (!element) return false;
        
        // Check tag names
        const interactiveTags = ['A', 'BUTTON', 'INPUT'];
        if (interactiveTags.includes(element.tagName)) {
            return true;
        }
        
        // Check for specific input types
        if (element.tagName === 'INPUT') {
            const type = element.getAttribute('type');
            if (type === 'submit' || type === 'button') {
                return true;
            }
        }
        
        // Check for classes
        const interactiveClasses = ['nav-item', 'cta-link', 'logo-text'];
        if (interactiveClasses.some(cls => element.classList.contains(cls))) {
            return true;
        }
        
        // Check for role attribute
        if (element.getAttribute('role') === 'button') {
            return true;
        }
        
        return false;
    }
    
    // Handle mouse enter on interactive elements (using event delegation)
    function handleMouseEnter(e) {
        const target = e.target.closest('a, button, .nav-item, .cta-link, .logo-text, [role="button"], input[type="submit"], input[type="button"]');
        if (target && isInteractiveElement(target)) {
            isHovering = true;
            const rect = target.getBoundingClientRect();
            // Calculate size based on element dimensions (larger for bigger elements)
            const elementSize = Math.max(rect.width, rect.height);
            targetSize = Math.min(Math.max(elementSize * 0.8, 60), 120); // Between 60px and 120px
            
            // Set target values for bright/light appearance
            targetBorderOpacity = 1.0;
            targetBorderWidth = 2;
            targetBlur = 0.2; // Reduced blur
            targetBrightness = 1.3; // Reduced brightness
            targetGlowIntensity = 0.6; // Reduced glow
            
            // Dot targets
            targetDotBorderOpacity = 1.0;
            targetDotGlowIntensity = 0.9;
        }
    }
    
    // Handle mouse leave on interactive elements
    function handleMouseLeave(e) {
        const target = e.target.closest('a, button, .nav-item, .cta-link, .logo-text, [role="button"], input[type="submit"], input[type="button"]');
        if (target && isInteractiveElement(target)) {
            // Check if we're still hovering over an interactive element
            const relatedTarget = e.relatedTarget;
            if (!relatedTarget || !isInteractiveElement(relatedTarget.closest('a, button, .nav-item, .cta-link, .logo-text, [role="button"], input[type="submit"], input[type="button"]'))) {
                isHovering = false;
                targetSize = 50; // Reset to default size
                
                // Reset to default values
                targetBorderOpacity = 0.4;
                targetBorderWidth = 1;
                targetBlur = 0.8;
                targetBrightness = 1;
                targetGlowIntensity = 0.1;
                
                // Dot defaults
                targetDotBorderOpacity = 0.5;
                targetDotGlowIntensity = 0.2;
            }
        }
    }
    
    // Use event delegation for better performance
    document.addEventListener('mouseover', handleMouseEnter, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });
    
    // Throttle mousemove for better performance
    let lastMoveTime = 0;
    const MOVE_THROTTLE = 16; // ~60fps
    
    // Update mouse position - Throttled
    document.addEventListener('mousemove', (e) => {
        const now = performance.now();
        if (now - lastMoveTime < MOVE_THROTTLE) return;
        lastMoveTime = now;
        
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        // Start animation if not already running
        if (!isAnimating) {
            isAnimating = true;
            animate();
        }
    }, { passive: true });
    
    // Optimized animation loop
    function animate() {
        // Smoothly transition size when hovering
        const sizeDiff = targetSize - currentSize;
        currentSize += sizeDiff * 0.15; // Smooth size transition
        
        // Smoothly interpolate visual properties
        const easingFactor = 0.2; // Higher = faster transition
        
        currentBorderOpacity += (targetBorderOpacity - currentBorderOpacity) * easingFactor;
        currentBorderWidth += (targetBorderWidth - currentBorderWidth) * easingFactor;
        currentBlur += (targetBlur - currentBlur) * easingFactor;
        currentBrightness += (targetBrightness - currentBrightness) * easingFactor;
        currentGlowIntensity += (targetGlowIntensity - currentGlowIntensity) * easingFactor;
        
        // Dot properties
        currentDotBorderOpacity += (targetDotBorderOpacity - currentDotBorderOpacity) * easingFactor;
        currentDotGlowIntensity += (targetDotGlowIntensity - currentDotGlowIntensity) * easingFactor;
        
        // Smoothly interpolate click scales
        clickScale += (targetClickScale - clickScale) * 0.3; // Faster transition for click
        dotClickScale += (targetDotClickScale - dotClickScale) * 0.3;
        
        // Update cursor follower size (apply click scale if clicking)
        const displaySize = currentSize * clickScale;
        cursorFollower.style.width = `${displaySize}px`;
        cursorFollower.style.height = `${displaySize}px`;
        
        // Apply smoothly interpolated visual properties - Optimized
        cursorFollower.style.borderColor = `rgba(255, 255, 255, ${currentBorderOpacity})`;
        cursorFollower.style.borderWidth = `${currentBorderWidth}px`;
        // Reduced blur for better performance
        cursorFollower.style.filter = `blur(${currentBlur * 0.5}px) brightness(${currentBrightness})`;
        
        // Simplified glow effect - Single shadow for better performance
        cursorFollower.style.boxShadow = `0 0 ${20 * currentGlowIntensity}px rgba(255, 255, 255, ${currentGlowIntensity * 0.5})`;
        
        // Update dot with smooth interpolation - Simplified
        cursorDot.style.borderColor = `rgba(255, 255, 255, ${currentDotBorderOpacity})`;
        cursorDot.style.boxShadow = `0 0 ${10 * currentDotGlowIntensity}px rgba(255, 255, 255, ${currentDotGlowIntensity * 0.6})`;
        cursorDot.style.opacity = '1';
        
        // Calculate deltas
        const circleDx = mouse.x - circle.x;
        const circleDy = mouse.y - circle.y;
        const dotDx = mouse.x - dot.x;
        const dotDy = mouse.y - dot.y;
        
        // Optimized single-pass smoothing - Much faster
        circle.x += circleDx * CIRCLE_EASING;
        circle.y += circleDy * CIRCLE_EASING;
        dot.x += dotDx * DOT_EASING;
        dot.y += dotDy * DOT_EASING;
        
        // Check if movement is significant (optimization)
        const circleDistance = Math.abs(circleDx) + Math.abs(circleDy);
        const dotDistance = Math.abs(dotDx) + Math.abs(dotDy);
        
        // Use transform3d for GPU acceleration (apply click scale to dot)
        circleTransform.transform = `translate3d(${circle.x}px, ${circle.y}px, 0) translate(-50%, -50%)`;
        dotTransform.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${dotClickScale})`;
        
        // Check if visual properties are still changing
        const borderOpacityDiff = Math.abs(targetBorderOpacity - currentBorderOpacity);
        const borderWidthDiff = Math.abs(targetBorderWidth - currentBorderWidth);
        const blurDiff = Math.abs(targetBlur - currentBlur);
        const brightnessDiff = Math.abs(targetBrightness - currentBrightness);
        const glowDiff = Math.abs(targetGlowIntensity - currentGlowIntensity);
        const dotBorderDiff = Math.abs(targetDotBorderOpacity - currentDotBorderOpacity);
        const dotGlowDiff = Math.abs(targetDotGlowIntensity - currentDotGlowIntensity);
        
        // Check if click scales are still animating
        const clickScaleDiff = Math.abs(targetClickScale - clickScale);
        const dotClickScaleDiff = Math.abs(targetDotClickScale - dotClickScale);
        
        // Continue animation if still moving, size is changing, visual properties are transitioning, or click animation is active
        const clickAnimationActive = isClicking || clickScaleDiff > 0.01 || dotClickScaleDiff > 0.01;
        if (circleDistance > 0.01 || dotDistance > 0.01 || Math.abs(sizeDiff) > 0.1 ||
            borderOpacityDiff > 0.01 || borderWidthDiff > 0.01 || blurDiff > 0.01 ||
            brightnessDiff > 0.01 || glowDiff > 0.01 || dotBorderDiff > 0.01 || dotGlowDiff > 0.01 || clickAnimationActive) {
            requestAnimationFrame(animate);
        } else {
            isAnimating = false;
        }
    }
    
    // Initialize positions
    circleTransform.transform = `translate3d(${circle.x}px, ${circle.y}px, 0) translate(-50%, -50%)`;
    dotTransform.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
    
    // Hide cursor follower when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursorFollower.style.opacity = '0';
        cursorDot.style.opacity = '0';
        isAnimating = false;
    }, { passive: true });
    
    document.addEventListener('mouseenter', () => {
        cursorFollower.style.opacity = '1';
        cursorDot.style.opacity = '1';
    }, { passive: true });
    
    // Click animation state
    let isClicking = false;
    let clickAnimationStartTime = 0;
    let clickScale = 1;
    let targetClickScale = 1;
    let dotClickScale = 1;
    let targetDotClickScale = 1;
    
    function handleClick(e) {
        if (isClicking) return; // Prevent multiple simultaneous animations
        
        isClicking = true;
        clickAnimationStartTime = performance.now();
        targetClickScale = 1.5;
        targetDotClickScale = 1.5;
        
        // Temporarily boost visual properties for click effect
        const originalBorderOpacity = targetBorderOpacity;
        const originalGlowIntensity = targetGlowIntensity;
        const originalDotBorderOpacity = targetDotBorderOpacity;
        const originalDotGlowIntensity = targetDotGlowIntensity;
        
        // Boost for click
        targetBorderOpacity = 1.0;
        targetGlowIntensity = 1.0;
        targetDotBorderOpacity = 1.0;
        targetDotGlowIntensity = 1.0;
        
        // Ensure animation loop is running
        if (!isAnimating) {
            isAnimating = true;
            animate();
        }
        
        // Reset after animation
        setTimeout(() => {
            targetClickScale = 1;
            targetDotClickScale = 1;
            targetBorderOpacity = originalBorderOpacity;
            targetGlowIntensity = originalGlowIntensity;
            targetDotBorderOpacity = originalDotBorderOpacity;
            targetDotGlowIntensity = originalDotGlowIntensity;
            
            setTimeout(() => {
                isClicking = false;
            }, 150);
        }, 200);
    }
    
    // Add click event listener
    document.addEventListener('click', handleClick, { passive: true });
    
    // Mousedown for immediate feedback
    document.addEventListener('mousedown', (e) => {
        if (isClicking) return;
        
        targetClickScale = 0.8;
        targetDotClickScale = 0.8;
        
        // Ensure animation loop is running
        if (!isAnimating) {
            isAnimating = true;
            animate();
        }
    }, { passive: true });
    
    // Mouseup to trigger expand animation
    document.addEventListener('mouseup', (e) => {
        if (isClicking) return;
        
        handleClick(e);
    }, { passive: true });
})();

