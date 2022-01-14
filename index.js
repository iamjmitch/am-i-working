// Assign Elements
let dateSelector = document.getElementById('date');
let answerContainer = document.getElementById('answer');
let monday = document.getElementsByClassName('monday')[0];
let friday = document.getElementsByClassName('friday')[0];

// Initial Values
const first_Monday = new Date(2022, 00, 10); // doesn't ever change
let todaysDate = new Date(); // initial value
let dayOff = '';
let todayAsRFC3339 = [
  numberTo2Digits(todaysDate.getFullYear()),
  numberTo2Digits(todaysDate.getMonth() + 1),
  numberTo2Digits(todaysDate.getDate()),
].join('-');
cl(todayAsRFC3339);
dateSelector.value = todayAsRFC3339;

// Helper Functions
function cl(text) {
  console.log(text);
}

// Convert date return to 2 digits 1 -> 01
function numberTo2Digits(number) {
  if (number.toString().length === 1) {
    return '0' + number;
  } else {
    return number;
  }
}

// Assign Event Listeners
dateSelector.addEventListener('change', handleWeekChange);

// Function to determine difference in weeks
function diff_weeks(check_date) {
  var diff = (check_date.getTime() - first_Monday.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.floor(diff));
}

// Function to toggle outcome text
function handleOnOffDisplay(int) {
  answerContainer.classList.add('animate');
  if (int === 0) {
    monday.innerHTML = 'Monday: <b> ON</b> 😡';
    friday.innerHTML = 'Friday: <b> OFF</b> 😀';
  } else {
    monday.innerHTML = 'Monday: <b> OFF</b> 😀';
    friday.innerHTML = 'Friday: <b> ON</b> 😡';
  }
  setTimeout(() => {
    answerContainer.classList.remove('animate');
  }, 2000);
}

// Handle datepicker change
function handleWeekChange() {
  let weeksDifference = diff_weeks(dateSelector.valueAsDate);
  handleOnOffDisplay(parseInt(weeksDifference) % 2);
}

// set initial display
handleWeekChange();
