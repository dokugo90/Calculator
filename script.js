//Queries 
const numbers = document.querySelectorAll(".number")
const screen = document.querySelector(".screen")
const final = document.querySelector(".final")
const otherScreen = document.querySelector(".otherScreen")
const operator = document.querySelectorAll(".operator")
const clearBtn = document.querySelector(".clear")
const eraseBtn = document.querySelector(".erase")
const Calculator = document.querySelector("#button")
const equalsBtn = document.querySelector(".equals")
const talk = document.querySelector(".talk")

//Slider
const sliderThumb = document.querySelector(".slider-thumb")
let body = document.body;

let changed = true;

function changeTheme(e) {
    if (changed) {
        sliderThumb.style.transform = 'translateX(41px)';
        sliderThumb.onclick = () => (changed = false)
        body.style.background = 'linear-gradient(to right, black 0%,black 40%,#0ef 60%, white 100%)'
        sliderThumb.style.backgroundColor = 'white'
        Calculator.style.backgroundColor = 'white'
        Calculator.style.boxShadow = '0px 0px 5px 5px white'
        final.style.backgroundColor = 'black'
        screen.style.color = 'white'
        talk.textContent = 'Light theme 🌞'
        talk.style.color = 'white'
    } if (!changed) {
        body.style.background = 'linear-gradient(to right, white 0%,white 40%,#0ef 60%, black 100%)'
        sliderThumb.style.transform = 'translateX(0px)'
        sliderThumb.style.backgroundColor = 'black'
        Calculator.style.backgroundColor = 'black'
        final.style.backgroundColor = 'white'
        Calculator.style.boxShadow = '0px 0px 5px 5px black'
        screen.style.color = 'black'
        sliderThumb.onclick = () => (changed = true)
        talk.textContent = 'Dark Theme 🌚'
        talk.style.color = 'black'
    } 
}

sliderThumb.addEventListener("click", changeTheme)

//Calculator 
let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false


numbers.forEach((button) => 
    button.addEventListener("click", () => addToScreen(button.textContent))
)

operator.forEach((elem) => 
    elem.addEventListener("click", () => setOperation(elem.textContent))
)

let click = false;
let keydown = false;

document.onkeydown = () => (keydown = true)
document.onclick = () => (click = true)

function addToScreen(value) {
  if (screen.textContent === '0' || shouldResetScreen) 
    resetScreen()
  screen.textContent += value
  setTalk()
}

function resetScreen() {
    screen.textContent = ''
    shouldResetScreen = false
}

function setOperation(value) {
  if (currentOperation !== null) evaluate();
    firstOperand = screen.textContent;
    currentOperation = value;
    shouldResetScreen = true
}

 function evaluate() {
    secondOperand = screen.textContent
    screen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )

  currentOperation = null
}

/*function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷' 
    if (keyboardOperator === '*') return 'x'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
    if (keyboardOperator === '%') return '%'
  }*/

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }

  function add(a, b) {
    return a + b
  }
  
  function subtract(a, b) {
    return a - b
  }
  
  function multiply(a, b) {
    return a * b
  }
  
  function divide(a, b) {
    return a / b
  }
  
  function percent(a, b) {
      return (a / 100) * b
  }
  
  function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        talk.textContent = `Your answer is ${a + b} 🔢`
        return add(a, b)
      case '-':
        talk.textContent = `Your answer is ${a - b} 🔢`
        return subtract(a, b)
      case 'x':
        talk.textContent = `Your answer is ${a * b} 🔢`
        return multiply(a, b)
      case '÷':
        talk.textContent = `Your answer is ${a / b} 🔢`
        if (b === 0) return null
        else return divide(a, b)
      case '%':
        talk.textContent = `Your answer is ${(a / 100) * b} 🔢`
          return percent(a, b)
      default:
        return null
    }
  }

function clearAll() {
  screen.textContent = '0'
  talk.textContent = 'I don\'t like it when you delete 😔'
    addToScreen(value)
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
    shouldResetScreen = false
    
}

function EraseNumber() {
    screen.textContent = screen.textContent
    .toString()
    .slice(0, -1);
    if (screen.textContent.length === 0) {
      screen.textContent = '0'
    }
    setTalk()
}

function Keyboard(e) {
    if (e.key <= 9 && e.key >= 0) {
        addToScreen(e.key)
    } if (e.key == 'Backspace') EraseNumber();
    if (e.key === 'Enter' || e.key === '=') evaluate();
    setTalk(e.key)
    convertKeyboard(e.key)
 } 

 function convertKeyboard(e) {
  if (e === '+') setOperation('+');
  if (e === '/') setOperation('÷');
  if (e === '-') setOperation('-');
  if (e === 'x') setOperation('x');
  if (e === '%') setOperation('%');
 }

 let key = false;

 document.onkeydown = () => (key = true)
 document.onclick = () => (key = false)

 function setTalk(value) {
  if (screen.textContent.length === 20) {
    talk.textContent = `Woah ${screen.textContent.length} digits 🤯`
  } if (screen.textContent.length < 20) {
    talk.textContent = 'Calculate 🙂'
  } else if (screen.textContent.length > 100) {
    talk.textContent = ''
  } if (screen.textContent == '0') {
    talk.textContent = 'Hi again🙂'
  } if (key) {
    talk.textContent = `You pressed ${value} on your keyboard 🧑🏻‍💻​`
    if (value == undefined) {
      talk.textContent = 'You pressed a button'
    }
  } operator.forEach((button) => 
  button.addEventListener("click", () => {
    if (button.textContent == 'x') talk.textContent = 'times';
    if (button.textContent == '/') talk.textContent = 'divide';
    if (button.textContent == '+') talk.textContent = 'plus';
    if (button.textContent == '-') talk.textContent = 'minus';
    if (button.textContent == '%') talk.textContent = 'percent';
  }))
 } 

equalsBtn.addEventListener("click", evaluate)
window.addEventListener("keydown", Keyboard)
eraseBtn.addEventListener("click", EraseNumber)
clearBtn.addEventListener("click", clearAll)



