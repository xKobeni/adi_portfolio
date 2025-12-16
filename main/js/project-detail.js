// Project Detail Page Handler
document.addEventListener('DOMContentLoaded', function() {
    // Add class to body for project detail page styling
    document.body.classList.add('project-detail-page');
    
    // Ensure back button is clickable
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            // Ensure the link works
            e.stopPropagation();
            // Let the page-transitions.js handle the transition if it's an internal link
            // Otherwise, allow default navigation
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                // Set transition flag
                sessionStorage.setItem('pageTransition', 'fadeIn');
            }
        }, true); // Use capture phase to ensure it runs
    }
    
    // Get project data from sessionStorage
    const projectDataStr = sessionStorage.getItem('projectData');
    const currentProjectIndex = parseInt(sessionStorage.getItem('currentProjectIndex')) || 0;
    
    if (projectDataStr) {
        try {
            const projectData = JSON.parse(projectDataStr);
            
            // Update page content
            const titleEl = document.getElementById('projectTitle');
            const categoryEl = document.getElementById('projectCategory');
            const descriptionEl = document.getElementById('projectDescription');
            const urlEl = document.getElementById('projectUrl');
            const imageEl = document.getElementById('projectImage');
            const additionalContentEl = document.getElementById('additionalContent');
            
            if (titleEl) titleEl.textContent = projectData.title || 'Project';
            if (categoryEl) categoryEl.textContent = projectData.category || '';
            if (descriptionEl) descriptionEl.textContent = projectData.subtitle || '';
            
            // Handle project image
            if (imageEl) {
                if (projectData.image) {
                    imageEl.src = projectData.image;
                    imageEl.alt = projectData.title || 'Project image';
                    imageEl.style.display = 'block';
                    // Ensure image container has animation class
                    const imageContainer = imageEl.closest('.project-detail-image-container');
                    if (imageContainer && !imageContainer.classList.contains('animate-project-image')) {
                        imageContainer.classList.add('animate-project-image');
                    }
                } else {
                    imageEl.style.display = 'none';
                }
            }
            
            // Handle additional content sections
            if (additionalContentEl && projectData.additionalContent && Array.isArray(projectData.additionalContent)) {
                additionalContentEl.innerHTML = '';
                projectData.additionalContent.forEach((section, index) => {
                    const sectionDiv = document.createElement('div');
                    // Add staggered animation classes based on index
                    // Use delay-4, delay-5, delay-6, delay-7 for additional sections
                    const delayClass = index < 4 ? `animate-fade-in-delay-${index + 4}` : 'animate-fade-in-delay-7';
                    sectionDiv.className = `project-additional-section mb-12 ${delayClass}`;
                    
                    if (section.type === 'image' && section.src) {
                        const img = document.createElement('img');
                        img.src = section.src;
                        img.alt = section.alt || `Project detail ${index + 1}`;
                        img.className = 'project-additional-image w-full h-auto rounded-lg';
                        sectionDiv.appendChild(img);
                    } else if (section.type === 'text' && section.content) {
                        const textDiv = document.createElement('div');
                        textDiv.className = 'project-additional-text text-white/90';
                        textDiv.innerHTML = section.content;
                        sectionDiv.appendChild(textDiv);
                    } else if (section.type === 'image-text' && section.src && section.content) {
                        const img = document.createElement('img');
                        img.src = section.src;
                        img.alt = section.alt || `Project detail ${index + 1}`;
                        img.className = 'project-additional-image w-full h-auto rounded-lg mb-6';
                        sectionDiv.appendChild(img);
                        
                        const textDiv = document.createElement('div');
                        textDiv.className = 'project-additional-text text-white/90';
                        textDiv.innerHTML = section.content;
                        sectionDiv.appendChild(textDiv);
                    }
                    
                    additionalContentEl.appendChild(sectionDiv);
                });
            } else if (additionalContentEl) {
                additionalContentEl.style.display = 'none';
            }
            
            if (urlEl && projectData.url) {
                urlEl.textContent = projectData.url;
                urlEl.href = projectData.url;
                urlEl.style.display = 'inline-block';
            } else if (urlEl) {
                urlEl.style.display = 'none';
            }
            
            // Handle next project navigation
            setupNextProject(currentProjectIndex).catch(err => {
                console.error('Error setting up next project:', err);
            });
            
            // Update page title
            document.title = `Adrian Perce || Portfolio - ${projectData.title}`;
            
            // Ensure page-loaded class is added for animations (in case it wasn't added yet)
            // This handles cases where content loads before page-transitions.js runs
            if (!document.body.classList.contains('page-loaded')) {
                // Check if we're coming from a navigation transition
                const isNavigation = sessionStorage.getItem('pageTransition') === 'fadeIn';
                if (!isNavigation) {
                    // For initial load, wait a bit for loading screen to finish
                    setTimeout(() => {
                        document.body.classList.add('page-loaded');
                    }, 100);
                } else {
                    // For navigation, animations will be triggered by page-transitions.js
                    // But add the class anyway as a fallback
                    document.body.classList.add('page-loaded');
                }
            }
            
            // Clear the stored data after use
            sessionStorage.removeItem('projectData');
        } catch (e) {
            console.error('Error parsing project data:', e);
            // Redirect back to projects if data is invalid
            setTimeout(() => {
                window.location.href = 'projects.html';
            }, 1000);
        }
    } else {
        // No project data, redirect back to projects
        setTimeout(() => {
            window.location.href = 'projects.html';
        }, 1000);
    }
});

