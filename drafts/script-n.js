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
let cars = [];
let workers = [];

// DOM Elements
const inputFields = document.querySelectorAll('input');
const lMenu = document.querySelector('.l-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');
const addCarBtn = document.getElementById('add-car-btn');
const addCarWindow = document.getElementById('add-car-window');
const addWorkerBtn = document.getElementById('add-worker-btn');
const addWorkerWindow = document.getElementById('add-worker-window');
const carListWindow = document.getElementById('car-list-window');
const workerListWindow = document.getElementById('worker-list-window');
const checkCarStatusWindow = document.getElementById('check-car-status-window');
const UpdateWorkerWindow = document.getElementById('update-worker-window');

// Helper Functions
function toggleDropdownContent(dropdownId, buttonId, otherDropdownId, otherButtonId) {
  const dropdownContent = document.getElementById(dropdownId);
  const btnArrowUp = document.getElementById(buttonId);
  const otherDropdownContent = document.getElementById(otherDropdownId);
  const otherBtnArrowUp = document.getElementById(otherButtonId);

  if (dropdownContent && btnArrowUp && otherDropdownContent && otherBtnArrowUp) {
    dropdownContent.classList.toggle(CLASS_SHOW);
    btnArrowUp.classList.toggle(CLASS_ARROW_DOWN);
    btnArrowUp.classList.toggle(CLASS_ARROW_UP);

    otherDropdownContent.classList.remove(CLASS_SHOW);
    otherBtnArrowUp.classList.remove(CLASS_ARROW_UP);
    otherBtnArrowUp.classList.add(CLASS_ARROW_DOWN);
  }
}

function handleButtonMouseEvents(buttonId, iconId, imageSourceWhite, imageSourceDefault) {
  const button = document.getElementById(buttonId);
  const icon = document.getElementById(iconId);

  if (button && icon) {
    button.addEventListener('mouseover', () => icon.src = imageSourceWhite);
    button.addEventListener('mouseout', () => icon.src = imageSourceDefault);
  }
}

function toggleFloatingWindow(window) {
  if (currentFloatingWindow === window) {
    window.classList.toggle(CLASS_HIDDEN);
    window.classList.toggle('slide-in');
  } else {
    if (currentFloatingWindow) {
      currentFloatingWindow.classList.add(CLASS_HIDDEN);
      currentFloatingWindow.classList.remove('slide-in');
    }
    currentFloatingWindow = window;
    window.classList.toggle(CLASS_HIDDEN);
    window.classList.toggle('slide-in');
  }
}

function checkPlateNumberExists(plateNumber) {
  const storedCarData = JSON.parse(localStorage.getItem('carData')) || [];
  return storedCarData.some((car) => car.plateNumber === plateNumber) || 
         cars.some((car) => car.plateNumber === plateNumber);
}

function populateCarList() {
  const carListTbody = document.getElementById('car-list-tbody');
  carListTbody.innerHTML = '';
  const storedCarData = JSON.parse(localStorage.getItem('carData')) || [];
  
  storedCarData.forEach((car) => {
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
    carListTbody.appendChild(row);
  });
}

