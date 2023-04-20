import { calculatorKeys } from "./calculatorData.js"

var mathString

const MathStringZero = () => {
    mathString = { display: "", execute: "", previousKeyDisplay: "", previousKeyExecute: "", lastActionIsEqual: false }
}

const handleEventClick = (event) => {
    const keyPressedDisplay = event.target.textContent
    const keyPressedIndex = calculatorKeys.findIndex(el => el.display === keyPressedDisplay)
    modifyMathString(keyPressedIndex)
}

document.addEventListener('keydown', (event) => {
    const keyPressedKeyboard = event.key
    const keyPressedIndex = calculatorKeys.findIndex(el => el.keyboard === keyPressedKeyboard)
    if (keyPressedIndex > -1) {
        if (calculatorKeys[keyPressedIndex].keyboard !== "Enter") {
            modifyMathString(keyPressedIndex)
        } else {
            handleEventEqual()
        }
    }
})

const modifyMathString = (keyPressedIndex) => {

    document.querySelector(".displayText").classList.remove("calculation_error")

    const keyPressedDisplay = calculatorKeys[keyPressedIndex].display
    const keyPressedExecute = calculatorKeys[keyPressedIndex].execute

    if (!isNaN(Number(keyPressedExecute))) {
        // is a number
        if (mathString.lastActionIsEqual) {
            handleEventReset()
            mathString.lastActionIsEqual = false
        }
    }
    else {
        // is not a number
        if ((isNaN(Number(mathString.previousKeyDisplay)) && mathString.previousKeyDisplay !== ")" && keyPressedExecute !== ".")) {
            mathString.display = mathString.display.slice(0, -mathString.previousKeyDisplay.length)
            mathString.execute = mathString.execute.slice(0, -mathString.previousKeyExecute.length)
        }
        else { mathString.lastActionIsEqual = false }
    }

    mathString.display += keyPressedDisplay
    mathString.execute += keyPressedExecute
    mathString.previousKeyDisplay = keyPressedDisplay
    mathString.previousKeyExecute = keyPressedExecute
    displayString(mathString.display, false)
}

const handleEventEqual = (event) => {

    function floatify(number) {
        const wynik = parseFloat((number).toFixed(15)) - parseFloat((number).toFixed(10))

        if (Math.abs(wynik) > 0.00000000001)
            return parseFloat((number).toFixed(15))
        else
            return parseFloat((number).toFixed(10))
    }

    function isNotUndefined(string) {
        try {
            eval(string)
            return true
        } catch {
            return false
        }
    }

    var actionResult = ""

    if ((mathString.execute.length !== 0) && (isNotUndefined(mathString.execute) === true)) {
        actionResult = floatify(eval("" + mathString.execute))
        displayString(actionResult, true, mathString.display)
        mathString.display = actionResult
        mathString.execute = actionResult
        mathString.lastActionIsEqual = true
    }
    else {
        var inputElement = document.querySelector(".displayText")
        inputElement.value = "nieokreślony wynik"
        inputElement.classList.add("calculation_error")
        inputElement = document.querySelector(".historyText")
        inputElement.value = mathString.display
    }
}

const handleEventReset = (event) => {
    displayString("", true, "")
    MathStringZero()
}

const handleEventCE = (event) => {
    const indexOfCalc = calculatorKeys.findIndex(elem => elem.display === mathString.previousKeyDisplay)
    mathString.display = mathString.display.slice(0, -calculatorKeys[indexOfCalc].display.length)
    mathString.execute = mathString.execute.slice(0, -calculatorKeys[indexOfCalc].execute.length)
    displayString(mathString.display, false)
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
MathStringZero()

for (var i = 0; i < calculatorKeys.length; i++) {
    const box = document.createElement("button")
    box.textContent = calculatorKeys[i].display

    if (!isNaN(Number(calculatorKeys[i].execute))) {
        box.classList.add("singleBox", "boxWithNumber")
    }
    else box.classList.add("singleBox", "boxWithAction")

    divElement.appendChild(box)

    box.addEventListener("click", handleEventClick, false)

    if (calculatorKeys[i].execute === "CE") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventCE, false)
    }

    if (calculatorKeys[i].execute === "C") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventReset, false)
    }

    if (calculatorKeys[i].execute === "=") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventEqual, false);
    }
}