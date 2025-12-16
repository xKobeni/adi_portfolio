// Projects hover effect handler
document.addEventListener('DOMContentLoaded', async function() {
    const previewCard = document.getElementById('projectPreview');
    const previewTitle = document.getElementById('previewTitle');
    const previewSubtitle = document.getElementById('previewSubtitle');
    const previewUrl = document.getElementById('previewUrl');
    
    // Load projects data from JSON
    let projectsData = [];
    try {
        if (window.PROJECTS_LOADER) {
            projectsData = await window.PROJECTS_LOADER.loadProjectsData();
        } else {
            // Fallback: load from JSON directly
            const response = await fetch('../../data/projects.json');
            const data = await response.json();
            projectsData = data.projects || [];
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback: get from existing DOM elements
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach((item, index) => {
            const image = item.getAttribute('data-image') || '';
            const additionalContent = item.getAttribute('data-additional-content');
            let additionalContentArray = [];
            if (additionalContent) {
                try {
                    additionalContentArray = JSON.parse(additionalContent);
                } catch (e) {
                    console.error('Error parsing additional content:', e);
                }
            }
            
            projectsData.push({
                id: index,
                title: item.getAttribute('data-title'),
                subtitle: item.getAttribute('data-subtitle'),
                category: item.getAttribute('data-category'),
                url: item.getAttribute('data-url'),
                image: image,
                additionalContent: additionalContentArray
            });
        });
    }
    
    // Keep the project count in sync with available items
    const workCount = document.querySelector('.work-count');
    if (workCount) {
        const domItems = document.querySelectorAll('.project-item');
        const count = (projectsData && projectsData.length) ? projectsData.length : domItems.length;
        workCount.textContent = count.toString();
    }
    
    // Store all projects data in sessionStorage for next project navigation
    sessionStorage.setItem('allProjectsData', JSON.stringify(projectsData));
    
    // Get project items (either from DOM or dynamically created)
    const projectItems = document.querySelectorAll('.project-item');
    
    let resetTimeout = null;
    let currentHoveredItem = null;
    let changeTimeout = null;

    // Function to update preview card with smooth transition
    function updatePreview(title, subtitle, url) {
        // Cancel any pending reset or change
        if (resetTimeout) {
            clearTimeout(resetTimeout);
            resetTimeout = null;
        }
        if (changeTimeout) {
            clearTimeout(changeTimeout);
            changeTimeout = null;
        }
        
        // Check if content is changing (not initial load)
        const isChanging = previewCard.classList.contains('active') && 
                          (previewTitle.textContent !== title || 
                           previewSubtitle.textContent !== subtitle);
        
        if (isChanging) {
            // Remove any existing changing classes first to reset state
            previewTitle.classList.remove('changing');
            previewSubtitle.classList.remove('changing');
            previewUrl.classList.remove('changing');
            
            // Force reflow to ensure reset is applied
            void previewTitle.offsetHeight;
            
            // Now fade out current content
            requestAnimationFrame(() => {
                previewTitle.classList.add('changing');
                previewSubtitle.classList.add('changing');
                previewUrl.classList.add('changing');
                
                // Wait for fade out to complete (400ms), then update content and fade in
                changeTimeout = setTimeout(() => {
                    // Update content
                    previewTitle.textContent = title;
                    previewSubtitle.textContent = subtitle;
                    if (url) {
                        previewUrl.textContent = url;
                        previewUrl.href = url;
                        previewUrl.style.display = 'block';
                    } else {
                        previewUrl.style.display = 'none';
                    }
                    
                    // Force reflow to ensure content is rendered before fade in
                    void previewTitle.offsetHeight;
                    
                    // Remove changing class to fade in
                    requestAnimationFrame(() => {
                        previewTitle.classList.remove('changing');
                        previewSubtitle.classList.remove('changing');
                        previewUrl.classList.remove('changing');
                    });
                }, 400); // Full fade out duration
            });
        } else {
            // Initial load - remove any changing classes and update content immediately
            previewTitle.classList.remove('changing');
            previewSubtitle.classList.remove('changing');
            previewUrl.classList.remove('changing');
            
            previewTitle.textContent = title;
            previewSubtitle.textContent = subtitle;
            if (url) {
                previewUrl.textContent = url;
                previewUrl.href = url;
                previewUrl.style.display = 'block';
            } else {
                previewUrl.style.display = 'none';
            }
        }
        
        // Add active class immediately for smooth transition
        previewCard.classList.add('active');
    }

    // Function to reset preview card
    function resetPreview() {
        // Cancel any pending reset
        if (resetTimeout) {
            clearTimeout(resetTimeout);
        }
        
        previewCard.classList.remove('active');
        
        // Only reset content after animation completes (300ms matches CSS transition)
        resetTimeout = setTimeout(() => {
            // Double-check that we're still not hovering
            if (!previewCard.classList.contains('active') && currentHoveredItem === null) {
                previewTitle.textContent = 'Select a project';
                previewSubtitle.textContent = 'Hover over a project to see details';
                previewUrl.textContent = '';
                previewUrl.href = '#';
                previewUrl.style.display = 'none';
            }
            resetTimeout = null;
        }, 350);
    }

    // Add hover and click event listeners to each project item
    projectItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            currentHoveredItem = this;
            const title = this.getAttribute('data-title');
            const subtitle = this.getAttribute('data-subtitle');
            const url = this.getAttribute('data-url');
            updatePreview(title, subtitle, url);
        });
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.getAttribute('data-title');
            const subtitle = this.getAttribute('data-subtitle');
            const category = this.getAttribute('data-category');
            const url = this.getAttribute('data-url');
            const image = this.getAttribute('data-image') || '';
            const additionalContent = this.getAttribute('data-additional-content');
            
            // Parse additional content if provided
            let additionalContentArray = [];
            if (additionalContent) {
                try {
                    additionalContentArray = JSON.parse(additionalContent);
                } catch (e) {
                    console.error('Error parsing additional content:', e);
                }
            }
            
            // Store project data in sessionStorage for the detail page
            sessionStorage.setItem('projectData', JSON.stringify({
                title: title,
                subtitle: subtitle,
                category: category,
                url: url,
                image: image,
                additionalContent: additionalContentArray
            }));
            
            // Store current project index for next project navigation
            sessionStorage.setItem('currentProjectIndex', index.toString());
            
            // Set flag to skip loading screen animation (use fade transition instead)
            sessionStorage.setItem('pageTransition', 'fadeIn');
            
            // Navigate to project detail page
            window.location.href = 'project-detail.html';
        });

        item.addEventListener('mouseleave', function(event) {
            // Check if mouse is moving to another project item
            const relatedTarget = event.relatedTarget;
            const isMovingToAnotherItem = relatedTarget && relatedTarget.closest('.project-item');
            
            // Only reset if we're leaving the currently hovered item AND not moving to another item
            if (currentHoveredItem === this && !isMovingToAnotherItem) {
                currentHoveredItem = null;
                resetPreview();
            } else if (currentHoveredItem === this && isMovingToAnotherItem) {
                // Don't reset, let the new item's mouseenter handle it
                currentHoveredItem = null;
            }
        });
    });

    // Preview card is not hoverable - only list items control the preview

    // Custom scrollbar visibility on scroll
    const projectsList = document.querySelector('.projects-list');
    const projectsListContainer = document.querySelector('.projects-list-container');
    let scrollTimeout = null;

    if (projectsList && projectsListContainer) {
        projectsList.addEventListener('scroll', function() {
            // Add scrolling class to show scrollbar
            projectsList.classList.add('scrolling');
            projectsListContainer.classList.add('scrolling');
            
            // Clear existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // Hide scrollbar after scrolling stops (300ms)
            scrollTimeout = setTimeout(() => {
                projectsList.classList.remove('scrolling');
                projectsListContainer.classList.remove('scrolling');
            }, 300);
        });

        // Show scrollbar on hover
        projectsListContainer.addEventListener('mouseenter', function() {
            projectsList.classList.add('scrolling');
            projectsListContainer.classList.add('scrolling');
        });

        projectsListContainer.addEventListener('mouseleave', function() {
            // Immediately hide scrollbar when mouse leaves
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            // Remove scrolling class immediately
            projectsList.classList.remove('scrolling');
            projectsListContainer.classList.remove('scrolling');
        });
    }
});

