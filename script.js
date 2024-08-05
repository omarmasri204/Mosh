// Constants
const CLASS_SHOW = 'show';
const CLASS_HIDDEN = 'hidden';
const CLASS_ARROW_DOWN = 'css-button-arrow-d-sky';
const CLASS_ARROW_UP = 'css-button-arrow--sky';

const IMAGE_SOURCES = {
  dashboard: 'images/dashboard.png',
  dashboardWhite: 'images/dashboard-w.png',
  startService: 'images/start-service.png',
  startServiceWhite: 'images/start-service-w.png',
  carInfo: 'images/car-info.png',
  carInfoWhite: 'images/car-info-w.png',
  checkCar: 'images/Check-car.png',
  checkCarWhite: 'images/Check-car-w.png',
};

// Function to toggle dropdown content and button arrow
function toggleDropdownContent(dropdownId, buttonId, otherDropdownId, otherButtonId) {
  const dropdownContent = document.getElementById(dropdownId);
  const btnArrowUp = document.getElementById(buttonId);
  const otherDropdownContent = document.getElementById(otherDropdownId);
  const otherBtnArrowUp = document.getElementById(otherButtonId);

  if (dropdownContent && btnArrowUp && otherDropdownContent && otherBtnArrowUp) {
    dropdownContent.classList.toggle(CLASS_SHOW);
    btnArrowUp.classList.toggle(CLASS_ARROW_DOWN);
    btnArrowUp.classList.toggle(CLASS_ARROW_UP);

    // Close the other dropdown
    otherDropdownContent.classList.remove(CLASS_SHOW);
    otherBtnArrowUp.classList.remove(CLASS_ARROW_UP);
    otherBtnArrowUp.classList.add(CLASS_ARROW_DOWN);
  }
}

// Function to handle mouseover and mouseout events for buttons
function handleButtonMouseEvents(buttonId, iconId, imageSourceWhite, imageSourceDefault) {
  const button = document.getElementById(buttonId);
  const icon = document.getElementById(iconId);

  if (button && icon) {
    button.addEventListener('mouseover', () => {
      icon.src = imageSourceWhite;
    });

    button.addEventListener('mouseout', () => {
      icon.src = imageSourceDefault;
    });
  }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Dropdown content and button arrow toggles
  const usersButton = document.getElementById('usersButton');
  const woButton = document.getElementById('woButton');

  usersButton.addEventListener('click', () => {
    toggleDropdownContent('usersDropdown', 'usersButton', 'woDropdown', 'woButton');
  });

  woButton.addEventListener('click', () => {
    toggleDropdownContent('woDropdown', 'woButton', 'usersDropdown', 'usersButton');
  });

  // Button mouseover and mouseout events
  handleButtonMouseEvents('dash-btn', 'dash-icon', IMAGE_SOURCES.dashboardWhite, IMAGE_SOURCES.dashboard);
  handleButtonMouseEvents('add-car-btn', 'add-car-icon', IMAGE_SOURCES.startServiceWhite, IMAGE_SOURCES.startService);
  handleButtonMouseEvents('car-status-btn', 'car-status-icon', IMAGE_SOURCES.carInfoWhite, IMAGE_SOURCES.carInfo);
  handleButtonMouseEvents('view-car-list-btn', 'view-car-list-icon', IMAGE_SOURCES.checkCarWhite, IMAGE_SOURCES.checkCar);

  // Toggle menu
  const dropMenuButton = document.querySelector('.drop-menu');
  const slideMenu = document.querySelector('.l-menu');

  dropMenuButton.addEventListener('click', () => {
    slideMenu.classList.toggle(CLASS_HIDDEN);
  });
});

// Handle window resize
const lMenu = document.querySelector('.l-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');

window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    lMenu.classList.add(CLASS_HIDDEN);
    closeMenuBtn.classList.remove(CLASS_HIDDEN);
  } else {
    lMenu.classList.remove(CLASS_HIDDEN);
    closeMenuBtn.classList.add(CLASS_HIDDEN);
  }
});

// Check screen width on page load
if (window.innerWidth < 768) {
  lMenu.classList.add(CLASS_HIDDEN);
  closeMenuBtn.classList.remove(CLASS_HIDDEN);
}

// Close menu button event listener
closeMenuBtn.addEventListener('click', () => {
  lMenu.classList.add(CLASS_HIDDEN);
});

const addCarBtn = document.getElementById('add-car-btn');
const addCarWindow = document.getElementById('add-car-window');

addCarBtn.addEventListener('click', () => {
  addCarWindow.classList.toggle('hidden');
  addCarWindow.classList.toggle('slide-in');
});

const currentYear = new Date().getFullYear();
const minYear = 1890;
const maxYear = currentYear + 1;
document.getElementById('car-year').max = maxYear;
document.getElementById('car-year').min = minYear;
document.getElementById('car-year').addEventListener('input', (e) => {
  const year = parseInt(e.target.value, 10);
  if (year < minYear || year > maxYear) {
    e.target.setCustomValidity(`Please enter a year between ${minYear} and ${maxYear}`);
  } else {
    e.target.setCustomValidity('');
  }
});

const addWorkerBtn = document.getElementById('add-worker-btn');
addWorkerBtn.addEventListener('click', () => {
  console.log('Add worker button clicked!');
  const addWorkerWindow = document.getElementById('add-worker-window');
  addWorkerWindow.classList.toggle('slide-in');
});