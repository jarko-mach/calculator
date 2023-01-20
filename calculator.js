import { calculatorKeys } from "./calculatorData.js"

var mathString = { display: "", execute: "", previousKeyDisplay: "", previousKeyExecute: "", lastActionIsEqual: false }

const handleEventClick = (event) => {
    const keyPressedDisplay = event.target.textContent
    const keyPressedIndex = calculatorKeys.findIndex(el => el.display === keyPressedDisplay)
    const keyPressedExecute = calculatorKeys[keyPressedIndex].execute

    if (!isNaN(Number(keyPressedExecute))) {
        // is a number
        if (mathString.lastActionIsEqual) {
            handleEventReset()
            mathString.lastActionIsEqual = false
        }
        console.log("to jest numer")
        console.log("poprzedni znak to ", mathString.previousKeyDisplay, mathString.previousKeyExecute)
    }
    else {
        // is not a number
        console.log(mathString.previousKeyDisplay, "is a number", !isNaN(Number(mathString.previousKeyDisplay)))
        console.log("keyPressedExecute", keyPressedExecute)
        if (isNaN(Number(mathString.previousKeyDisplay)) && keyPressedExecute !== "(" && keyPressedExecute !== ")") {
            mathString.display = mathString.display.slice(0, -mathString.previousKeyDisplay.length)
            mathString.execute = mathString.execute.slice(0, -mathString.previousKeyExecute.length)
            console.log("ciacham", keyPressedExecute)
            console.log("to jest znak")
        }
        else { mathString.lastActionIsEqual = false }
    }

    mathString.display += keyPressedDisplay
    mathString.execute += keyPressedExecute
    mathString.previousKeyDisplay = keyPressedDisplay
    mathString.previousKeyExecute = keyPressedExecute
    displayString(mathString.display, false)
    console.log("wykonany event click")
}

const handleEventEqual = (event) => {
    var actionResult = ""
    if (mathString.execute.length !== 0) {
        actionResult = eval("" + mathString.execute)
        console.log("obliczam: ", mathString.execute, "=", actionResult)
    }
    displayString(actionResult, true, mathString.display)
    mathString.display = actionResult
    mathString.execute = actionResult
    mathString.lastActionIsEqual = true
    console.log("wykonany event equal")
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
    const box = document.createElement("button")
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

document.addEventListener('keydown', (event) => {
    console.log(event.key)
})