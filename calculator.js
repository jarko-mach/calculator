import { calculatorKeys } from "./calculatorData.js"

var mathString = { display: "", execute: "" }

const handleEventClick = (event) => {
    const keyPressed = event.target.textContent
    const keyPressedIndex = calculatorKeys.findIndex(el => el.display === keyPressed)
    const keyPressedExecute = calculatorKeys[keyPressedIndex].execute
    mathString.display += keyPressed
    mathString.execute += keyPressedExecute
    displayString(mathString.display)
}

const handleEventEqual = (event) => {
    const actionResult = eval("" + mathString.execute)
    displayString(actionResult)
    mathString.display = actionResult
    mathString.execute = actionResult
}

const displayString = (actionResult) => {
    const inputElement = document.querySelector(".text")
    inputElement.value = actionResult
}

const divElement = document.querySelector(".boxContainer")

for (var i = 0; i < calculatorKeys.length; i++) {
    const box = document.createElement("div")
    box.textContent = calculatorKeys[i].display

    if (!isNaN(Number(calculatorKeys[i].execute))) {
        box.classList.add("singleBox", "boxWithNumber")
    }
    else box.classList.add("singleBox", "boxWithAction")

    divElement.appendChild(box)

    if (calculatorKeys[i].execute === "=") {
        box.addEventListener("click", handleEventEqual, false);
    }
    else box.addEventListener("click", handleEventClick, false);
} 