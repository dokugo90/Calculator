let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false
const userNameTwo = document.querySelector('.username')
const user = document.querySelector('.btnTwo')

user.addEventListener('click', () => {
    userName.textContent = `Welcome, ${userNameTwo.value}`
    if (userNameTwo.value.length > 15 || userNameTwo.value.length == 0) {
      userName.textContent = `Welcome`
    }
    userNameTwo.classList.add('add')
    user.classList.add('add')
  })
const userName = document.querySelector('.name')
const words = document.querySelector('.wrap')
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent)),
)


operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent)),
)

function appendNumber(number) {
  if (currentOperationScreen.textContent === '0' || shouldResetScreen)
    resetScreen()
  currentOperationScreen.textContent += number
    if (currentOperationScreen.textContent.length >= 20) {
      currentOperationScreen.textContent = '0'
      words.style.transform = 'scale(1.3)'
      words.style.transition = 'transform 0.3s ease-in-out'
      words.textContent = `${userNameTwo.value}, you reached the max limit of 20 characters (Auto Reset Screen to avoid glitches)`
      if (userNameTwo.value.length == 0 || userNameTwo.value.length > 15) {
        words.textContent = `You reached max limit of 20 characters (Auto Reset Screen to avoid glitches)`
      }
  } else if (currentOperationScreen.textContent.length < 20) {
    words.textContent = ""
    numberButtons.forEach((button) =>
    button.disabled = false
    ) 
  }
}


function resetScreen() {
  currentOperationScreen.textContent = ''
  shouldResetScreen = false
}

function clear() {
  currentOperationScreen.textContent = '0'
  lastOperationScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function appendPoint() {
  if (shouldResetScreen) resetScreen()
  if (currentOperationScreen.textContent === '')
    currentOperationScreen.textContent = '0'
  if (currentOperationScreen.textContent.includes('.')) return
  currentOperationScreen.textContent += '.'
}

function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1)
    if (currentOperationScreen.textContent.length == 0) {
      currentOperationScreen.textContent = '0'
    }
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = currentOperationScreen.textContent
  currentOperation = operator
  
  shouldResetScreen = true
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = currentOperationScreen.textContent
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )

  currentOperation = null
}




function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return 'x'
  if (keyboardOperator === '-') return '-'
  if (keyboardOperator === '+') return '+'
  if (keyboardOperator === '%') return '%'
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function perc(a, b) {
    return (a / 100) * b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '-':
      return substract(a, b)
    case 'x':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    case '%':
        return perc(a, b)
    default:
      return null
  }
}

const black = document.getElementById('black')
const white = document.getElementById('white')
const body = document.querySelector('body')
const calc = document.querySelector('#wrapper')
const text = document.querySelector('h1')
const percent = document.getElementById('percent')
const divi = document.getElementById('divi')
const multi = document.getElementById('multi')
const minus = document.getElementById('minus')
const plus = document.getElementById('plus')
const display = document.getElementById('result')


white.disabled = true
white.textContent = 'Active'
white.style.backgroundColor = 'aqua'


black.addEventListener('click', () => {
    body.style.backgroundColor = 'black'
    calc.style.backgroundColor = 'white'
    text.style.color = 'white'
    black.disabled = true
    white.disabled = false
    black.textContent = 'Active'
    white.textContent = 'Light Theme'
    black.style.backgroundColor = 'aqua'
    white.style.backgroundColor = 'orangered'
    percent.style.backgroundColor = 'darkgrey'
    divi.style.backgroundColor = 'darkgrey'
    multi.style.backgroundColor = 'darkgrey'
    minus.style.backgroundColor = 'darkgrey'
    plus.style.backgroundColor = 'darkgrey'
    display.style.borderRight = '21px solid white'
    display.style.borderLeft = '21px solid white'
    display.style.borderTop = '21px solid white'
})

white.addEventListener('click', () => {
    black.disabled = false
    white.disabled = true
    white.textContent = 'Active'
    black.textContent = 'Dark Theme'
    white.style.backgroundColor = 'aqua'
    black.style.backgroundColor = 'orangered'
    body.style.backgroundColor = 'white'
    calc.style.backgroundColor = 'black'
    text.style.color = 'black'
    percent.style.backgroundColor = 'whitesmoke'
    divi.style.backgroundColor = 'whitesmoke'
    multi.style.backgroundColor = 'whitesmoke'
    minus.style.backgroundColor = 'whitesmoke'
    plus.style.backgroundColor = 'whitesmoke'
    display.style.borderRight = '21px solid black'
    display.style.borderLeft = '21px solid black'
    display.style.borderTop = '21px solid black'
    
})


