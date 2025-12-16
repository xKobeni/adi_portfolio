// const cards = document.querySelectorAll('.card');
// const cardsContainer = document.querySelector('.cards-container');

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('show');
//         }
//     });
// }, {
//     threshold: 0.1
// });

// cards.forEach(card => observer.observe(card));

// function updateActiveCard() {
//     const containerRect = cardsContainer.getBoundingClientRect();
//     const containerTop = containerRect.top;
//     const containerBottom = containerRect.bottom;

//     cards.forEach(card => {
//         const cardRect = card.getBoundingClientRect();
//         const cardTop = cardRect.top - containerTop;
//         const cardBottom = cardRect.bottom - containerTop;

//         if (cardTop <= 0 && cardBottom > 0) {
//             card.classList.add('active');
//         } else {
//             card.classList.remove('active');
//         }
//     });
// }

// window.addEventListener('scroll', updateActiveCard);
// window.addEventListener('resize', updateActiveCard);


// Only run card animations if cards exist on the page
const cards = document.querySelectorAll('.card');
const cardsContainer = document.querySelector('.cards-container');

if (cards.length > 0 && cardsContainer) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {
        observer.observe(card);
        card.style.zIndex = cards.length - index; // Stacks the cards properly
    });

    // Throttle function for performance
    function throttle(func, wait) {
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

    // Use requestAnimationFrame for smooth updates
    let rafId = null;
    function updateActiveCard() {
        if (rafId) return;
        
        rafId = requestAnimationFrame(() => {
        const containerRect = cardsContainer.getBoundingClientRect();
        
        let activeIndex = -1;

        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardTop = cardRect.top - containerRect.top;
            const cardBottom = cardRect.bottom - containerRect.top;

            if (cardTop <= 0 && cardBottom > 0) {
                activeIndex = index;
            }
        });

        cards.forEach((card, index) => {
            if (index === activeIndex) {
                card.classList.add('active');
                    card.style.transform = `translate3d(0, 0, 0) scale(1)`;
            } else {
                const scaleFactor = 1 - (index - activeIndex) * 0.05;
                const translateY = (index - activeIndex) * 20;
                    card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scaleFactor})`;
            }
        });
            
            rafId = null;
        });
    }

    // Throttled scroll handler
    const throttledUpdate = throttle(updateActiveCard, 16); // ~60fps
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    
    // Debounced resize handler
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateActiveCard, 150);
    }
    window.addEventListener('resize', handleResize, { passive: true });
    
    updateActiveCard(); // Initial call to set correct stacking
}





// Smooth scrolling on navigation links - Optimized
let lastScrollTop = 0;
let ticking = false;
const navbar = document.querySelector("nav");

if (navbar) {
    function updateNavbar() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling Down
            navbar.style.opacity = "0";
            navbar.style.pointerEvents = "none";
        } else {
            // Scrolling Up
            navbar.style.opacity = "1";
            navbar.style.pointerEvents = "auto";
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}



