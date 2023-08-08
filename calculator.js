let calculator = {
  firstNumber: null,
  secondNumber: null,
  operator: '',
  displayValue: '',
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

function handleButtonClick(event) {
  let elementClassList = event.target.className.split(' ');
  if (elementClassList.includes('operand')) {
    calculator.displayValue += event.target.value;
  } else if (
    elementClassList.includes('decimal') &&
    !calculator.displayValue.includes('.')
  ) {
    calculator.displayValue += '.';
  }
  // elementClass.some((className) => ['operand', 'decimal'].includes(className))

  // if (elementClass.includes('operand')) {
  //   calculator.displayValue += event.target.value;
  // } else if (className.includes('decimal'))
  //   if (!calculator.displayValue.includes('.')) {
  //     calculator.displayValue += event.target.value;
  //   }
  updateDisplay();
}
