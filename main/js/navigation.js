// Load shared components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('../html/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('Error loading header:', error));
});

