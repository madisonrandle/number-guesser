var nameOneInput = document.querySelector("#challenger-1-name-input");
var nameTwoInput = document.querySelector("#challenger-2-name-input");
var guessOneInput = document.querySelector("#challenger-1-guess-input");
var guessTwoInput = document.querySelector("#challenger-2-guess-input");
var minRangeInput = document.querySelector("#min-range-input");
var maxRangeInput = document.querySelector("#max-range-input");
var submitBtn = document.querySelector("#submit-btn");
var clearFormBtn = document.querySelector("#clear-btn");
var updateBtn = document.querySelector(".update-btn");
var noRangeError = document.querySelector(".non-error-state")
var maxRangeError = document.querySelector("#max-range-error");
var error = document.querySelector("#error-wrapper");
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
var nameOne = document.querySelector("#name-1-placeholder");
var nameTwo = document.querySelector("#name-2-placeholder");
var guessOne = document.querySelector("#guess-1-placeholder");
var guessTwo = document.querySelector("#guess-2-placeholder");
var hintOne = document.querySelector("#hint-1-placeholder");
var hintTwo = document.querySelector("#hint-2-placeholder");
var min = 1;
var max = 100;
var challengerMax;
var challengerMin;
var winningNumber = parseInt(Math.random() * (max - min) + min);
var cardContainer = document.querySelector("#card-container");
var guessCount = 0;


nameOneInput.addEventListener("keyup", enableBtn);
nameTwoInput.addEventListener("keyup", enableBtn);
guessOneInput.addEventListener("keyup", enableBtn);
guessTwoInput.addEventListener("keyup", enableBtn);
minRangeInput.addEventListener("keyup", enableUpdateBtn);
maxRangeInput.addEventListener("keyup", enableUpdateBtn);
updateBtn.addEventListener("click", clickUpdateBtn);
clearFormBtn.addEventListener("click", clearForm);
submitBtn.addEventListener("click", clickSubmitBtn);
cardContainer.addEventListener("click", removeCard);
window.addEventListener("load", pageLoad);

function removeCard(event) {
  if (event.target.classList.contains("close-icon")) {
  event.target.parentElement.parentElement.remove();
  }
};

function enableBtn() {
  enableClearFormBtn();
  if (nameOneInput.value !== "" && nameTwoInput.value !== "" && guessOneInput.value !== "" && guessTwoInput.value !== "") {
    submitBtn.disabled = false;
    submitBtn.classList.add("active-btn");
  } else {
    submitBtn.classList.remove("active-btn");
  }
};

function checkMaxRange() {
  var parsedMax = parseInt(maxRangeInput.value);
  var parsedMin = parseInt(minRangeInput.value);
  if (parsedMax < parsedMin) {
    maxRangeError.classList.remove("hidden");
    noRangeError.classList.add("update-btn");
    noRangeError.classList.remove("non-error-state");
    updateBtn.disabled = true;
  } else {
    noRangeError.classList.add("non-error-state");
    noRangeError.classList.remove("update-btn");
    maxRangeError.classList.add("hidden");
    updateBtn.disabled = false;
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
    challengerOneHint.innerHTML = "that's too low";
  } else if (parsed > winningNumber) {
    challengerOneHint.innerHTML = "that's too high";
  } else if (parsed === winningNumber) {
    challengerOneHint.innerHTML = "BOOM!";
    addCard(nameOneInput.value);
    guessCount = 0;
    clearForm();
    showDefault();
    hide();
    generateWinningNumber(min, max);
  }
};

