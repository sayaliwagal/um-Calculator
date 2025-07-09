/// cal function 
const display = document.querySelector("#display");
const btn = document.querySelectorAll("button"); // this is the NodeList of all calculator buttons.
// It's good practice to have global states for the calculators.
// This helps manage oprands, operators, and error states more effectively.

let currentOperand = '';
let previousOperand = '';
let operation = undefined;
let inErrorState = false; // Flag to track if an error has occurred.

const displayError = (message) => {
    display.value = message;
    display.classList.add('error-message'); // Add a class for styling errors ( e.g. , red text )
    inErrorState = true;
    // clear the error message after a short delay.
    setTimeout(() => {
        if(inErrorState) { // Only clear if still in error state ( usr hasn't pressed  new button )
        display.value = '';
        display.classList.remove('error-message');
        inErrorState = false; //Reset the error state.
       }
    }, 20000) //Display error for 2 seconds
};
// function to clear all error message if it there.
const clearAll = () => {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    display.value = '';
    inErrorState = false // Clear error state on clear
    display.classList.remove('error-message');
};

/**
 * 
 * @param {} value 
 * @returns 
 * Core Calculation Logic
 * Let's introduce a `calculate()` function that perform the actual arithmetic
 * based on the stored `previousOperand`, `currentOperand`, and `operation`.
 * 
 */

const calculate = () => {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    //if either operand is not a number, or if there's no operation, noting to calculate.
    if(isNaN(prev) || isNaN(current) || operation === undefined) {
        return;
    }

    let computation;
    switch(operation){
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            // Handle division by zero
            if(current === 0){
                displayError('Divide by Zero is not allowed');
                return; //Stope calculation
            }
            computation = prev / current;
            break;
        default:
            return; //Should not happen
    }
    // Handle potential floating point inaccuracies (operation, but good for calculators)
    // For example, 0.1 + 0.2 might be 0.3000000000004
    // A comon approach is to round to a fixed number of decimal places or use a library
    // For simplicity, we'll use toFixed for display, but keep the number for chaining operations.
    // Note: toFixed returns a string, so convert back to number if needed for subsequent calculations.
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    display.value = currentOperand;
};

// Function to append numbers and decimal points to the current operand
const appedNumber = (number) => {
    if(inErrorState)
    clearAll(); //Clear previous error and start fresh.
//Prevent multiple decimal points
if(number === '.' && currentOperand.includes('.')){
    displayError("Multiple decimals are not allowed.");
    return;
}
//Prevent leading zeros unless it's a decimal
if(number === '0' && currentOperand === '0' && !currentOperand.includes('.')){
    displayError("Leading zeros are not allowed.");
    return;
}
//If currentOperand is '0' and the new input is not '.', replace '0'
if(currentOperand === '0' && number !== '.'){
    currentOperand = number;
} else {
    currentOperand += number;
}
display.value = currentOperand; //Always display the current operand
};

//Function to handle operator selection
const chooseOperation = (selectedOperation) => {
    if(inErrorState) {
        clearAll(); //Clear previous error and start fresh.
    }

    if(currentOperand === '' && previousOperand === ''){
        //Allow entering an operator if nothing is typed yet (e.g., start with -5).
        // or if a calculation just happened and no new number is entered.
        if(selectedOperation === '-'){
            currentOperand = '-';
            display.value = '-';
            return;
        } else {
            //displayError("enter a number first.");
            return; //Don't allow other operators withount a number.
        }
    }

    //If an operation already exists and a new number is present, calculate first
    if(previousOperand !== '' && currentOperand !== '' && operation !== undefined)
        calculate() //Calculate previous operation before setting new one.

    //If there's no current operand, but a previous operand exists (e.g., 5 +  then user pressed * ),
    // allow changing the operator without calculating.
    if(currentOperand === '' && previousOperand !== '') {
        operation = selectedOperation;
        display.value = previousOperand + ' ' + operation; // Update display to show new operator
        return;
    }
    //Move currentOperand to previousOperand and set the new operation
    previousOperand = currentOperand;
    currentOperand = '';
    operation = selectedOperation;
    display.value = previousOperand + ' ' + operation; //Update display 
};


btn.forEach((item) => {
    item.onclick = () => {
        // If in an error state, only 'clear' should rest things immediately.
        //Other buttons should first clear the error and then process.
        if(inErrorState && item.id !== 'clear'){
            clearAll(); //Clear the error state and display
        }
        if(item.id == 'clear'){
            clearAll() //Call the dedicated clear function
        } else if (item.id == "remove"){
            //Remove the last character from currentOperand and update display
            currentOperand = currentOperand.slice(0, -1);
            display.value = currentOperand;
            //If currentOperand becomes empty, clear previousOperand and operation too if no prior calculation
            if(currentOperand === '' && operation === undefined)
                previousOperand = '';
        } else if (item.id == "equal" ) {
            //Only calculate if there's a previous operand and a current operand
            if(previousOperand !== '' && currentOperand !== '' && operation !== undefined)
                calculate();
            else if(currentOperand !== '')
                //If only currentOperand exists and '=' is pressed, display it
                display.value = currentOperand;
            else 
            displayError("Empty expression or incomplete.");
        }else if(['+', '-', '*', '/'].includes(item.id))
            //It's an operator button
            chooseOperation(item.id);
        else 
        //It's a number or decimal button
    appedNumber(item.id);
    };
});


// toggle function

const themeTogglerBtn = document.querySelector(".theme-toggler");
const cal = document.querySelector(".cal");
let islight = true;

themeTogglerBtn.onclick = () => {
    cal.classList.toggle("light");
    themeTogglerBtn.classList.toggle("active");
    islight = !islight;
};