// Constants and global variables
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

// Input field setup
const inputFields = document.querySelectorAll('input');
inputFields.forEach((input) => {
    input.setAttribute('required', '');
});

// Function to restrict input to numbers only
function restrictToNumbers(input) {
  input.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9]/g, '');
  });

  input.addEventListener('keydown', function(e) {
      // Allow: backspace, delete, tab, escape, enter
      if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A, Command+A
          (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
          // Allow: home, end, left, right, down, up
          (e.keyCode >= 35 && e.keyCode <= 40)) {
          // Let it happen, don't do anything
          return;
      }
      // Ensure that it's a number and stop the keypress if it's not
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }
  });
}

// Apply the restriction to both phone input fields
const workerPhoneInput = document.getElementById('worker-phone');
const updtWorkerPhoneInput = document.getElementById('updt-worker-phone');

if (workerPhoneInput) restrictToNumbers(workerPhoneInput);
if (updtWorkerPhoneInput) restrictToNumbers(updtWorkerPhoneInput);

// Utility functions
function showAlert(message) {
    const alertWindow = document.getElementById('alert-window');
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    alertWindow.classList.remove('hidden');
    alertWindow.classList.add('slide-in');
}

// Event listeners
document.getElementById('alert-close-btn').addEventListener('click', () => {
    document.getElementById('alert-window').classList.add('hidden');
    document.getElementById('alert-window').classList.remove('slide-in');
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

// Car-related functionality
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
const carYearInput = document.getElementById('car-year');
const editCarYearInput = document.getElementById('edit-car-year');
carYearInput.max = maxYearCar;
carYearInput.min = minYearCar;
editCarYearInput.max = maxYearCar;
editCarYearInput.min = minYearCar;

carYearInput.addEventListener('input', (e) => {
    const year = parseInt(e.target.value, 10);
    if (year < minYearCar || year > maxYearCar) {
        e.target.setCustomValidity(`Please enter a year between ${minYearCar} and ${maxYearCar}`);
    } else {
        e.target.setCustomValidity('');
    }
});

editCarYearInput.addEventListener('input', (e) => {
    const year = parseInt(e.target.value, 10);
    if (year < minYearCar || year > maxYearCar) {
        e.target.setCustomValidity(`Please enter a year between ${minYearCar} and ${maxYearCar}`);
    } else {
        e.target.setCustomValidity('');
    }
});

// Worker-related functionality
const maxYearBirth = currentYear - 17;
const maxDate = `${maxYearBirth}-12`;
document.getElementById('worker-birthdate').max = maxDate;
document.getElementById('updt-worker-birthdate').max = maxDate;

const addWorkerBtn = document.getElementById('add-worker-btn');
const addWorkerWindow = document.getElementById('add-worker-window');
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
addWorkerCloseBtn.addEventListener('click', () => {
    addWorkerWindow.classList.toggle('hidden');
    addWorkerWindow.classList.toggle('slide-in');
});

let cars = [];
addCarForm = document.getElementById('add-car-form');
addCarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const carPlateNumber = document.getElementById('car-plate-number').value;
    const cityInput = document.getElementById('car-plate-city').value;
    const carMake = document.getElementById('car-make').value;
    const carModel = document.getElementById('car-model').value;
    const carYear = document.getElementById('car-year').value;
    const carColor = document.getElementById('car-color').value;
    const carMileage = document.getElementById('car-mileage').value;
    const carOwner = document.getElementById('car-owner').value;
    const carNotes = document.getElementById('car-notes').value;

    if (checkPlateNumberExists(carPlateNumber, cityInput)) {
        showAlert('Car plate number already exists in the workshop!');
        return;
    }

    const newCar = {
        plateNumber: carPlateNumber,
        city: cityInput,
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
    showSuccessAlert('Car added successfully!');
    addCarWindow.classList.add('hidden');
    addCarWindow.classList.remove('slide-in');
    addCarForm.reset();
});

const cityInput = document.getElementById('car-plate-city');
const cityList = document.getElementById('city-list');
cityInput.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    const isValidCity = Array.prototype.some.call(cityList.children, (city) => {
        return city.value === inputValue;
    });
    if (!isValidCity) {
        e.target.value = '';
    }
});

function checkPlateNumberExists(plateNumber, city) {
    const storedCarData = localStorage.getItem('carData');
    if (storedCarData) {
        const carData = JSON.parse(storedCarData);
        return carData.some((car) => car.plateNumber === plateNumber && car.city === city);
    }
    return false;
}

const plateNumberInput = document.getElementById('car-plate-number');
plateNumberInput.addEventListener('input', (e) => {
    const plateNumber = e.target.value;
    if (plateNumber.length > 6) {
        e.target.value = plateNumber.substring(0, 6);
    }
    if (!/^[0-9]+$/.test(plateNumber)) {
        e.target.setCustomValidity('Please enter a 6-digit plate number');
    } else {
        e.target.setCustomValidity('');
    }
});

plateNumberInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' || e.key === 'Backspace' || e.key === 'Enter') {
        return; // allow Tab and Backspace keys to work
    }
    if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
    }
});

function populateCarList() {
    const carListTbody = document.getElementById('car-list-tbody');
    carListTbody.innerHTML = ''; // Clear the tbody
    const storedCarData = localStorage.getItem('carData');
    if (storedCarData) {
        const carData = JSON.parse(storedCarData);
        carData.forEach((car) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${car.plateNumber}</td>
                <td>${car.city}</td>
                <td>${car.make}</td>
                <td>${car.model}</td>
                <td>${car.year}</td>
                <td>${car.color}</td>
                <td>${car.mileage}</td>
                <td>${car.owner}</td>
                <td>${car.notes}</td>
            `;
            row.addEventListener('dblclick', () => {
                console.log('Row clicked', car); // Add this line for debugging
                openEditCarWindow(car);
                document.getElementById('car-list-window').classList.add('hidden')
                document.getElementById('car-list-window').classList.remove('slide-in')
            });
            carListTbody.appendChild(row);
        });
    }
}

const carListWindow = document.getElementById('car-list-window');
document.getElementById('view-car-list-btn').addEventListener('click', function () {
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
});

document.getElementById('car-list-close-btn').addEventListener('click', function () {
    carListWindow.classList.toggle('hidden');
    carListWindow.classList.toggle('slide-in');
});

const workerIdNumberInput = document.getElementById('worker-id-number');
workerIdNumberInput.addEventListener('input', (e) => {
    const idNumber = e.target.value;
    if (idNumber.length > 11) {
        e.target.value = idNumber.substring(0, 11);
    }
});

workerIdNumberInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' || e.key === 'Backspace' || e.key === 'Enter' ||
      e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        return; // allow Tab and Backspace keys to work
    }
    if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
    }
});

// Worker list
let workers = [];
addWorkerForm = document.getElementById('add-worker-form');
addWorkerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const workerIdNumberValue = workerIdNumberInput.value;
    const storedWorkerData = localStorage.getItem('workerData');
    const workerData = JSON.parse(storedWorkerData) || [];
    const existingWorker = workerData.find((worker) => worker.id === workerIdNumberValue);
    if (existingWorker) {
        e.preventDefault();
        showAlert('Worker ID number already exists!');
    } else {
        const workerName = document.getElementById('worker-name').value;
        const workerBirthdate = document.getElementById('worker-birthdate').value;
        const workerAddress = document.getElementById('worker-address').value;
        const workerPhone = document.getElementById('worker-phone').value;
        const workerId = document.getElementById('worker-id-number').value;
        const workerCV = document.getElementById('CV').value;

        if (!workerIdNumberValue || !workerName || !workerBirthdate || !workerAddress || !workerPhone || !workerCV) {
            showAlert('Please Fill in All The Fields Or Check For Errors');
            return;
        }

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
        showSuccessAlert('Worker added successfully!');
        addWorkerWindow.classList.toggle('slide-in');
        addWorkerWindow.classList.toggle('hidden');
        addWorkerForm.reset();
    }
});

const UpdateWorkerForm = document.getElementById('update-worker-form');
const UpdateWorkerWindow = document.getElementById('update-worker-window');

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
            row.addEventListener('dblclick', () => {
                inputFields.forEach((input) => {
                    input.removeAttribute('required', '');
                });
                // Open the add worker window and fill the form with the worker's data
                UpdateWorkerWindow.classList.toggle('hidden');
                UpdateWorkerWindow.classList.toggle('slide-in');
                workerListWindow.classList.add('hidden');
                workerListWindow.classList.remove('slide-in');
                currentFloatingWindow = UpdateWorkerWindow;
                document.getElementById('updt-worker-name').value = worker.name;
                document.getElementById('updt-worker-phone').value = worker.phone;
                document.getElementById('updt-worker-address').value = worker.address;
                document.getElementById('updt-worker-id-number').value = worker.id;
                document.getElementById('updt-worker-birthdate').value = worker.birthdate;
                // Add an update button to the form
                UpdateWorkerForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    // Update the worker data
                    const workerId = document.getElementById('updt-worker-id-number').value;
                    const workerName = document.getElementById('updt-worker-name').value;
                    const workerPhone = document.getElementById('updt-worker-phone').value;
                    const workerAddress = document.getElementById('updt-worker-address').value;
                    const workerBirthdate = document.getElementById('updt-worker-birthdate').value;
                    const workerData = JSON.parse(localStorage.getItem('workerData'));
                    const index = workerData.findIndex((worker) => worker.id === workerId);
                    if (index !== -1) {
                        workerData[index].name = workerName;
                        workerData[index].phone = workerPhone;
                        workerData[index].address = workerAddress;
                        workerData[index].birthdate = workerBirthdate;
                        // Update local storage
                        localStorage.setItem('workerData', JSON.stringify(workerData));
                        // Update the workers array
                        workers = workerData;
                        showSuccessAlert('Worker updated successfully!');
                        UpdateWorkerWindow.classList.add('hidden');
                        UpdateWorkerWindow.classList.remove('slide-in');
                        // Refresh the worker list
                        populateWorkerList();
                        UpdateWorkerForm.reset();
                    }
                    inputFields.forEach((input) => {
                        input.setAttribute('required', '');
                    });
                });
            });
            document.getElementById('worker-list-tbody').appendChild(row);
        });
    }
}

// Get the delete buttons
const deleteCarBtn = document.getElementById('delete-car-btn');
const deleteWorkerBtn = document.getElementById('delete-worker-btn');

// Add event listeners to the delete buttons
deleteCarBtn.addEventListener('click', deleteCar);
deleteWorkerBtn.addEventListener('click', deleteWorker);

// Function to delete a car
function deleteCar() {
    // Get the car plate number from the edit car form
    const carPlateNumber = document.getElementById('edit-car-plate-number').value;
    const carPlateCityInput = document.getElementById('edit-car-plate-city').value;
    // Check if the car exists in local storage
    let cars = JSON.parse(localStorage.getItem('carData')) || [];
    if (cars.length > 0) {
        const index = cars.findIndex(car => car.plateNumber === carPlateNumber);
        if (index !== -1) {
            // Remove the car from the array
            cars.splice(index, 1);
            // Update local storage
            localStorage.setItem('carData', JSON.stringify(cars));
            // Close the edit car window
            document.getElementById('edit-car-window').classList.add('hidden');
            // Show a success message
            showDeleteAlert(`Car with plate number ${carPlateNumber} ${carPlateCityInput} deleted successfully!`);
            editCarWindow.classList.remove('slide-in');
            editCarWindow.classList.add('hidden');
        } else {
            // Show an error message
            showAlert(`Car with plate number ${carPlateNumber} not found!`);
        }
    } else {
        // Show an error message
        showAlert('No cars found in local storage!');
    }
}

// Function to delete a worker
function deleteWorker() {
    // Get the worker ID from the update worker form
    const workerId = document.getElementById('updt-worker-id-number').value;
    // Check if the worker exists in local storage
    let workers = JSON.parse(localStorage.getItem('workerData')) || [];
    if (workers.length > 0) {
        const index = workers.findIndex(worker => worker.id === workerId);
        if (index !== -1) {
            // Remove the worker from the array
            workers.splice(index, 1);
            // Update local storage
            localStorage.setItem('workerData', JSON.stringify(workers));
            // Close the update worker window
            document.getElementById('update-worker-window').classList.add('hidden');
            // Show a success message
            showDeleteAlert(`Worker with ID ${workerId} deleted successfully!`);
            UpdateWorkerWindow.classList.add('hidden');
            UpdateWorkerWindow.classList.remove('slide-in');
        } else {
            // Show an error message
            showAlert(`Worker with ID ${workerId} not found!`);
        }
    } else {
        // Show an error message
        showAlert('No workers found in local storage!');
    }
}

// Function to show a success alert
function showSuccessAlert(message) {
    const successAlert = document.getElementById('success-alert');
    document.getElementById('success-alert-message').textContent = message;
    successAlert.classList.remove('hidden');
    successAlert.classList.add('slide-in');
    setTimeout(() => {
        successAlert.classList.add('hidden');
        successAlert.classList.remove('slide-in');
    }, 2000);
}

function showDeleteAlert(message) {
  const deleteAlert = document.getElementById('delete-alert');
  deleteAlert.classList.remove('hidden');
  document.getElementById('delete-alert-message').textContent = message;
  setTimeout(() => {
      deleteAlert.classList.add('hidden');
  }, 2000);
}

// Function to show an alert
function showAlert(message) {
    const alertWindow = document.getElementById('alert-window');
    alertWindow.classList.remove('hidden');
    document.getElementById('alert-message').textContent = message;
    document.getElementById('alert-close-btn').addEventListener('click', () => {
        alertWindow.classList.add('hidden');
    });
}

const workerListWindow = document.getElementById('worker-list-window');
document.getElementById('view-worker-list-btn').addEventListener('click', function () {
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

document.getElementById('worker-list-close-btn').addEventListener('click', function () {
    workerListWindow.classList.toggle('hidden');
    workerListWindow.classList.toggle('slide-in');
});

document.getElementById('update-worker-close-btn').addEventListener('click', function () {
    UpdateWorkerWindow.classList.toggle('hidden');
    UpdateWorkerWindow.classList.toggle('slide-in');
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
    if (confirm("This will delete/overwrite old data from local storage. Are you sure?")) {
        localStorage.clear();
        location.reload();
        alert('Local storage cleared!');
    }
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
    const city = document.getElementById('check-car-city-list').value;
    console.log(city)
    if (checkPlateNumberExists(carPlateNumber, city)) {
        showAlert('We Are Still Fixing The Car.');
    } else {
        showAlert('The Car Have Been Already Fixed Or The Car Never Existed.');
    }
});

// Close the window after submitting the form
document.getElementById('check-car-status-close-btn').addEventListener('click', () => {
    document.getElementById('check-car-status-window').classList.toggle('hidden');
    document.getElementById('check-car-status-window').classList.toggle('slide-in');
    document.getElementById('check-car-status-form').reset();
});

const carPlateCityInput = document.getElementById('car-plate-city');
const checkCarPlateCityInput = document.getElementById('check-car-city-list');
const cityListContainer = document.getElementById('city-list-container');
const checkCityListContainer = document.getElementById('chk-city-list-container');

carPlateCityInput.addEventListener('focus', () => {
    cityListContainer.classList.remove('hidden');
});

checkCarPlateCityInput.addEventListener('focus', () => {
    checkCityListContainer.classList.remove('hidden');
});

carPlateCityInput.addEventListener('blur', (e) => {
    // Delay hiding the list to allow for clicks on list items
    setTimeout(() => {
        cityListContainer.classList.add('hidden');
    }, 200);
});

checkCarPlateCityInput.addEventListener('blur', (e) => {
    // Delay hiding the list to allow for clicks on list items
    setTimeout(() => {
        checkCityListContainer.classList.add('hidden');
    }, 200);
});

const checkCityList = checkCityListContainer.querySelector('ul');

function setupCitySelection(input, listContainer, list) {
    input.addEventListener('focus', () => {
        listContainer.classList.remove('hidden');
    });

    input.addEventListener('blur', () => {
        setTimeout(() => {
            listContainer.classList.add('hidden');
        }, 200);
    });

    list.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            input.value = e.target.textContent;
            listContainer.classList.add('hidden');
            e.preventDefault();
        }
    });
}

setupCitySelection(carPlateCityInput, cityListContainer, cityList);
setupCitySelection(checkCarPlateCityInput, checkCityListContainer, checkCityList);

const editCarWindow = document.getElementById('edit-car-window');
const editCarForm = document.getElementById('edit-car-form');
const editCarCloseBtn = document.getElementById('edit-car-close-btn');

function openEditCarWindow(car) {
    document.getElementById('edit-car-plate-city').value = car.city;
    document.getElementById('edit-car-plate-number').value = car.plateNumber;
    document.getElementById('edit-car-make').value = car.make;
    document.getElementById('edit-car-model').value = car.model;
    document.getElementById('edit-car-year').value = car.year;
    document.getElementById('edit-car-color').value = car.color;
    document.getElementById('edit-car-mileage').value = car.mileage;
    document.getElementById('edit-car-owner').value = car.owner;
    document.getElementById('edit-car-notes').value = car.notes;
    editCarWindow.classList.remove('hidden');
    editCarWindow.classList.add('slide-in');
    currentFloatingWindow = editCarWindow;
}

editCarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedCar = {
        plateNumber: document.getElementById('edit-car-plate-number').value,
        city: document.getElementById('edit-car-plate-city').value,
        make: document.getElementById('edit-car-make').value,
        model: document.getElementById('edit-car-model').value,
        year: document.getElementById('edit-car-year').value,
        color: document.getElementById('edit-car-color').value,
        mileage: document.getElementById('edit-car-mileage').value,
        owner: document.getElementById('edit-car-owner').value,
        notes: document.getElementById('edit-car-notes').value
    };

    const carData = JSON.parse(localStorage.getItem('carData')) || [];
    const index = carData.findIndex(car => car.plateNumber === updatedCar.plateNumber && car.city === updatedCar.city);
    if (index !== -1) {
        carData[index] = updatedCar;
        localStorage.setItem('carData', JSON.stringify(carData));
        populateCarList();
        showSuccessAlert('Car information updated successfully!');
        editCarWindow.classList.add('hidden');
        editCarWindow.classList.remove('slide-in');
    }
});

editCarCloseBtn.addEventListener('click', () => {
    editCarWindow.classList.add('hidden');
    editCarWindow.classList.remove('slide-in');
});