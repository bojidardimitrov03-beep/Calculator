
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}

function roundResult(number) {
    return Math.round(number * 100) / 100;
}

function operate(operator, firstNumber, secondNumber) {
    try {
        switch (operator) {
            case '+':
                return add(firstNumber, secondNumber);
            case '-':
                return subtract(firstNumber, secondNumber);
            case '*':
                return multiply(firstNumber, secondNumber);
            case '/':
                return divide(firstNumber, secondNumber);
            default:
                throw new Error("Invalid operator");
        }
    } catch (error) {
        return "nice try";
    }
}

let displayValue = '0';
let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;

const display = document.querySelector('.display');


function updateDisplay() {
    display.textContent = displayValue;
}

updateDisplay();

const numberButtons = document.querySelectorAll('.number');


numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const number = button.textContent;
        if (waitingForSecondNumber) {
            displayValue = number;
            waitingForSecondNumber = false;
        } else if (displayValue === '0') {
            displayValue = number;
        } else {
            displayValue += number;
        }

        updateDisplay();
    });
});
const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
    displayValue = '0';
    firstNumber = "";
    operator = "";
    waitingForSecondNumber = false;
    updateDisplay();
});


const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedOperator = button.textContent;

        if (firstNumber === "") {
            firstNumber = displayValue;
            operator = selectedOperator;
            waitingForSecondNumber = true;
        } else if ((operator && !waitingForSecondNumber)) {
            const result = operate(operator, parseFloat(firstNumber), parseFloat(displayValue));
            displayValue = typeof result === 'number' ? String(roundResult(result)) : result;
            firstNumber = displayValue;
            operator = selectedOperator;
            waitingForSecondNumber = true;
        } else {
            operator = selectedOperator;
        }
    });
});

const equalsButton = document.querySelector('.equals');

equalsButton.addEventListener('click', () => {
    if (firstNumber !== "" && operator && !waitingForSecondNumber) {
        const result = operate(operator, parseFloat(firstNumber), parseFloat(displayValue));
        displayValue = typeof result === 'number' ? String(roundResult(result)) : result;
        firstNumber = "";
        operator = "";
        waitingForSecondNumber = false;
        updateDisplay();
    }
});
const decimalButton = document.querySelector('.decimal');

decimalButton.addEventListener('click', () => {
    if (waitingForSecondNumber) {
        displayValue = '0.';
        waitingForSecondNumber = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
});


const backspaceButton = document.querySelector('.backspace');

backspaceButton.addEventListener('click', () => {
    if (displayValue.length === 1) {
        displayValue = "0";
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
});

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if(key >= '0' && key <= '9') {
        const numberButton = Array.from(numberButtons).find(button => button.textContent === key);
        if (numberButton) numberButton.click();
    }
    if (key === `+` || key === `-` || key === `*` || key === `/`) {
        const operatorButton = Array.from(operatorButtons).find(button => button.textContent === key);
        if (operatorButton) operatorButton.click();
    }
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        equalsButton.click();
    }
    if (key === 'Backspace') {
        event.preventDefault();
        backspaceButton.click();
    }
    if (key === 'Escape') {
        clearButton.click();
    }
    if (key === '.') {
        decimalButton.click();
    }
});





