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

const inputFields = document.querySelectorAll('input');

inputFields.forEach((input) => {
  input.setAttribute('required', '');
});

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
const minYearCar = 1890;
const maxYearCar = currentYear + 1;
document.getElementById('car-year').max = maxYearCar;
document.getElementById('car-year').min = minYearCar;
document.getElementById('car-year').addEventListener('input', (e) => {
  const year = parseInt(e.target.value, 10);
  if (year < minYearCar || year > maxYearCar) {
    e.target.setCustomValidity(`Please enter a year between ${minYearCar} and ${maxYearCar}`);
  } else {
    e.target.setCustomValidity('');
  }
});

const maxYearBirth = currentYear - 17;
const maxDate = `${maxYearBirth}-12`;
document.getElementById('worker-birthdate').max = maxDate;


const addWorkerBtn = document.getElementById('add-worker-btn');
addWorkerBtn.addEventListener('click', () => {
  console.log('Add worker button clicked!');
  const addWorkerWindow = document.getElementById('add-worker-window');
  addWorkerWindow.classList.toggle('slide-in');
});


// Add close button to add-car-window
const addCarCloseBtn = document.getElementById('add-car-close-btn');
addCarCloseBtn.addEventListener('click', () => {
  addCarWindow.classList.toggle('hidden');
  addCarWindow.classList.toggle('slide-in');
});

// Add close button to add-worker-window
const addWorkerCloseBtn = document.getElementById('add-worker-close-btn');
const addWorkerWindow = document.getElementById('add-worker-window');
addWorkerCloseBtn.addEventListener('click', () => {
  addWorkerWindow.classList.toggle('slide-in');
});

let cars = [];
addCarForm = document.getElementById('add-car-form');
addCarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const carMake = document.getElementById('car-make').value;
  const carModel = document.getElementById('car-model').value;
  const carYear = document.getElementById('car-year').value;
  const carColor = document.getElementById('car-color').value;
  const carMileage = document.getElementById('car-mileage').value;
  const carOwner = document.getElementById('car-owner').value;
  const carNotes = document.getElementById('car-notes').value;

  const newCar = {
    make: carMake,
    model: carModel,
    year: carYear,
    color: carColor,
    mileage: carMileage,
    owner: carOwner,
    notes: carNotes
  };

  cars.push(newCar);

  populateCarList();

  addCarWindow.classList.toggle('hidden');
  addCarWindow.classList.toggle('slide-in');

  addCarForm.reset();
});

function populateCarList() {
  document.getElementById('car-list-tbody').innerHTML = ''; // Clear the tbody
  cars.forEach((car) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${car.make}</td>
      <td>${car.model}</td>
      <td>${car.year}</td>
      <td>${car.color}</td>
      <td>${car.mileage}</td>
      <td>${car.owner}</td>
      <td>${car.notes}</td>
    `;
    document.getElementById('car-list-tbody').appendChild(row);
  });
}

const carListWindow = document.getElementById('car-list-window');

document.getElementById('view-car-list-btn').addEventListener('click', function() {
  carListWindow.classList.toggle('hidden');
  carListWindow.classList.toggle('slide-in');
  populateCarList();
});

document.getElementById('car-list-close-btn').addEventListener('click', function() {
  carListWindow.classList.add('hidden');
  carListWindow.classList.remove('slide-in');
});

// Worker list
let workers = [];
addWorkerForm = document.getElementById('add-worker-form');
addWorkerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const workerName = document.getElementById('worker-name').value;
  const workerBirthdate = document.getElementById('worker-birthdate').value;
  const workerAddress = document.getElementById('worker-address').value;
  const workerPhone = document.getElementById('worker-phone').value;
  const workerId = document.getElementById('worker-id-number').value;
  const workerCV = document.getElementById('CV').value;

  const newWorker = {
    name: workerName,
    phone: workerPhone,
    address: workerAddress,
    id: workerId,
    birthdate: workerBirthdate,
    notes: workerCV
  };

  workers.push(newWorker);

  populateWorkerList();

  addWorkerWindow.classList.toggle('slide-in');

  addWorkerForm.reset();
});

function populateWorkerList() {
  document.getElementById('worker-list-tbody').innerHTML = ''; // Clear the tbody
  workers.forEach((worker) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${worker.name}</td>
      <td>${worker.phone}</td>
      <td>${worker.address}</td>
      <td>${worker.id}</td>
      <td>${worker.birthdate}</td>
      <td>${worker.notes}</td>
    `;
    document.getElementById('worker-list-tbody').appendChild(row);
  });
}

const workerListWindow = document.getElementById('worker-list-window');

document.getElementById('view-worker-list-btn').addEventListener('click', function() {
  workerListWindow.classList.toggle('hidden');
  workerListWindow.classList.toggle('slide-in');
  populateWorkerList();
});

document.getElementById('worker-list-close-btn').addEventListener('click', function() {
  workerListWindow.classList.add('hidden');
  workerListWindow.classList.remove('slide-in');
});

const dashBtn = document.getElementById('dash-btn');
const carAnimationDiv = document.getElementById('car-animation');

dashBtn.addEventListener('click', () => {
  carAnimationDiv.classList.add('bounce');
  setTimeout(() => {
    carAnimationDiv.classList.remove('bounce');
  }, 500); // remove the class after 500ms (same duration as the animation)
});