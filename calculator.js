import { calculatorKeys } from "./calculatorData.js"

var mathString = { display: "", execute: "", previousKeyDisplay: "", previousKeyExecute: "", lastActionIsEqual: false }

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
            console.log("keyPressedIndex", keyPressedIndex)
            console.log("keyPressedKeyboard", keyPressedKeyboard)
            modifyMathString(keyPressedIndex)
        } else {
            handleEventEqual()
        }
    }
})

const modifyMathString = (keyPressedIndex) => {

    const keyPressedDisplay = calculatorKeys[keyPressedIndex].display
    const keyPressedExecute = calculatorKeys[keyPressedIndex].execute

    if (!isNaN(Number(keyPressedExecute))) {
        // is a number
        if (mathString.lastActionIsEqual) {
            handleEventReset()
            mathString.lastActionIsEqual = false
        }
        // console.log("to jest number")
        // console.log("poprzedni znak to ", mathString.previousKeyDisplay, mathString.previousKeyExecute)
    }
    else {
        // is not a number
        // console.log(mathString.previousKeyDisplay, "poprzedni znak NOT number", !isNaN(Number(mathString.previousKeyDisplay)))
        // console.log("keyPressedExecute", keyPressedExecute)
        if (isNaN(Number(mathString.previousKeyDisplay)) && keyPressedExecute !== "(" && keyPressedExecute !== ")") {
            mathString.display = mathString.display.slice(0, -mathString.previousKeyDisplay.length)
            mathString.execute = mathString.execute.slice(0, -mathString.previousKeyExecute.length)
            // console.log("ciacham", keyPressedExecute)
            // console.log("to jest znak")
        }
        else { mathString.lastActionIsEqual = false }
    }

    mathString.display += keyPressedDisplay
    mathString.execute += keyPressedExecute
    mathString.previousKeyDisplay = keyPressedDisplay
    mathString.previousKeyExecute = keyPressedExecute
    displayString(mathString.display, false)
    // console.log("wykonany modifyMathString ")
}


const handleEventEqual = (event) => {

    function floatify(number) {
        // console.log("wynik 10", parseFloat((number).toFixed(10)))
        // console.log("wynik 15", parseFloat((number).toFixed(15)))
        const wynik = parseFloat((number).toFixed(15)) - parseFloat((number).toFixed(10))

        if (Math.abs(wynik) > 0.00000000001)
            return parseFloat((number).toFixed(15))
        else
            return parseFloat((number).toFixed(10))
    }

    function isUndefined(string) {
        try {
            eval(string)
            return true
        } catch {
            return false
        }
    }

    var actionResult = ""

    if ((mathString.execute.length !== 0) && (isUndefined(mathString.execute) === true)) {
        // console.log("niby ok")
        actionResult = floatify(eval("" + mathString.execute))
        // console.log("obliczam: ", mathString.execute, "=", actionResult)
        displayString(actionResult, true, mathString.display)
        mathString.display = actionResult
        mathString.execute = actionResult
        mathString.lastActionIsEqual = true
        console.log("wykonany event equal")
    }
    else { 
        // console.log("niby nie ok") 
    }
}

const handleEventReset = (event) => {
    displayString("", true, "")
    mathString = { display: "", execute: "", previousKeyDisplay: "", previousKeyExecute: "", lastActionIsEqual: false }
}

const handleEventProcent = (event) => {
    console.log("ma być obliczanie procentu")
}

const handleEventLeftBracket = (event) => {
    console.log("ma być lewy nawias")
}

const handleEventRightBracket = (event) => {
    console.log("ma być prawy nawias")
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
    if (calculatorKeys[i].execute === "(") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventLeftBracket, false)
    }

    if (calculatorKeys[i].execute === ")") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventRightBracket, false)
    }


    if (calculatorKeys[i].execute === "%") {
        box.removeEventListener("click", handleEventClick, false)
        box.addEventListener("click", handleEventProcent, false)
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