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

let currentFloatingWindow = null;

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
  if (currentFloatingWindow === addCarWindow) {
    addCarWindow.classList.toggle('hidden');
    addCarWindow.classList.toggle('slide-in');
  } else {
    if (currentFloatingWindow) {
      currentFloatingWindow.classList.add('hidden');
      currentFloatingWindow.classList.remove('slide-in');
    }
    currentFloatingWindow = addCarWindow;
    addCarWindow.classList.toggle('hidden');
    addCarWindow.classList.toggle('slide-in');
  }
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
  if (currentFloatingWindow === addWorkerWindow) {
    addWorkerWindow.classList.toggle('hidden');
    addWorkerWindow.classList.toggle('slide-in');
  } else {
    if (currentFloatingWindow) {
      currentFloatingWindow.classList.add('hidden');
      currentFloatingWindow.classList.remove('slide-in');
    }
    currentFloatingWindow = addWorkerWindow;
    addWorkerWindow.classList.toggle('hidden');
    addWorkerWindow.classList.toggle('slide-in');
  }
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
  addWorkerWindow.classList.toggle('hidden');
  addWorkerWindow.classList.toggle('slide-in');
});

let cars = [];
addCarForm = document.getElementById('add-car-form');
addCarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const carPlateNumber = document.getElementById('car-plate-number').value;
  const carMake = document.getElementById('car-make').value;
  const carModel = document.getElementById('car-model').value;
  const carYear = document.getElementById('car-year').value;
  const carColor = document.getElementById('car-color').value;
  const carMileage = document.getElementById('car-mileage').value;
  const carOwner = document.getElementById('car-owner').value;
  const carNotes = document.getElementById('car-notes').value;

  if (checkPlateNumberExists(carPlateNumber)) {
    alert('Car plate number already exists!');
    return;
  }

  const newCar = {
    plateNumber: carPlateNumber,
    make: carMake,
    model: carModel,
    year: carYear,
    color: carColor,
    mileage: carMileage,
    owner: carOwner,
    notes: carNotes
  };

  // Store the new car in local storage
const carData = JSON.parse(localStorage.getItem('carData')) || [];
carData.push(newCar);
localStorage.setItem('carData', JSON.stringify(carData));

  cars.push(newCar);

  populateCarList();

  addCarWindow.classList.add('hidden');
  addCarWindow.classList.remove('slide-in');

  addCarForm.reset();
});


function checkPlateNumberExists(plateNumber) {
  const storedCarData = localStorage.getItem('carData');
  if (storedCarData) {
    const carData = JSON.parse(storedCarData);
    if (carData.some((car) => car.plateNumber === plateNumber)) {
      return true;
    }
  }
  return cars.some((car) => car.plateNumber === plateNumber);
}

