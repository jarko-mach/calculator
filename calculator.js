import { calculatorKeys } from "./calculatorData.js"

var mathString = { display: "", execute: "", lastPressedKey: "" }

const handleEventClick = (event) => {
    const keyPressedDisplay = event.target.textContent
    const keyPressedIndex = calculatorKeys.findIndex(el => el.display === keyPressedDisplay)
    const keyPressedExecute = calculatorKeys[keyPressedIndex].execute

    if (!isNaN(Number(calculatorKeys[keyPressedIndex].execute))) {
        // is a number
        mathString.display += keyPressed
        mathString.execute += keyPressedExecute
    }
    else {
        // is not a number
        const earlierPressedKey = mathString.execute[mathString.execute.length - 1]
        mathString.execute += keyPressedExecute
        console.log("not a number ", mathString.execute, " ", earlierPressedKey)
    }

    displayString(mathString.display, false)
}

const handleEventEqual = (event) => {
    const actionResult = eval("" + mathString.execute)
    displayString(actionResult, true, mathString.display)
    mathString = { actionResult, actionResult }
}

const handleEventReset = (event) => {
    displayString("0", true, "0")
    mathString = { display: "0", execute: "0" }
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
    if (calculatorKeys[i].execute === "AC") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventReset, false)
    }
    if (calculatorKeys[i].execute === "%") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventReset, false)
    }
} 