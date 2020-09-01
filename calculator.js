//this is a function. 
const calculate = (n1, operator, n2) => {
  let result = ""
    
  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2)
  }
    
    return result;
}

//main code
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");
const previousKeyType = calculator.dataset.previousKeyType;

keys.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType

  if (!action) {
    //if (displayedNum === ".number-key") {
      //display.textContent = previousKeyType + displayedNum;
    //}

  if (displayedNum === "0" || previousKeyType === "operator" || previousKeyType === "calculate") {
        display.textContent = keyContent;
  } else {
      display.textContent = displayedNum + keyContent;
  }
  calculator.dataset.previousKeyType = "number"
  }
//when decimal key is pressed
  if (action === "decimal") {
    if (!displayedNum.includes(".")) {
      display.textContent = displayedNum + "."; 
    } else if (previousKeyType === "operator" || previousKeyType === "calculate") {
      display.textContent = "0." + displayedNum
      }
      calculator.dataset.previousKeyType = "decimal"
    }

  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    key.classList.add("is-depressed")
    // Add custom attribute
    calculator.dataset.previousKeyType = 'operator'
    calculator.dataset.firstValue = displayedNum
    calculator.dataset.operator = action
    
    if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {  
      display.textContent = calculate(firstValue, operator, secondValue);
      const calcValue = calculate(firstValue, operator, secondValue);
      display.textContent = calcValue;
      calculator.dataset.firstValue = calcValue
    } else {
    // If there are no calculations, set displayedNum as the firstValue
    calculator.dataset.firstValue = displayedNum
    }
  }

  if (action === "calculate") {
    calculator.dataset.previousKeyType = "calculate"
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayedNum;
    if (firstValue) {
      if (previousKeyType === "calculate") {
          firstValue = displayedNum
          secondValue = calculator.dataset.modValue
      }
    display.textContent = calculate(firstValue, operator, secondValue);
    }
    calculator.dataset.modValue = secondValue
    calculator.dataset.previousKeyType = "calculate"
  }

  if (action === "clear"){
    if (key.textContent === "AC") {
      calculator.dataset.firstValue = ""
      calculator.dataset.modValue = ""
      calculator.dataset.operator = ""
      calculator.dataset.previousKeyType = ""
    } else {
    key.textContent = "AC";
    }
    display.textContent = 0;
    calculator.dataset.previousKeyType = "clear";
  }

  if (action !== "clear") {
    const clearButton = calculator.querySelector("[data-action=clear]");
    clearButton.textContent = "CE";
  }

  Array.from(key.parentNode.children) 
      .forEach(k => k.classList.remove("is-depressed"))
}
})
