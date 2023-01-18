import { calculatorKeys } from "./calculatorData.js"

var mathString = { display: "", execute: "", previousKeyDisplay: "", previousKeyExecute: "" }

const handleEventClick = (event) => {
    const keyPressedDisplay = event.target.textContent
    const keyPressedIndex = calculatorKeys.findIndex(el => el.display === keyPressedDisplay)
    const keyPressedExecute = calculatorKeys[keyPressedIndex].execute

    if (!isNaN(Number(calculatorKeys[keyPressedIndex].execute))) {
        // is a number
        mathString.display += keyPressedDisplay
        mathString.execute += keyPressedExecute
        mathString.previousKeyDisplay = ""
    }
    else {
        // is not a number
        if (mathString.previousKeyDisplay !== "") {
            mathString.display = mathString.display.slice(0, -mathString.previousKeyDisplay.length)
            mathString.execute = mathString.execute.slice(0, -mathString.previousKeyExecute.length)
        }
        mathString.display += keyPressedDisplay
        mathString.execute += keyPressedExecute
        mathString.previousKeyDisplay = keyPressedDisplay
        mathString.previousKeyExecute = keyPressedExecute
    }

    displayString(mathString.display, false)
}

const handleEventEqual = (event) => {
    const actionResult = eval("" + mathString.execute)
    displayString(actionResult, true, mathString.display)
    mathString.display = actionResult
    mathString.execute = actionResult
}

const handleEventReset = (event) => {
    displayString("", true, "")
    mathString = { display: "", execute: "" }
}

const displayString = (actionResult, displayHistory, historyString) => {
    const inputElement2 = document.querySelector(".displayText")
    if (displayHistory) {
        const inputElement1 = document.querySelector(".historyText")
        inputElement1.value = historyString
    }
    inputElement2.value = actionResult
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

    box.addEventListener("click", handleEventClick, false)
    if (calculatorKeys[i].execute === "=") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventEqual, false);
    }
    if (calculatorKeys[i].execute === "C") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventReset, false)
    }
    if (calculatorKeys[i].execute === "%") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventReset, false)
    }
} 