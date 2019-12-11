var nameOneInput = document.querySelector("#challenger-1-name-input");
var nameTwoInput = document.querySelector("#challenger-2-name-input");
var guessOneInput = document.querySelector("#challenger-1-guess-input");
var guessTwoInput = document.querySelector("#challenger-2-guess-input");
var minRangeInput = document.querySelector("#min-range-input");
var maxRangeInput = document.querySelector("#max-range-input");
var submitBtn = document.querySelector("#submit-btn");
var clearFormBtn = document.querySelector("#clear-btn");
var updateBtn = document.querySelector("#update-btn");
var nameOneErrorMsg = document.querySelector("#name-1-error");
var nameTwoErrorMsg = document.querySelector("#name-2-error");
var defaultStyling = document.querySelector("#latest-guess-wrapper");
var showGuessOne = document.querySelector("#challenger-1-guess");
var showGuessTwo = document.querySelector("#challenger-2-guess");
var showNameOne = document.querySelector("#challenger-1-name");
var showNameTwo = document.querySelector("#challenger-2-name");
var showMinNumber = document.querySelector("#min-number");
var showMaxNumber = document.querySelector("#max-number");
var showRange = document.querySelector("#range");
var challengerOneHint = document.querySelector("#challenger-1-hint");
var challengerTwoHint = document.querySelector("#challenger-2-hint");
var min = 1;
var max = 100;
var challengerMax;
var challengerMin;
var winningNumber = parseInt(Math.random() * (max - min) + min);

nameOneInput.addEventListener("keyup", enableBtn);
nameTwoInput.addEventListener("keyup", enableBtn);
guessOneInput.addEventListener("keyup", enableBtn);
guessTwoInput.addEventListener("keyup", enableBtn);
minRangeInput.addEventListener("keyup", enableUpdateBtn);
maxRangeInput.addEventListener("keyup", enableUpdateBtn);
updateBtn.addEventListener("click", clickUpdateBtn);
clearFormBtn.addEventListener("click", clearForm);
submitBtn.addEventListener("click", clickSubmitBtn);
window.addEventListener("load", pageLoad);

function enableBtn() {
  checkNameOneInput();
  checkNameTwoInput();
  enableClearFormBtn();
  if (nameOneInput.value !== "" && nameTwoInput.value !== "" && guessOneInput.value !== "" && guessTwoInput.value !== "") {
    submitBtn.disabled = false;
    submitBtn.classList.add("active-btn");
  } else {
    submitBtn.classList.remove("active-btn");
  }
};

function checkNameOneInput() {
  if (nameOneInput.value !== "") {
    nameOneErrorMsg.classList.add("hidden");
  } else {
    nameOneErrorMsg.classList.remove("hidden");
  }
};

function checkNameTwoInput() {
  if (nameTwoInput.value !== "") {
    nameTwoErrorMsg.classList.add("hidden");
  } else {
    nameTwoErrorMsg.classList.remove("hidden");
  }
};

function enableClearFormBtn() {
  if (nameOneInput.value !== "" || nameTwoInput.value !== "" || guessOneInput.value !== "" || guessTwoInput.value !== "") {
    clearFormBtn.disabled = false;
    clearFormBtn.classList.add("active-btn");
  } else {
    clearFormBtn.classList.remove("active-btn");
    submitBtn.classList.remove("active-btn");
  }
};

function clearForm() {
  var clearForm = document.querySelector("#guess-form");
  clearForm.reset();
  enableBtn();
  submitBtn.disabled = true;
};

function checkChallengerOneGuess() {
  var parsed = parseInt(guessOneInput.value);
  if (parsed < winningNumber) {
    challengerOneHint.insertAdjacentHTML("afterbegin", "<p>that's too low</p>");
  } else if (parsed > winningNumber) {
    challengerOneHint.insertAdjacentHTML("afterbegin", "<p>that's too high</p>");
  } else if (parsed === winningNumber) {
    challengerOneHint.insertAdjacentHTML("afterbegin", "<p>BOOM!</p>");
  }
};