// Function to setup next project navigation
async function setupNextProject(currentIndex) {
    // Get projects data from sessionStorage or load from JSON
    let projectsData = [];
    try {
        const storedProjects = sessionStorage.getItem('allProjectsData');
        if (storedProjects) {
            projectsData = JSON.parse(storedProjects);
        } else if (window.PROJECTS_LOADER) {
            // Load from JSON using projects loader
            projectsData = await window.PROJECTS_LOADER.loadProjectsData();
        } else {
            // Try to load directly from JSON
            try {
                const response = await fetch('../../data/projects.json');
                const data = await response.json();
                projectsData = data.projects || [];
            } catch (e) {
                console.error('Error loading projects:', e);
            }
        }
        
        // Fallback to default projects data if still empty
        if (projectsData.length === 0) {
            projectsData = [
                {
                    title: 'Modernizing a Subscription Management Platform',
                    subtitle: 'With a user-centered approach, the goal was to create an intuitive interface for effortless financial management while incorporating gamification.',
                    category: 'UX/UI Design',
                    url: 'https://example.com/subscription-platform',
                    image: '',
                    additionalContent: []
                },
                {
                    title: 'EmpowerPWD Platform',
                    subtitle: 'A comprehensive platform designed to empower people with disabilities through accessible technology and inclusive design.',
                    category: 'Web Development',
                    url: 'https://example.com/empowerpwd',
                    image: '',
                    additionalContent: []
                },
                {
                    title: 'E-Commerce Redesign',
                    subtitle: 'Redesigned an e-commerce platform with focus on user experience, conversion optimization, and modern design principles.',
                    category: 'UX/UI Design',
                    url: 'https://example.com/ecommerce',
                    image: '',
                    additionalContent: []
                },
                {
                    title: 'Food Delivery App',
                    subtitle: 'A food delivery app with a focus on user experience, conversion optimization, and modern design principles.',
                    category: 'UX/UI Design',
                    url: 'https://example.com/food-delivery-app',
                    image: '',
                    additionalContent: []
                },
                {
                    title: 'Event Management System',
                    subtitle: 'A event management system with a focus on user experience, conversion optimization, and modern design principles.',
                    category: 'Web Development',
                    url: 'https://example.com/event-management-system',
                    image: '',
                    additionalContent: []
                },
                {
                    title: 'Inventory Management System',
                    subtitle: 'A inventory management system with a focus on user experience, conversion optimization, and modern design principles.',
                    category: 'Web Development',
                    url: 'https://example.com/inventory-management-system',
                    image: '',
                    additionalContent: []
                }
            ];
        }
    } catch (e) {
        console.error('Error loading projects data:', e);
    }
    
    const nextIndex = currentIndex + 1;
    const nextProjectLink = document.getElementById('nextProjectLink');
    const nextProjectTitle = document.getElementById('nextProjectTitle');
    const nextProjectCategory = document.getElementById('nextProjectCategory');
    const nextProjectRow = document.querySelector('.next-project-row');
    
    if (nextIndex < projectsData.length && nextProjectLink && nextProjectTitle) {
        const nextProject = projectsData[nextIndex];
        nextProjectTitle.textContent = nextProject.title;
        if (nextProjectCategory) {
            nextProjectCategory.textContent = nextProject.category || '';
        }
        
        nextProjectLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Store next project data
            sessionStorage.setItem('projectData', JSON.stringify(nextProject));
            sessionStorage.setItem('currentProjectIndex', nextIndex.toString());
            sessionStorage.setItem('pageTransition', 'fadeIn');
            
            // Navigate to project detail page
            window.location.href = 'project-detail.html';
        });

        // Make the entire row clickable
        if (nextProjectRow) {
            nextProjectRow.addEventListener('click', function(e) {
                e.preventDefault();
                nextProjectLink.click();
            });
        }
    } else if (nextProjectLink && nextProjectTitle) {
        // No next project, hide navigation
        const nextNavContainer = document.querySelector('.project-next-navigation');
        if (nextNavContainer) {
            nextNavContainer.style.display = 'none';
        }
    }
}

