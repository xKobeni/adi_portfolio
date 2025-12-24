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
        
        // Find the projects list container
        const projectsList = document.querySelector('.projects-list');
        if (!projectsList) {
            console.error('Projects list container not found');
            return;
        }
        
        // Clear existing items (if any)
        projectsList.innerHTML = '';
        
        // Update project count
        const workCount = document.querySelector('.work-count');
        if (workCount) {
            workCount.textContent = projectsData.length;
        }
        
        // Render each project
        projectsData.forEach((project, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'project-item flex justify-between items-center py-5 min-h-[60px] border-b border-white/10 cursor-pointer relative animate-project-item';
            
            // Set data attributes
            listItem.setAttribute('data-project-id', project.id);
            listItem.setAttribute('data-title', project.title);
            listItem.setAttribute('data-subtitle', project.subtitle);
            listItem.setAttribute('data-category', project.category);
            listItem.setAttribute('data-url', project.url);
            if (project.image) {
                listItem.setAttribute('data-image', project.image);
            }
            if (project.additionalContent && project.additionalContent.length > 0) {
                listItem.setAttribute('data-additional-content', JSON.stringify(project.additionalContent));
            }
            
            // Create project name span
            const projectName = document.createElement('span');
            projectName.className = 'project-name';
            projectName.textContent = project.title.toLowerCase();
            
            // Create project category span
            const projectCategory = document.createElement('span');
            projectCategory.className = 'project-category';
            projectCategory.textContent = project.category.toUpperCase();
            
            // Append to list item
            listItem.appendChild(projectName);
            listItem.appendChild(projectCategory);
            
            // Append to projects list
            projectsList.appendChild(listItem);
        });
        
        // Store all projects data for navigation
        sessionStorage.setItem('allProjectsData', JSON.stringify(projectsData));
        
        // Re-initialize hover handlers after rendering
        if (typeof initProjectsHover === 'function') {
            initProjectsHover();
        }
        
    } catch (error) {
        console.error('Error rendering projects:', error);
    }
}

// Auto-render if projects list exists and is empty, or if data-auto-render attribute is present
document.addEventListener('DOMContentLoaded', function() {
    const projectsList = document.querySelector('.projects-list');
    const autoRender = document.querySelector('[data-auto-render-projects]');
    
    if (autoRender || (projectsList && projectsList.children.length === 0)) {
        renderProjectsFromJSON();
    }
});

