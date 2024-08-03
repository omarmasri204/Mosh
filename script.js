// Constants for class names and image sources
const CLASS_SHOW = 'show';
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
function toggleDropdownContent(dropdownId, buttonId) {
  const dropdownContent = document.getElementById(dropdownId);
  const btnArrowUp = document.getElementById(buttonId);

  if (dropdownContent && btnArrowUp) {
    dropdownContent.classList.toggle(CLASS_SHOW);
    btnArrowUp.classList.toggle(CLASS_ARROW_DOWN);
    btnArrowUp.classList.toggle(CLASS_ARROW_UP);
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
  document.getElementById('usersButton').addEventListener('click', () => {
    toggleDropdownContent('usersDropdown', 'usersButton');
  });

  document.getElementById('woButton').addEventListener('click', () => {
    toggleDropdownContent('woDropdown', 'woButton');
  });

  // Button mouseover and mouseout events
  handleButtonMouseEvents('dash-btn', 'dash-icon', IMAGE_SOURCES.dashboardWhite, IMAGE_SOURCES.dashboard);
  handleButtonMouseEvents('add-car-btn', 'add-car-icon', IMAGE_SOURCES.startServiceWhite, IMAGE_SOURCES.startService);
  handleButtonMouseEvents('car-status-btn', 'car-status-icon', IMAGE_SOURCES.carInfoWhite, IMAGE_SOURCES.carInfo);
  handleButtonMouseEvents('view-car-list-btn', 'view-car-list-icon', IMAGE_SOURCES.checkCarWhite, IMAGE_SOURCES.checkCar);



  const dropMenuButton = document.querySelector('.drop-menu');
  const slideMenu = document.querySelector('.l-menu');

  dropMenuButton.addEventListener('click', () => {
    slideMenu.classList.toggle(CLASS_SHOW);
  });
});