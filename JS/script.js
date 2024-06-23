// 1. Get the username element
const username = document.getElementById('username');

// 2. Get the logout button element
const logoutBtn = document.getElementById('logout-btn');

// 3. Get the appointments element
const appointments = document.getElementById('appointments');

// 4. Get the add car button element
const addCarBtn = document.getElementById('add-car-btn');

// 5. Get the add car window element
const addCarWindow = document.getElementById('add-car-window');

// 6. Get the view worker list button element
const workerListBtn = document.getElementById('view-worker-list-btn');

// 7. Get the close worker list button element
const closeWorkerListBtn = document.getElementById('close-worker-list-btn');

// 8. Get the add worker button element
const addWorkerBtn = document.getElementById('add-worker-btn');

// 9. Add event listener to the logout button
document.getElementById("logout-btn").addEventListener("click", function () {
    // 10. Redirect to the login page when the logout button is clicked
    window.location.href = "/login.html";
});

// 11. Add event listener to the logout button
logoutBtn.addEventListener('click', () => {
    // 12. Log a message when the logout button is clicked
    console.log('Logout button clicked!');
    // 13. Add functionality to log out the user here
});

// 14. Add event listener to the add car button
addCarBtn.addEventListener('click', () => {
    // 15. Log a message when the add car button is clicked
    console.log('Add car button clicked!');
    // 16. Add the 'lide-in' class to the add car window
    addCarWindow.classList.add('slide-in');
});

// 17. Add event listener to the add car window
addCarWindow.addEventListener('click', (e) => {
    // 18. Check if the target element is the add car window
    if (e.target === addCarWindow) {
        // 19. Remove the 'lide-in' class from the add car window
        addCarWindow.classList.remove('slide-in');
    }
});

// 20. Get the current year
const currentYear = new Date().getFullYear();

// 21. Set the minimum year to 1960
const minYear = 1960;

// 22. Set the maximum year to the current year plus 1
const maxYear = currentYear + 1;

// 23. Set the minimum year for the car year input
document.getElementById('car-year').min = minYear;

// 24. Set the maximum year for the car year input
document.getElementById('car-year').max = maxYear;

// 25. Add event listener to the car year input
document.getElementById('car-year').addEventListener('input', (e) => {
    // 26. Get the input year
    const year = parseInt(e.target.value, 10);
    // 27. Check if the year is within the valid range
    if (year < minYear || year > maxYear) {
        // 28. Set a custom validity message
        e.target.setCustomValidity(`Please enter a year between ${minYear} and ${maxYear}`);
    } else {
        // 29. Clear the custom validity message
        e.target.setCustomValidity('');
    }
});

// 30. Initialize an empty car list
let carList = [];

// 31. Add event listener to the add car form submission
document.getElementById('add-car-form').addEventListener('submit', (e) => {
    // 32. Prevent the default form submission behavior
    e.preventDefault();

    // 33. Get the form data
    const formData = new FormData(e.target);

    // 34. Create a car data object
    const carData = {
        make: formData.get('car-make'),
        model: formData.get('car-model'),
        year: formData.get('car-year'),
        color: formData.get('car-color'),
        mileage: formData.get('car-mileage'),
        owner: formData.get('car-owner'),
        notes: formData.get('car-notes'),
    };

    // 35. Add the car data to the car list
    carList.push(carData);

    // 36. Remove the 'lide-in' class from the add car window
    addCarWindow.classList.remove('slide-in');
});

// 37. Get the view car list button element
const viewCarListBtn = document.getElementById('view-car-list-btn');

// 38. Get the car list window element
const carListWindow = document.getElementById('car-list-window');

// 39. Get the close car list button element
const closeCarListBtn = document.getElementById('close-car-list-btn');

// 40. Get the car list body element
const carListBody = document.getElementById('car-list-body');

// 41.Add event listener to the view car list button
viewCarListBtn.addEventListener('click', () => {
    // 42. Add the 'lide-in' class to the car list window
    carListWindow.classList.add('slide-in');
});

