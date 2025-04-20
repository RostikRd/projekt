document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });

    // Initialize filters
    const filterForm = document.querySelector('.filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', handleFilterSubmit);
    }

    // Initialize match cards
    const matchCards = document.querySelectorAll('.match-card');
    matchCards.forEach(card => {
        card.addEventListener('click', handleMatchCardClick);
    });

    // Initialize responsive menu
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
});

// Tooltip functions
function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    document.body.appendChild(tooltip);

    const rect = this.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Filter handling
function handleFilterSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams(formData);
    window.location.href = `${window.location.pathname}?${params.toString()}`;
}

// Match card interaction
function handleMatchCardClick(e) {
    const card = e.currentTarget;
    card.classList.add('active');
    
    // Add animation class
    card.classList.add('pulse');
    setTimeout(() => {
        card.classList.remove('pulse');
    }, 500);
}

// Responsive menu
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add loading animation
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Error:', e.message);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = 'An error occurred. Please try again.';
    document.body.appendChild(errorDiv);
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
});

// Add dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.addEventListener('click', toggleDarkMode);
document.body.appendChild(darkModeToggle);

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

// Add animations
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
} 