function populateWorkerList() {
  const workerListTbody = document.getElementById('worker-list-tbody');
  workerListTbody.innerHTML = '';
  const storedWorkerData = JSON.parse(localStorage.getItem('workerData')) || [];
  
  storedWorkerData.forEach((worker) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${worker.name}</td>
      <td>${worker.phone}</td>
      <td>${worker.address}</td>
      <td>${worker.id}</td>
      <td>${worker.birthdate}</td>
      <td>${worker.notes}</td>
    `;
    row.addEventListener('dblclick', () => openUpdateWorkerForm(worker));
    workerListTbody.appendChild(row);
  });
}

function openUpdateWorkerForm(worker) {
    inputFields.forEach(input => input.removeAttribute('required'));
    
    // Close the worker list window
    toggleFloatingWindow(workerListWindow);
    
    // Open the update worker window
    toggleFloatingWindow(UpdateWorkerWindow);
    
    document.getElementById('updt-worker-id-number').setAttribute('disabled', true);
    document.getElementById('updt-CV').setAttribute('disabled', true);
  
    document.getElementById('updt-worker-name').value = worker.name;
    document.getElementById('updt-worker-phone').value = worker.phone;
    document.getElementById('updt-worker-address').value = worker.address;
    document.getElementById('updt-worker-id-number').value = worker.id;
    document.getElementById('updt-worker-birthdate').value = worker.birthdate;
  }

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  inputFields.forEach(input => input.setAttribute('required', ''));

  const usersButton = document.getElementById('usersButton');
  const woButton = document.getElementById('woButton');

  usersButton.addEventListener('click', () => toggleDropdownContent('usersDropdown', 'usersButton', 'woDropdown', 'woButton'));
  woButton.addEventListener('click', () => toggleDropdownContent('woDropdown', 'woButton', 'usersDropdown', 'usersButton'));

  handleButtonMouseEvents('dash-btn', 'dash-icon', IMAGE_SOURCES.dashboardWhite, IMAGE_SOURCES.dashboard);
  handleButtonMouseEvents('add-car-btn', 'add-car-icon', IMAGE_SOURCES.startServiceWhite, IMAGE_SOURCES.startService);
  handleButtonMouseEvents('car-status-btn', 'car-status-icon', IMAGE_SOURCES.carInfoWhite, IMAGE_SOURCES.carInfo);
  handleButtonMouseEvents('view-car-list-btn', 'view-car-list-icon', IMAGE_SOURCES.checkCarWhite, IMAGE_SOURCES.checkCar);

  const dropMenuButton = document.querySelector('.drop-menu');
  const slideMenu = document.querySelector('.l-menu');

  dropMenuButton.addEventListener('click', () => slideMenu.classList.toggle(CLASS_HIDDEN));
});

// Window resize handling
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
closeMenuBtn.addEventListener('click', () => lMenu.classList.add(CLASS_HIDDEN));

// Add car button event listener
addCarBtn.addEventListener('click', () => toggleFloatingWindow(addCarWindow));

// Car year input validation
const currentYear = new Date().getFullYear();
const minYearCar = 1890;
const maxYearCar = currentYear + 1;
const carYearInput = document.getElementById('car-year');
carYearInput.max = maxYearCar;
carYearInput.min = minYearCar;
carYearInput.addEventListener('input', (e) => {
  const year = parseInt(e.target.value, 10);
  if (year < minYearCar || year > maxYearCar) {
    e.target.setCustomValidity(`Please enter a year between ${minYearCar} and ${maxYearCar}`);
  } else {
    e.target.setCustomValidity('');
  }
});

// Worker birthdate max value
const maxYearBirth = currentYear - 17;
const maxDate = `${maxYearBirth}-12`;
document.getElementById('worker-birthdate').max = maxDate;

// Add worker button event listener
addWorkerBtn.addEventListener('click', () => toggleFloatingWindow(addWorkerWindow));

// Add car form submission
const addCarForm = document.getElementById('add-car-form');
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

  const carData = JSON.parse(localStorage.getItem('carData')) || [];
  carData.push(newCar);
  localStorage.setItem('carData', JSON.stringify(carData));

  cars.push(newCar);
  populateCarList();
  toggleFloatingWindow(addCarWindow);
  addCarForm.reset();
});

// Add worker form submission
const addWorkerForm = document.getElementById('add-worker-form');
const addCarSubmit = document.getElementById('add-car-submit');
addCarSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  const workerIdNumberInput = document.getElementById('worker-id-number');
  const workerIdNumberValue = workerIdNumberInput.value;

  if (!workerIdNumberValue.match(/^[0-9]{11}$/)) {
    alert('Worker ID number must be exactly 11 digits');
  } else {
    const storedWorkerData = JSON.parse(localStorage.getItem('workerData')) || [];
    const existingWorker = storedWorkerData.find((worker) => worker.id === workerIdNumberValue);

    if (existingWorker) {
      alert('Worker ID number already exists!');
    } else {
      const newWorker = {
        name: document.getElementById('worker-name').value,
        phone: document.getElementById('worker-phone').value,
        address: document.getElementById('worker-address').value,
        id: workerIdNumberValue,
        birthdate: document.getElementById('worker-birthdate').value,
        notes: document.getElementById('CV').value
      };

      storedWorkerData.push(newWorker);
      localStorage.setItem('workerData', JSON.stringify(storedWorkerData));
      workers.push(newWorker);
      populateWorkerList();
      toggleFloatingWindow(addWorkerWindow);
      addWorkerForm.reset();
    }
  }
});

// Update worker form
const UpdateWorkerForm = document.getElementById('update-worker-form');
UpdateWorkerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const workerId = document.getElementById('updt-worker-id-number').value;
  const workerData = JSON.parse(localStorage.getItem('workerData'));
  const existingWorker = workerData.find(w => w.id === workerId);

  const updatedWorker = {
    name: document.getElementById('updt-worker-name').value,
    phone: document.getElementById('updt-worker-phone').value,
    address: document.getElementById('updt-worker-address').value,
    id: workerId,
    birthdate: document.getElementById('updt-worker-birthdate').value,
    notes: existingWorker.notes // Preserve the existing CV file (notes)
  };

  const index = workerData.findIndex((w) => w.id === workerId);
  workerData[index] = updatedWorker;
  localStorage.setItem('workerData', JSON.stringify(workerData));

  toggleFloatingWindow(UpdateWorkerWindow);
  populateWorkerList();
  UpdateWorkerForm.reset();

  inputFields.forEach((input) => {
    input.setAttribute('required', '');
  });
  window.location.href = '/index.html';
});

// View car list button
document.getElementById('view-car-list-btn').addEventListener('click', () => {
  toggleFloatingWindow(carListWindow);
  populateCarList();
});

// View worker list button
document.getElementById('view-worker-list-btn').addEventListener('click', () => {
  toggleFloatingWindow(workerListWindow);
  populateWorkerList();
});

// Dashboard button animation
const dashBtn = document.getElementById('dash-btn');
const carAnimationDiv = document.getElementById('car-animation');
dashBtn.addEventListener('click', () => {
  carAnimationDiv.classList.add('bounce');
  setTimeout(() => carAnimationDiv.classList.remove('bounce'), 500);
});

// Local storage management
document.getElementById('clear-local-storage-btn').addEventListener('click', () => {
  if (confirm("This will delete/overwrite old data from local storage. Are you sure?")) {
    localStorage.clear();
    location.reload();
    alert('Local storage cleared!');
  }
});

document.getElementById('view-local-storage-btn').addEventListener('click', () => {
  const localStorageData = Object.fromEntries(
    Object.keys(localStorage).map(key => [key, localStorage.getItem(key)])
  );
  const localStorageString = JSON.stringify(localStorageData, null, 2);
  const newPage = window.open('', '_blank');
  newPage.document.write(`<html><body><pre>${localStorageString}</pre></body></html>`);
  newPage.document.close();
});

// Check car status
document.getElementById('car-status-btn').addEventListener('click', () => toggleFloatingWindow(checkCarStatusWindow));

document.getElementById('check-car-status-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const carPlateNumber = document.getElementById('check-car-plate-number').value;
  const carData = JSON.parse(localStorage.getItem('carData')) || [];
  const matchingCar = carData.find((car) => car.plateNumber === carPlateNumber);
  alert(matchingCar ? 'The car is still fixing.' : 'The car is with its owner.');
});

// Close buttons
document.getElementById('add-car-close-btn').addEventListener('click', () => toggleFloatingWindow(addCarWindow));
document.getElementById('add-worker-close-btn').addEventListener('click', () => toggleFloatingWindow(addWorkerWindow));
document.getElementById('car-list-close-btn').addEventListener('click', () => toggleFloatingWindow(carListWindow));
document.getElementById('worker-list-close-btn').addEventListener('click', () => toggleFloatingWindow(workerListWindow));
document.getElementById('update-worker-close-btn').addEventListener('click', () => toggleFloatingWindow(UpdateWorkerWindow));
document.getElementById('check-car-status-close-btn').addEventListener('click', () => toggleFloatingWindow(checkCarStatusWindow));

function toggleFloatingWindow(window) {
    if (currentFloatingWindow && currentFloatingWindow !== window) {
      currentFloatingWindow.classList.add(CLASS_HIDDEN);
      currentFloatingWindow.classList.remove('slide-in');
    }
    
    if (currentFloatingWindow === window) {
      window.classList.toggle(CLASS_HIDDEN);
      window.classList.toggle('slide-in');
      if (window.classList.contains(CLASS_HIDDEN)) {
        currentFloatingWindow = null;
      }
    } else {
      window.classList.remove(CLASS_HIDDEN);
      window.classList.add('slide-in');
      currentFloatingWindow = window;
    }
  }