function populateCarList() {
  document.getElementById('car-list-tbody').innerHTML = ''; // Clear the tbody
  cars.forEach((car) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${car.plateNumber}</td>
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
  if (currentFloatingWindow === carListWindow) {
    carListWindow.classList.toggle('hidden');
    carListWindow.classList.toggle('slide-in');
  } else {
    if (currentFloatingWindow) {
      currentFloatingWindow.classList.add('hidden');
      currentFloatingWindow.classList.remove('slide-in');
    }
    currentFloatingWindow = carListWindow;
    carListWindow.classList.toggle('hidden');
    carListWindow.classList.toggle('slide-in');
    populateCarList();
  }
  const storedCarData = localStorage.getItem('carData');
  if (storedCarData) {
    const carData = JSON.parse(storedCarData);
    carData.forEach((car) => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${car.plateNumber}</td> <!-- Add plate number column -->
        <td>${car.make}</td>
        <td>${car.model}</td>
        <td>${car.year}</td>
        <td>${car.color}</td>
        <td>${car.mileage}</td>
        <td>${car.owner}</td>
        <td>${car.notes}</td>
      `;
      carListTableBody.appendChild(row);
    });
  }
});

document.getElementById('car-list-close-btn').addEventListener('click', function() {
  carListWindow.classList.toggle('hidden');
  carListWindow.classList.toggle('slide-in');
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

  // Store the new worker in local storage
  const workerData = JSON.parse(localStorage.getItem('workerData')) || [];
  workerData.push(newWorker);
  localStorage.setItem('workerData', JSON.stringify(workerData));

  workers.push(newWorker);

  populateWorkerList();

  addWorkerWindow.classList.toggle('slide-in');
  addWorkerForm.reset();
addWorkerWindow.classList.toggle('hidden');
});

function populateWorkerList() {
  document.getElementById('worker-list-tbody').innerHTML = ''; // Clear the tbody
  const storedWorkerData = localStorage.getItem('workerData');
  if (storedWorkerData) {
    const workerData = JSON.parse(storedWorkerData);
    workerData.forEach((worker) => {
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
}

const workerListWindow = document.getElementById('worker-list-window');

document.getElementById('view-worker-list-btn').addEventListener('click', function() {
  if (currentFloatingWindow === workerListWindow) {
    workerListWindow.classList.toggle('hidden');
    workerListWindow.classList.toggle('slide-in');
  } else {
    if (currentFloatingWindow) {
      currentFloatingWindow.classList.add('hidden');
      currentFloatingWindow.classList.remove('slide-in');
    }
    currentFloatingWindow = workerListWindow;
    workerListWindow.classList.toggle('hidden');
    workerListWindow.classList.toggle('slide-in');
    populateWorkerList();
  }
});

document.getElementById('worker-list-close-btn').addEventListener('click', function() {
  workerListWindow.classList.toggle('hidden');
  workerListWindow.classList.toggle('slide-in');
});

const dashBtn = document.getElementById('dash-btn');
const carAnimationDiv = document.getElementById('car-animation');

dashBtn.addEventListener('click', () => {
  carAnimationDiv.classList.add('bounce');
  setTimeout(() => {
    carAnimationDiv.classList.remove('bounce');
  }, 500); // remove the class after 500ms (same duration as the animation)
});


document.getElementById('clear-local-storage-btn').addEventListener('click', () => {
  localStorage.clear();
  alert('Local storage cleared!');
});

document.getElementById('view-local-storage-btn').addEventListener('click', () => {
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorageData[key] = localStorage.getItem(key);
  }
  const localStorageString = JSON.stringify(localStorageData, null, 2);
  const newPage = window.open('', '_blank');
  newPage.document.write(`<html><body><pre>${localStorageString}</pre></body></html>`);
  newPage.document.close();
});

checkCarStatusWindow = document.getElementById('check-car-status-window');
document.getElementById('car-status-btn').addEventListener('click', () => {
  if (currentFloatingWindow === checkCarStatusWindow) {
    checkCarStatusWindow.classList.toggle('hidden');
    checkCarStatusWindow.classList.toggle('slide-in');
  } else {
    if (currentFloatingWindow) {
      currentFloatingWindow.classList.add('hidden');
      currentFloatingWindow.classList.remove('slide-in');
    }
    currentFloatingWindow = checkCarStatusWindow;
    checkCarStatusWindow.classList.toggle('hidden');
    checkCarStatusWindow.classList.toggle('slide-in');
  }
});

document.getElementById('check-car-status-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const carPlateNumber = document.getElementById('check-car-plate-number').value;
  const storedCarData = localStorage.getItem('carData');
  const carData = JSON.parse(storedCarData) || [];

  const matchingCar = carData.find((car) => car.plateNumber === carPlateNumber);

  if (matchingCar) {
    alert('The car is still fixing.');
  } else {
    alert('The car is with its owner.');
  }
});
  // Close the window after submitting the form
  document.getElementById('check-car-status-close-btn').addEventListener('click', () => {
    document.getElementById('check-car-status-window').classList.toggle('hidden');
    document.getElementById('check-car-status-window').classList.toggle('slide-in');
  });