function checkChallengerTwoGuess() {
  var parsed = parseInt(guessTwoInput.value);
  if (parsed < winningNumber) {
    challengerTwoHint.insertAdjacentHTML("afterbegin", "<p>that's too low</p>");
  } else if (parsed > winningNumber) {
    challengerTwoHint.insertAdjacentHTML("afterbegin", "<p>that's too high</p>");
  } else if (parsed === winningNumber) {
    challengerTwoHint.insertAdjacentHTML("afterbegin", "<p>BOOM!</p>");
  }
};

function generateWinningNumber(min, max) {
  winningNumber = parseInt(Math.random() * (max - min) + min);
  console.log('The winning number is:', winningNumber);
};

function clearGuess() {
  guessOneInput.value = "";
  guessTwoInput.value = "";
};

function clearRange() {
  minRangeInput.value = "";
  maxRangeInput.value = "";
}

function clickSubmitBtn() {
  showPlaceHolders();
  hideDefault();
  checkChallengerOneGuess();
  checkChallengerTwoGuess();
  showNameAndGuess();
  clearGuess();
};

function clickUpdateBtn() {
  enableUpdateBtn();
  hideRangeDefault();
  showMinAndMaxRange();
  showRange.classList.remove("hidden");
  challengerMin = parseInt(minRangeInput.value);
  challengerMax = parseInt(maxRangeInput.value);
  generateWinningNumber(challengerMax, challengerMin);
  clearRange();
  console.log('Minimum number set:', challengerMin);
  console.log('Maximum number set:', challengerMax);
};

function enableUpdateBtn() {
  if (minRangeInput.value !== "" && maxRangeInput.value !== "") {
    updateBtn.disabled = false;
    updateBtn.classList.add("active-btn");
  } else {
    updateBtn.classList.remove("active-btn");
  }
};

function showMinAndMaxRange() {
  showMinNumber.insertAdjacentHTML("afterbegin", `<p>${minRangeInput.value}</p>`);
  showMaxNumber.insertAdjacentHTML("afterbegin", `<p>${maxRangeInput.value}</p>`);
  updateBtn.classList.remove("active-btn");
  updateBtn.disabled = true;
  showMinNumber.classList.remove("hidden");
  showMaxNumber.classList.remove("hidden");
};

function showNameAndGuess() {
  showNameOne.insertAdjacentHTML("afterbegin", `<p>${nameOneInput.value}</p>`);
  showNameTwo.insertAdjacentHTML("afterbegin", `<p>${nameTwoInput.value}</p>`);
  showGuessOne.insertAdjacentHTML("afterbegin", `<p>${guessOneInput.value}</p>`);
  showGuessTwo.insertAdjacentHTML("afterbegin", `<p>${guessTwoInput.value}</p>`);
  clearFormBtn.classList.remove("active-btn");
  submitBtn.classList.remove("active-btn");
  submitBtn.disabled = true;
  clearFormBtn.disabled = true;
};

function hideDefault() {
  var nameOne = document.querySelector("#name-1-placeholder");
  var nameTwo = document.querySelector("#name-2-placeholder");
  var guessOne = document.querySelector("#guess-1-placeholder");
  var guessTwo = document.querySelector("#guess-2-placeholder");
  var hintOne = document.querySelector("#hint-1-placeholder");
  var hintTwo = document.querySelector("#hint-2-placeholder");
  nameOne.classList.add("hidden");
  nameTwo.classList.add("hidden");
  guessOne.classList.add("hidden");
  guessTwo.classList.add("hidden");
  hintOne.classList.add("hidden");
  hintTwo.classList.add("hidden");
};

function hideRangeDefault() {
  var numberRange = document.querySelector("#range-placeholder");
  numberRange.classList.add("hidden");
};

function hide() {
  challengerOneHint.classList.add("hidden");
  challengerTwoHint.classList.add("hidden");
  showNameOne.classList.add("hidden");
  showNameTwo.classList.add("hidden");
  showGuessOne.classList.add("hidden");
  showGuessTwo.classList.add("hidden");
  showRange.classList.add("hidden");
};

function showPlaceHolders() {
  challengerOneHint.classList.remove("hidden");
  challengerTwoHint.classList.remove("hidden");
  showNameOne.classList.remove("hidden");
  showNameTwo.classList.remove("hidden");
  showGuessOne.classList.remove("hidden");
  showGuessTwo.classList.remove("hidden");
};

function pageLoad() {
  hide();
};
