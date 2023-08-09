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
      add(num1, num2);
      break;
    case 'subtract':
      subtract(num1, num2);
      break;
    case 'multiply':
      multiply(num1, num2);
      break;
    case 'divide':
      divide(num1, num2);
      break;
    default:
      break;
  }
}

function updateDisplay() {
  const display = document.querySelector('.display');
  display.textContent = calculator.displayValue;
}

function clearDisplay() {
  calculator.displayValue = null;
  updateDisplay();
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
  }
  updateDisplay();
}

function inputOperand(operand) {
  if (calculator.firstNumber == null) {
    calculator.firstNumber = +operand;
    calculator.displayValue = operand;
  } else {
    calculator.displayValue += operand;
    calculator.firstNumber = +calculator.displayValue;
  }
}

function inputDecimal() {
  if (!calculator.displayValue.includes('.')) {
    calculator.displayValue += '.';
    calculator.firstNumber = +calculator.displayValue;
  }
}

function inputSign() {
  if (+calculator.displayValue < 0)
    calculator.displayValue = calculator.displayValue.slice(1);
  else calculator.displayValue = '-' + calculator.displayValue;
  calculator.firstNumber = +calculator.displayValue;
}

updateDisplay();
