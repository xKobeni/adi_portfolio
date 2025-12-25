// Projects Renderer
// Dynamically renders project items from JSON data

async function renderProjectsFromJSON() {
    try {
        // Load projects data
        let projectsData = [];
        if (window.PROJECTS_LOADER) {
            projectsData = await window.PROJECTS_LOADER.loadProjectsData();
        } else {
            const response = await fetch('../../data/projects.json');
            const data = await response.json();
            projectsData = data.projects || [];
        }
        
        // Find the projects grid container
        const projectsGrid = document.querySelector('.projects-grid-container');
        if (!projectsGrid) {
            console.error('Projects grid container not found');
            return;
        }
        
        // Clear existing items (if any)
        projectsGrid.innerHTML = '';
        
        // Update project count
        const workCount = document.getElementById('projectsCount') || document.querySelector('.work-count');
        if (workCount) {
            workCount.textContent = projectsData.length;
        }
        
        // Helper function to get project image
        function getProjectImage(project) {
            if (project.image && project.image.trim() !== '') {
                return project.image;
            }
            // Fallback to first image from additionalContent
            if (project.additionalContent && Array.isArray(project.additionalContent)) {
                const firstImage = project.additionalContent.find(content => content.type === 'image' && content.src);
                if (firstImage && firstImage.src) {
                    return firstImage.src;
                }
            }
            return '';
        }
        
        // Render each project as a card
        projectsData.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card animate-project-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Set data attributes
            card.setAttribute('data-project-id', project.id);
            card.setAttribute('data-title', project.title);
            card.setAttribute('data-subtitle', project.subtitle);
            card.setAttribute('data-category', project.category);
            card.setAttribute('data-url', project.url);
            if (project.image) {
                card.setAttribute('data-image', project.image);
            }
            if (project.additionalContent && project.additionalContent.length > 0) {
                card.setAttribute('data-additional-content', JSON.stringify(project.additionalContent));
            }
            
            const projectImage = getProjectImage(project);
            
            // Create card HTML structure
            card.innerHTML = `
                <div class="project-card-image-wrapper">
                    ${projectImage ? `<img src="${projectImage}" alt="${project.title}" class="project-card-image" loading="lazy">` : '<div class="project-card-image-placeholder"></div>'}
                    <div class="project-card-overlay"></div>
                </div>
                <div class="project-card-content">
                    <div class="project-card-category">${project.category}</div>
                    <h3 class="project-card-title">${project.title}</h3>
                    <p class="project-card-description">${project.subtitle}</p>
                    <div class="project-card-footer">
                        <span class="project-card-link">View Project</span>
                    </div>
                </div>
            `;
            
            // Add click handler
            card.addEventListener('click', function(e) {
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
            
            // Append to grid
            projectsGrid.appendChild(card);
        });
        
        // Store all projects data for navigation
        sessionStorage.setItem('allProjectsData', JSON.stringify(projectsData));
        
    } catch (error) {
        console.error('Error rendering projects:', error);
    }
}

// Auto-render if projects grid exists and is empty, or if data-auto-render attribute is present
document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.querySelector('.projects-grid-container');
    const autoRender = document.querySelector('[data-auto-render-projects]');
    
    if (autoRender || (projectsGrid && projectsGrid.children.length === 0)) {
        renderProjectsFromJSON();
    }
});

