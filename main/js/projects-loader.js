// Projects Data Loader
// This file loads project data from JSON and makes it available globally

let PROJECTS_DATA = [];
let projectsLoaded = false;

// Function to load projects from JSON file
async function loadProjectsData() {
    if (projectsLoaded && PROJECTS_DATA.length > 0) {
        return PROJECTS_DATA;
    }
    
    try {
        const response = await fetch('../../data/projects.json');
        if (!response.ok) {
            throw new Error('Failed to load projects data');
        }
        const data = await response.json();
        PROJECTS_DATA = data.projects || [];
        projectsLoaded = true;
        return PROJECTS_DATA;
    } catch (error) {
        console.error('Error loading projects data:', error);
        // Return empty array if loading fails
        return [];
    }
}

// Function to get project by ID
function getProjectById(id) {
    return PROJECTS_DATA.find(project => project.id === id);
}

// Function to get project by index
function getProjectByIndex(index) {
    return PROJECTS_DATA[index];
}

// Function to get all projects
function getAllProjects() {
    return PROJECTS_DATA;
}

// Initialize loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjectsData);
} else {
    loadProjectsData();
}

// Export functions for use in other scripts
window.PROJECTS_LOADER = {
    loadProjectsData,
    getProjectById,
    getProjectByIndex,
    getAllProjects,
    getProjects: () => PROJECTS_DATA
};

