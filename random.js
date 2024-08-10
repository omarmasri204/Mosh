// Get the button and tables
const generateRandomDataBtn = document.getElementById('generate-random-data-btn');
const carListTableBody = document.getElementById('car-list-tbody');

// Function to generate random car data
function generateRandomCarData() {
  const carData = [];
  for (let i = 0; i < 20; i++) { // Generate 20 random cars
    carData.push({
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
  return 'Random notes ' + Math.floor(Math.random() * 100);
}

// Event listener for the button
generateRandomDataBtn.addEventListener('click', () => {
  const carData = generateRandomCarData();

  // Clear the tables
  carListTableBody.innerHTML = '';

  // Add the random data to the tables
  carData.forEach((car) => {
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
    carListTableBody.appendChild(row);
  });
});