function checkChallengerTwoGuess() {
  var parsed = parseInt(guessTwoInput.value);
  if (parsed < winningNumber) {
    challengerTwoHint.innerHTML = "that's too low";
  } else if (parsed > winningNumber) {
    challengerTwoHint.innerHTML = "that's too high";
  } else if (parsed === winningNumber) {
    challengerTwoHint.innerHTML = "BOOM!";
    addCard(nameTwoInput.value);
    guessCount = 0;
    clearForm();
    showDefault();
    hide();
    generateWinningNumber(min, max);
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
};

function clickSubmitBtn() {
  showChallengerInputs();
  hideDefault();
  guessCount += 2;
  console.log('guess count:', guessCount);
  checkChallengerOneGuess();
  checkChallengerTwoGuess();
  showNameAndGuess();
  clearGuess();
};

function clickUpdateBtn() {
  maxRangeError.classList.add("hidden");
  enableUpdateBtn();
  hideRangeDefault();
  showMinAndMaxRange();
  noRangeError.classList.add("non-error-state");
  showRange.classList.remove("hidden");
  challengerMin = parseInt(minRangeInput.value);
  challengerMax = parseInt(maxRangeInput.value);
  generateWinningNumber(challengerMax, challengerMin);
  clearRange();
  console.log('Minimum number set:', challengerMin);
  console.log('Maximum number set:', challengerMax);
};

function enableUpdateBtn() {
  var parsedMax = parseInt(maxRangeInput.value);
  var parsedMin = parseInt(minRangeInput.value);
  checkMaxRange();
  if (parsedMax < parsedMin) {
    updateBtn.classList.remove("active-btn");
  } else if (minRangeInput.value !== "" && maxRangeInput.value !== "") {
    updateBtn.disabled = false;
    updateBtn.classList.add("active-btn");
  } else {
    checkMaxRange();
    noRangeError.classList.add("non-error-state");
    updateBtn.classList.remove("active-btn");
    maxRangeError.classList.add("hidden");
    noRangeError.classList.remove("update-btn");
  }
};

function showMinAndMaxRange() {
  showMinNumber.innerText = minRangeInput.value;
  showMaxNumber.innerText = maxRangeInput.value;
  updateBtn.classList.remove("active-btn");
  updateBtn.disabled = true;
  showMinNumber.classList.remove("hidden");
  showMaxNumber.classList.remove("hidden");
};

function showNameAndGuess() {
  showNameOne.innerText = nameOneInput.value;
  showGuessOne.innerText = guessOneInput.value;
  showNameTwo.innerText = nameTwoInput.value;
  showGuessTwo.innerText = guessTwoInput.value;
  clearFormBtn.classList.remove("active-btn");
  submitBtn.classList.remove("active-btn");
  submitBtn.disabled = true;
  clearFormBtn.disabled = true;
};

function hideDefault() {
  nameOne.classList.add("hidden");
  nameTwo.classList.add("hidden");
  guessOne.classList.add("hidden");
  guessTwo.classList.add("hidden");
  hintOne.classList.add("hidden");
  hintTwo.classList.add("hidden");
};

function showDefault() {
  nameOne.classList.remove("hidden");
  nameTwo.classList.remove("hidden");
  guessOne.classList.remove("hidden");
  guessTwo.classList.remove("hidden");
  hintOne.classList.remove("hidden");
  hintTwo.classList.remove("hidden");
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

function showChallengerInputs() {
  challengerOneHint.classList.remove("hidden");
  challengerTwoHint.classList.remove("hidden");
  showNameOne.classList.remove("hidden");
  showNameTwo.classList.remove("hidden");
  showGuessOne.classList.remove("hidden");
  showGuessTwo.classList.remove("hidden");
};

function addCard(winner) {
cardContainer.insertAdjacentHTML("afterbegin", `
  <section class="game-section-wrapper card-wrapper">
    <div id="card-top-wrapper">
      <p id="vs" id="challenger-names"><span id="card-challenger-1-name">${nameOneInput.value}</span> vs <span id="card-challenger-2-name">${nameTwoInput.value}</span></p>
    </div>
    <div id="card-middle-wrapper">
      <h2 id="winner-name">${winner}</h2>
      <h2>WINNER</h2>
    </div>
    <div id="card-bottom-wrapper">
      <p><span class="card-span" id="guesses">${guessCount}</span> guesses</p>
      <p><span class="card-span" id="minute">0</span> minute <span class="card-span" id="second">23</span> second</p>
      <img class="close-icon" src="./assets/delete.svg" alt="">
    </div>
  </section>
`);
};

function pageLoad() {
  hide();
  maxRangeError.classList.add("hidden");
  noRangeError.classList.remove("update-btn");
  console.log('The winning number is:', winningNumber);
  console.log('Minimum number set:', min);
  console.log('Maximum number set:', max);
};
