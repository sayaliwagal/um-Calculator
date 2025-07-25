# um-Calculator
Calculator

This is a web-based calculator application built with HTML, CSS, and JavaScript. It provides basic arithmetic operations and demonstrates a more robust way to handle calculator logic compared to relying solely on eval().


🚀 **[Live Demo Available Here!](https://umcalculator.netlify.app//)**


Features

Basic Arithmetic: Supports addition (+), subtraction (-), multiplication (*), and division (/).

Decimal Support: Allows input of decimal numbers.

Input Validation:

Prevents multiple decimal points in a single number.

Prevents leading zeros (e.g., 007 becomes 7, but 0.5 is allowed).

Clear Functionality: C button to clear all input and reset the calculator.

Backspace/Remove: DEL button to remove the last digit or operator entered.

Error Handling: Displays user-friendly error messages for:

Multiple decimals.

Leading zeros.

Division by zero.

Empty expressions.

Syntax errors (general invalid input).

Chained Operations: Allows continuous calculations (e.g., 5 + 3 - 2).

Theme Toggler: A button to switch between light and dark themes for better user experience.

How to Use

Open the index.html file in your web browser.

Input Numbers: Click the number buttons (0-9) to enter digits.

Add Decimal: Click the . button to add a decimal point.

Select Operation: Click +, -, *, or / to choose an arithmetic operation.

Calculate Result: Click the = button to see the result of your calculation.

Clear All: Click the C button to clear the display and reset the calculator.

Delete Last Input: Click the DEL button to remove the last character entered.

Toggle Theme: Click the theme toggler button (usually a sun/moon icon) to switch between light and dark modes.

Technical Details

This calculator implements a state-based logic for handling operations, moving away from the eval() function for security and better control.

State Variables:

currentOperand: Stores the number currently being typed by the user.

previousOperand: Stores the first number in an operation (e.g., 5 in 5 + 3).

operation: Stores the selected arithmetic operator (+, -, *, /).

inErrorState: A flag to manage the display and clearing of error messages.

Modular Functions:

displayError(message): Manages displaying and clearing error messages.

clearAll(): Resets all calculator states.

appendNumber(value): Handles input for numbers and decimal points, including validation.

chooseOperation(selectedOperation): Manages the logic when an operator button is pressed, potentially triggering a calculate() call if a previous operation is pending.

calculate(): Performs the actual arithmetic calculation based on previousOperand, currentOperand, and operation.

DOM Manipulation: Uses standard JavaScript to interact with HTML elements and update the display.

Technologies Used

HTML5: For the structure of the calculator.

CSS3: For styling and visual presentation, including the theme toggle.

JavaScript (ES6+): For all the interactive logic and calculations.

Future Enhancements

Keyboard Support: Allow users to interact with the calculator using their keyboard.

Order of Operations: Implement PEMDAS/BODMAS for more complex expressions.

Advanced Operations: Add functions like square root, percentage, power, etc.

History: Display a history of calculations.

Responsive Design Improvements: Further optimize for various screen sizes.