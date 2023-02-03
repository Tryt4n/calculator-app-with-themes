const digitButtons = document.querySelectorAll("[data-btn-digit]");
const operationButtons = document.querySelectorAll("[data-btn-operation]");
const btnComma = document.querySelector("[data-btn-comma]");
const btnDel = document.querySelector("[data-btn-del]");
const btnReset = document.querySelector("[data-btn-reset]");
const btnEqual = document.querySelector("[data-btn-equal]");
const computationScreen = document.querySelector("[data-computation-screen]");

export function computation() {
  let lastCharacterWasOperator = false;
  let lastCharacterWasComma = false;

  // Set default value
  if (computationScreen.textContent === "") {
    computationScreen.textContent = "0";
  }

  // Show integer characters in computation screen
  digitButtons.forEach((btnDigit) => {
    btnDigit.addEventListener("click", () => {
      let displayedDigit = computationScreen.textContent;
      if ((computationScreen.textContent === "") | (computationScreen.textContent === "0")) {
        displayedDigit = "";
      }

      computationScreen.textContent = displayedDigit + btnDigit.textContent;
      lastCharacterWasOperator = false;
    });
  });

  // Show operation character in computation screen
  operationButtons.forEach((btnOperation) => {
    btnOperation.addEventListener("click", () => {
      let displayedOperation = computationScreen.textContent;
      if ((computationScreen.textContent === "") | (computationScreen.textContent === "0")) return;

      let computationScreenArray = Array.from(computationScreen.textContent);

      // Overwrite operation symbol if it already exist
      if (lastCharacterWasOperator) {
        computationScreenArray.pop();
        displayedOperation = computationScreenArray.join("");
      }

      computationScreen.textContent = displayedOperation + btnOperation.textContent;
      lastCharacterWasOperator = true;
      lastCharacterWasComma = false;
    });
  });

  // Handle with `,` character
  btnComma.addEventListener("click", () => {
    let computationScreenArray = Array.from(computationScreen.textContent);

    let displayedComma = computationScreen.textContent;
    let lastCharacter = computationScreenArray[computationScreenArray.length - 1];

    // If last character in computation screen isn't a number then adding `0` before `,`
    if (!displayedComma || !/\d/.test(lastCharacter)) {
      displayedComma = displayedComma + "0";
    }

    // Prevents btnComma from being pressed twice at the group of digits;
    if (lastCharacterWasComma) return;

    computationScreen.textContent = displayedComma + btnComma.textContent;
    lastCharacterWasOperator = false;
    lastCharacterWasComma = true;
  });

  // Deleting last character in computation screen
  btnDel.addEventListener("click", () => {
    let computationScreenArray = Array.from(computationScreen.textContent);
    computationScreenArray.pop();
    computationScreen.textContent = computationScreenArray.join("");
    lastCharacterWasOperator = false;
    lastCharacterWasComma = false;

    if (computationScreen.textContent === "") computationScreen.textContent = "0";
  });

  // Reset all
  btnReset.addEventListener("click", () => {
    computationScreen.textContent = "0";
  });

  // Calculate the result
  btnEqual.addEventListener("click", () => {
    computationScreen.textContent = eval(computationScreen.textContent);
  });
}
