// Get the button and tables
const generateRandomDataBtn = document.getElementById('generate-random-data-btn');
const carListTableBody = document.getElementById('car-list-tbody');

// Function to generate random car data
function generateRandomCarData() {
  const carData = [];
  for (let i = 0; i < 20; i++) { // Generate 20 random cars
    carData.push({
      plateNumber: getRandomPlateNumber(), // Add plate number
      cityInput: getRandomCity(),
      make: getRandomCarMake(),
      model: getRandomCarModel(),
      year: getRandomYear(),
      color: getRandomColor(),
      mileage: getRandomMileage(),
      owner: getRandomOwner(),
      notes: getRandomNotes()
    });
  }
  return carData;
}

// Helper functions to generate random data
function getRandomCity() {
  const cities = ['Damascus', 'Aleppo', 'Homs', 'Hama', 'Lattakia', 'Tartous'];
  return cities[Math.floor(Math.random() * cities.length)];
}
function getRandomCarMake() {
  const makes = ['Toyota', 'Ford', 'Honda', 'Nissan', 'Volkswagen'];
  return makes[Math.floor(Math.random() * makes.length)];
}

function getRandomCarModel() {
  const models = ['Corolla', 'Focus', 'Civic', 'Altima', 'Golf'];
  return models[Math.floor(Math.random() * models.length)];
}

function getRandomYear() {
  return Math.floor(Math.random() * (2022 - 2000 + 1)) + 2000;
}

function getRandomColor() {
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomMileage() {
  return Math.floor(Math.random() * 100000);
}

function getRandomOwner() {
  const owners = ['John Doe', 'Jane Doe', 'Bob Smith', 'Alice Johnson'];
  return owners[Math.floor(Math.random() * owners.length)];
}

function getRandomNotes() {
  return 'Random ' + Math.floor(Math.random() * 100);
}


const plateNumbers = new Set(); // Store generated plate numbers

function getRandomPlateNumber() {
  let plateNumber;
  do {
    plateNumber = Math.floor(Math.random() * 900000) + 100000; // Generate a 6-digit number between 100000 and 999999
  } while (plateNumbers.has(plateNumber)); // Check if plate number already exists
  plateNumbers.add(plateNumber); // Add plate number to the set
  return plateNumber.toString(); // Return the plate number as a string
}

// Get the custom confirmation dialog elements
const confirmDialog = document.getElementById('confirm-dialog');
const confirmYesBtn = document.getElementById('confirm-yes');
const confirmNoBtn = document.getElementById('confirm-no');

// Event listener for the button
generateRandomDataBtn.addEventListener('click', () => {
  console.log('Button clicked!');

  // Show the custom confirmation dialog
  confirmDialog.classList.remove('hidden');
  confirmDialog.classList.add('slide-in');
  carListWindow.classList.add('hidden');
  carListWindow.classList.remove('slide-in');

  // Add event listeners for the yes and no buttons
  confirmYesBtn.addEventListener('click', () => {
    // Hide the dialog and generate the random data
    confirmDialog.style.display = 'none';
    const carData = generateRandomCarData();
    localStorage.setItem('carData', JSON.stringify(carData));
    // Clear the tables
    carListTableBody.innerHTML = '';
    // Clear the cars array
    cars.length = 0;
    // Add the random data to the tables
    carData.forEach((car) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${car.plateNumber}</td>
        <td>${car.cityInput}</td>
        <td>${car.make}</td>
        <td>${car.model}</td>
        <td>${car.year}</td>
        <td>${car.color}</td>
        <td>${car.mileage}</td>
        <td>${car.owner}</td>
        <td>${car.notes}</td>
      `;
      carListTableBody.appendChild(row);
      window.location.href = 'index.html';
    });
  });

  confirmNoBtn.addEventListener('click', () => {
    // Hide the dialog
    confirmDialog.style.display = 'none';
    window.location.href = 'index.html';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const storedCarData = localStorage.getItem('carData');
  if (storedCarData) {
    const carData = JSON.parse(storedCarData);
    carData.forEach((car) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${car.plateNumber}</td> <!-- Add plate number column -->
          <td>${car.cityInput}</td>
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

const clearRandomCarsBtn = document.getElementById('clear-random-cars-btn');

clearRandomCarsBtn.addEventListener('click', () => {
  confirmDialog.classList.remove('hidden');
  confirmDialog.classList.add('slide-in');
  carListWindow.classList.add('hidden');
  carListWindow.classList.remove('slide-in');


  confirmYesBtn.addEventListener('click', () => {

    confirmDialog.style.display = 'none';
    localStorage.removeItem('carData');
    carListTableBody.innerHTML = ''; // Clear the table body
    window.location.href = 'index.html';

  });

  confirmNoBtn.addEventListener('click', () => {
    // Hide the dialog
    confirmDialog.style.display = 'none';
    window.location.href = 'index.html';
  });
});