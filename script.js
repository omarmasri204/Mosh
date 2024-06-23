
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

const slideDownBtn = document.getElementById('slide-down-btn');
const slidingDiv = document.getElementById('sliding-div');

// Add an event listener to the button
slideDownBtn.addEventListener('click', () => {
  // Toggle the sliding div's height
  slidingDiv.style.height = slidingDiv.style.height === '0px' ? '200px' : '0px';
});