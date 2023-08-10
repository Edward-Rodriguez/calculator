let calculator = {
  firstNumber: null,
  secondNumber: null,
  operator: null,
  displayValue: null,
};
const buttons = document.querySelectorAll('button');
buttons.forEach((button) =>
  button.addEventListener('click', handleButtonClick)
);

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

function operate(operator, num1, num2) {
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
  display.textContent = calculator.displayValue;
}

function resetCalculator() {
  Object.entries(calculator).forEach((entry) => {
    const [key, value] = entry;
    calculator[key] = null;
  });
}

function handleButtonClick(event) {
  switch (event.target.className) {
    case 'operand':
      inputOperand(event.target.value);
      break;
    case 'clear':
      resetCalculator();
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
      calculator.operator = event.target.value;
      break;
    case 'equals':
      inputEqualsOperator();
      break;
  }
  updateDisplay();
}

function inputOperand(operand) {
  if (calculator.firstNumber === null) {
    //handles first operand input
    calculator.firstNumber = +operand;
    calculator.displayValue = operand;
  } else if (calculator.operator !== null) {
    if (calculator.secondNumber === null) {
      //handles second operand input (after operator)
      calculator.secondNumber = +operand;
      calculator.displayValue = operand;
    } else {
      //keep appending operand to existing secondNumber
      if (isValidLength(calculator.displayValue + operand)) {
        calculator.displayValue += operand;
        calculator.secondNumber = +calculator.displayValue;
      }
    }
  } else {
    if (isValidLength(calculator.displayValue + operand)) {
      //keep appending to firstNumber
      calculator.displayValue += operand;
      calculator.firstNumber = +calculator.displayValue;
    }
  }
}

function inputDecimal() {
  if (!calculator.displayValue.includes('.')) {
    calculator.displayValue += '.';
    if (calculator.secondNumber == null)
      calculator.firstNumber = +calculator.displayValue;
    else calculator.secondNumber = +calculator.displayValue;
  }
}

//to toggle minus sign
function inputSign() {
  if (+calculator.displayValue < 0)
    calculator.displayValue = calculator.displayValue.slice(1);
  else calculator.displayValue = '-' + calculator.displayValue;
  if (calculator.operator != null)
    calculator.secondNumber = +calculator.displayValue;
  else calculator.firstNumber = +calculator.displayValue;
}

function inputEqualsOperator() {
  let result = operate(
    calculator.operator,
    calculator.firstNumber,
    calculator.secondNumber
  );
  calculator.displayValue = result.toString();
  //reassign first/second num for future operations
  //first will store running total, second will store next operand
  calculator.firstNumber = result;
  calculator.secondNumber = null;
  calculator.operator = null;
}

function isValidLength(input) {
  return input.length <= 10;
}

updateDisplay();
