let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayValue = '';

document.addEventListener('keydown', (event) => {
  let name = event.key;
  if (name === 'Enter') name = '=';
  const key = document.querySelector(`[data-key="${name}"]`);
  if (key !== null) key.click();
});

const buttons = document.querySelectorAll('button');
buttons.forEach((button) =>
  button.addEventListener('click', handleButtonClick)
);

function handleButtonClick(event) {
  switch (event.target.className) {
    case 'operand':
      inputOperand(event.target.value);
      break;
    case 'clear':
      resetCalculator();
      break;
    case 'backspace':
      inputBackspace();
      break;
    case 'decimal':
      inputDecimal();
      break;
    case 'sign':
      inputSign();
      break;
    case 'percent':
      inputPercent();
      break;
    case 'operator':
      inputOperator(event.target.value);
      break;
    case 'equals':
      inputEqualsOperator();
      break;
  }
  updateDisplay();
}

function operate(operator, num1, num2) {
  if (num2 == null) num2 = num1;
  switch (operator) {
    case 'add':
      return add(num1, num2);
    case 'subtract':
      return subtract(num1, num2);
    case 'multiply':
      return multiply(num1, num2);
    case 'divide':
      return divide(num1, num2);
    default:
      break;
  }
}

function updateDisplay() {
  const display = document.querySelector('.display');
  display.textContent = displayValue;
}

function resetCalculator() {
  firstNumber = secondNumber = operator = null;
  displayValue = '';
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function inputOperand(operand) {
  if (firstNumber === null) {
    //handles first operand input
    firstNumber = +operand;
    displayValue = operand;
  } else if (operator !== null) {
    if (secondNumber === null) {
      //handles second operand input (after operator)
      secondNumber = +operand;
      displayValue = operand;
    } else {
      //keep appending operand to existing secondNumber
      if (isValidLength(displayValue + operand)) {
        displayValue += operand;
        secondNumber = +displayValue;
      }
    }
  } else {
    if (isValidLength(displayValue + operand)) {
      //keep appending to firstNumber
      displayValue += operand;
      firstNumber = +displayValue;
    }
  }
}

function inputOperator(input) {
  if (operator != null && secondNumber !== null) {
    inputEqualsOperator();
  }
  operator = input;
}

function inputBackspace() {
  if (displayValue) {
    displayValue = displayValue.slice(0, -1);
    if (secondNumber == null) {
      displayValue ? (firstNumber = +displayValue) : (firstNumber = null);
    } else {
      displayValue ? (secondNumber = +displayValue) : (secondNumber = null);
    }
  }
}

function inputDecimal() {
  if (displayValue == '' || !displayValue.includes('.')) {
    displayValue += '.';
    if (secondNumber == null) firstNumber = +displayValue;
    else secondNumber = +displayValue;
  } else if (operator !== null) {
    displayValue = '.';
    secondNumber = +displayValue;
  }
}

//to toggle minus sign
function inputSign() {
  if (+displayValue < 0) displayValue = displayValue.slice(1);
  else displayValue = '-' + displayValue;
  if (operator != null) secondNumber = +displayValue;
  else firstNumber = +displayValue;
}

function inputEqualsOperator() {
  if (operator !== null) {
    let result = operate(operator, firstNumber, secondNumber);
    if (result === Infinity) {
      displayValue = 'lol';
      firstNumber = NaN;
      return;
    } else if (isFinite(result)) {
      if (!isValidLength(result)) result = roundValue(result);
    }
    displayValue = result.toString();
    //reassign first/second num for future operations
    //first will store running total, second will store next operand
    firstNumber = result;
    secondNumber = null;
    operator = null;
  }
}

function isValidLength(input) {
  roundValue(input.toString());
  return input.toString().length <= 10;
}

function roundValue(value) {
  console.log(value);
  value = value.toString();
  if (value.includes('.')) {
    const decimalIndex = value.indexOf('.');
    console.log((+value).toFixed(10 - decimalIndex));
    return (+value).toFixed(10 - decimalIndex);
  } else {
    return (+value).toExponential(4);
  }
}
