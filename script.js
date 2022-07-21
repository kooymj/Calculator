//used to make grid then copied to html
//const grid = document.getElementById('grid');
// function makeGrid(size){
//     grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
//     grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

//     for(let i = 0; i < size * size; i++){
//         const cell = document.createElement('div');
//         cell.classList.add('cell');
//         // cell.addEventListener('mouseover', changeColor);
//         // cell.addEventListener('mousedown', changeColor);
//         grid.appendChild(cell);
//     }
// }
// makeGrid(4);

//keys
const numberKeys = document.querySelectorAll('.key-number');
const operationKeys = document.querySelectorAll('.key-operator');
const periodKey = document.querySelector('.key-period');
const equalKey = document.querySelector('.key-equal');
const resultText = document.querySelector('#results-text');
const resultsEq = document.querySelector('#results-previewEq');

var prevTotal = 'x';
var inputedNum = '';
var finishedInput = false;
var currentOperator = '';
var currentTotal = '';

function operate(operator, a, b){
    //first time or after clear when prevTotal is not a number or doesnt exist;
    if(isNaN(prevTotal)){
        prevTotal = b;
        console.log(a);
        resultsEq.textContent = prevTotal + " " + operator;
        return;
    }
    if(operator === '='){
        if(currentOperator === '+'){
            resultsEq.textContent = prevTotal + " " + currentOperator + " " + b;
            resultText.textContent = Number(a) + Number(b);
            prevTotal = Number(a) + Number(b);
            inputedNum = '';
        }
        if(currentOperator === '-'){
            resultsEq.textContent = prevTotal + " " + currentOperator + " " + b;
            resultText.textContent = Number(a) - Number(b);
            prevTotal = Number(a) - Number(b);
            inputedNum = '';
        }
    }
    if(operator === '+'){
        
        resultText.textContent = '';
        prevTotal = Number(a) + Number(b);
        resultsEq.textContent = prevTotal + " " + currentOperator + " " + inputedNum;
        currentTotal = prevTotal;
        inputedNum = '';
    }
    if(operator === '-'){
        resultsEq.textContent = prevTotal + " " + currentOperator;
        resultText.textContent = '';
        prevTotal = Number(a) - Number(b);
        currentTotal = prevTotal;
        inputedNum = '';
    }
    
}

function clickEqual(e){
    operate(e.target.textContent, prevTotal, inputedNum);
}

function clickNumber(e){
    if(finishedInput === true){
        inputedNum = '';
        finishedInput = false;
    }

    inputedNum += e.target.textContent;
    resultText.textContent = inputedNum;
    console.log('inputedNum is ' + inputedNum);    
}

function clickOperator(e){
    finishedInput = true;
    currentOperator = e.target.textContent;
    resultText.textContent = '';
    operate(e.target.textContent, prevTotal, inputedNum);
}

function clickPeriod(e){
    
}



numberKeys.forEach(cell => cell.addEventListener('click', clickNumber));
operationKeys.forEach(cell => cell.addEventListener('click', clickOperator));
periodKey.addEventListener('click', clickPeriod);
equalKey.addEventListener('click', clickEqual);