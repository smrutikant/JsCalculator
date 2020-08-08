const outputBox = document.getElementById("outputBox");
const performOperationBtn = document.getElementById("equals");
const changeTheme = document.getElementById("theme");
let currentTheme = "styles/style.css";
let operand1 = false;
let operand2 = false;
let operatorClicked = false;
let theOperation = false;
let result = false;

const button1 = document.getElementById("button_1");
const button2 = document.getElementById("button_2");
const button3 = document.getElementById("button_3");
const button4 = document.getElementById("button_4");
const button5 = document.getElementById("button_5");
const button6 = document.getElementById("button_6");
const button7 = document.getElementById("button_7");
const button8 = document.getElementById("button_8");
const button9 = document.getElementById("button_9");
const button0 = document.getElementById("button_0");

var numberButtons = document.getElementsByClassName("numberbtns");
for (var i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", handleNumberButtonClicked, false);
}

var operators = document.getElementsByClassName("operators");
for (var i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", setOperation, false);
}

function setOperation() {
  if (operatorClicked) {
    result = performOperation(theOperation);
    displayResult();
  }
  if (operand1) {
    var operation = this.getAttribute("operation");
    theOperation = operation;
  }
  operatorClicked = true;
  return false;
}

function handleNumberButtonClicked() {
  var inputValue = this.getAttribute("intval");
  if (!operatorClicked) {
    if (operand1) {
      operand1 = operand1 + "" + inputValue;
    } else {
      operand1 = inputValue;
    }
    outputBox.value = operand1;
  } else {
    if (operand2) {
      operand2 = operand2 + "" + inputValue;
    } else {
      outputBox.value = "";
      operand2 = inputValue;
    }
    outputBox.value = operand2;
  }
}

performOperationBtn.addEventListener("click", () => {
  if (theOperation) {
    result = performOperation(theOperation);
    displayResult();
  }
  return false;
});

function displayResult() {
  outputBox.value = result;
  operand1 = result;
  operand2 = false;
}

/*Special Operations */
document.getElementById("sqrt").addEventListener("click", function () {
  if (operand1) {
    result = performOperation("sqrt");
    displayResult();
  }
  return false;
});

document.getElementById("ac").addEventListener("click", function () {
  operand1 = false;
  operand2 = false;
  operatorClicked = false;
  theOperation = false;
  result = false;
  outputBox.value = "";
});

document.getElementById("ce").addEventListener("click", function () {
  if (operand1) {
    operand2 = false;
    outputBox.value = "";
  }
});

document.getElementById("per").addEventListener("click", function () {
  if (operand2) {
    if (theOperation === "addition" || theOperation === "substraction") {
      operand2 = (operand1 / 100) * operand2;
    } else if (
      theOperation === "multiplication" ||
      theOperation === "division"
    ) {
      operand2 = operand2 / 100;
    }
    outputBox.value = operand2;
  } else if (operand1) {
    operand1 = operand1 / 100;
    result = operand1;
    displayResult();
  }
  return false;
});

function performOperation(operation) {
  switch (operation) {
    case "addition":
      return +operand1 + +operand2;
      break;

    case "substraction":
      return operand1 - operand2;
      break;
    case "multiplication":
      return operand1 * operand2;
      break;
    case "division":
      return operand1 / operand2;
      break;
    case "sqrt":
      return Math.sqrt(operand1);
  }
}

changeTheme.addEventListener("click", function () {
  changeCSS();
});

function changeCSS() {
  if (currentTheme == "styles/style.css") {
    currentTheme = "styles/style-dark.css";
    document.getElementById("theme").setAttribute("src", "images/col.png");
  } else {
    currentTheme = "styles/style.css";
    document.getElementById("theme").setAttribute("src", "images/inv.png");
  }
  var oldlink = document.getElementsByTagName("link").item(0);
  var newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("href", currentTheme);
  document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