// 43. Add event listener to the close car list button
closeCarListBtn.addEventListener('click', () => {
    // 44. Remove the 'lide-in' class from the car list window
    carListWindow.classList.remove('slide-in');
});

// 45. Add event listener to the car list window
carListWindow.addEventListener('click', (e) => {
    // 46. Check if the target element is the car list window
    if (e.target === carListWindow) {
        // 47. Remove the 'lide-in' class from the car list window
        carListWindow.classList.remove('slide-in');
    }
});

// 48. Add event listener to the view car list button
document.getElementById('view-car-list-btn').addEventListener('click', () => {
    // 49. Get the car list body element
    const tableBody = document.getElementById('car-list-body');

    // 50. Clear the car list body
    tableBody.innerHTML = '';

    // 51. Loop through the car list
    carList.forEach((car) => {
        // 52. Create a table row element
        const tableRow = document.createElement('tr');

        // 53. Loop through the car data keys
        Object.keys(car).forEach((key) => {
            // 54. Create a table cell element
            const tableCell = document.createElement('td');

            // 55. Set the table cell text content to the car data value
            tableCell.textContent = car[key];

            // 56. Append the table cell to the table row
            tableRow.appendChild(tableCell);
        });

        // 57. Append the table row to the car list body
        tableBody.appendChild(tableRow);
    });
});

// 58. Fetch workers from the API
fetch('api/workers')
    .then(response => response.json())
    .then(data => {
        // 59. Loop through the worker data
        data.forEach(worker => {
            // 60. Create a list item element
            const workerEl = document.createElement('li');

            // 61. Set the list item text content to the worker name
            workerEl.textContent = worker.name;

            // 62. Append the list item to the worker list
            workerList.appendChild(workerEl);
        });
    });

// 63. Add event listener to the add worker button
addWorkerBtn.addEventListener('click', () => {
    // 64. Log a message when the add worker button is clicked
    console.log('Add worker button clicked!');
    // 65. Toggle the 'lide-in' class on the add worker window
    const addWorkerWindow = document.getElementById('add-worker-window');
    addWorkerWindow.classList.toggle('slide-in');
});

// 66. Add event listener to the add worker form submission
const addWorkerForm = document.getElementById('add-worker-form');
addWorkerForm.addEventListener('submit', (e) => {
    // 67. Prevent the default form submission behavior
    e.preventDefault();

    // 68. Get the worker name, address, and phone number
    const workerName = document.getElementById('worker-name').value;
    const workerAdress = document.getElementById('worker-adress').value;
    const workerPhone = document.getElementById('worker-phone').value;

    // 69. Log a message when adding a worker
    console.log(`Adding worker: ${workerName} (${workerAdress}) - ${workerPhone}`);

    // 70. Add the worker to the list
    const workerListBody = document.getElementById('worker-list-body');
    const workerRow = document.createElement('tr');
    workerRow.innerHTML = `
     <td>${workerName}</td>
     <td>${workerAdress}</td>
     <td>${workerPhone}</td>
   `;
    workerListBody.appendChild(workerRow);

    // 71. Toggle the 'lide-in' class on the add worker window
    const addWorkerWindow = document.getElementById('add-worker-window');
    addWorkerWindow.classList.toggle('slide-in');
});

// 72. Add event listener to the worker list button
workerListBtn.addEventListener('click', () => {
    // 73. Log a message when the worker list button is clicked
    console.log('worker list window button clicked!');
    // 74. Toggle the 'lide-in' class on the worker list window
    const workerListWindow = document.getElementById('worker-list-window');
    workerListWindow.classList.toggle('slide-in');
});

// 75. Add event listener to the close worker list button
closeWorkerListBtn.addEventListener('click', () => {
    // 76. Log a message when the close worker list button is clicked
    console.log('worker list close window button clicked!');
    // 77. Toggle the 'lide-in' class on the worker list window
    const workerListWindow = document.getElementById('worker-list-window');
    workerListWindow.classList.toggle('slide-in');
});