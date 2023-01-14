const add = (a, b) => {
    return [a + b, '+'];
}

const sub = (a, b) => {
    return [a - b, "-"];
}

const multi = (a, b) => {
    return [a * b, "*"];
}

const div = (a, b) => {
    return [a / b, "/"];
}

const a = 22
const b = 4

const consoleResult = (a, b, action) => {
    var result = a + " " + action[1] + " " + b + " = " + action[0]
    console.log(result)
}

consoleResult(a, b, add(a, b))
consoleResult(a, b, sub(a, b))
consoleResult(a, b, multi(a, b))
consoleResult(a, b, div(a, b))
