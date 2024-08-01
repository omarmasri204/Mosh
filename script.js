
function userFunc() {
    const dropdownContent = document.getElementById("usersDropdown");
    dropdownContent.classList.toggle("show");
    const btnArrowUp = document.getElementById("usersButton");
    btnArrowUp.classList.toggle("css-button-arrow-d-sky");
    btnArrowUp.classList.toggle("css-button-arrow--sky");
}
function workerFunc() {
    const dropdownContent = document.getElementById("woDropdown");
    dropdownContent.classList.toggle("show");
    const btnArrowUp = document.getElementById("woButton");
    btnArrowUp.classList.toggle("css-button-arrow-d-sky");
    btnArrowUp.classList.toggle("css-button-arrow--sky");
}
/* end */ 

document.getElementById('dash-btn').addEventListener('mouseover', function() {
  document.getElementById('dash-icon').src = '/images/dashboard-w.png';
});

document.getElementById('dash-btn').addEventListener('mouseout', function() {
  document.getElementById('dash-icon').src = '/images/dashboard.png';
});

////////////////////////////////////////////////////////////////////////////

document.getElementById('add-car-btn').addEventListener('mouseover', function() {
  document.getElementById('add-car-icon').src = '/images/start-service-w.png';
});

document.getElementById('add-car-btn').addEventListener('mouseout', function() {
  document.getElementById('add-car-icon').src = '/images/start-service.png';
});

///////////////////////////////////////////////////////////////////////////

document.getElementById('car-status-btn').addEventListener('mouseover', function() {
  document.getElementById('car-status-icon').src = '/images/car-info-w.png';
});

document.getElementById('car-status-btn').addEventListener('mouseout', function() {
  document.getElementById('car-status-icon').src = '/images/car-info.png';
});

////////////////////////////////////////////////////////////////////////////

document.getElementById('view-car-list-btn').addEventListener('mouseover', function() {
  document.getElementById('view-car-list-icon').src = '/images/Check-car-w.png';
});

document.getElementById('view-car-list-btn').addEventListener('mouseout', function() {
  document.getElementById('view-car-list-icon').src = '/images/Check-car.png';
});