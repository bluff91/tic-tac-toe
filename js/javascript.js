const X_CLASS= 'x';
const O_CLASS = 'o';
let circleTurn;
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const selectBox = document.querySelectorAll('[data-box]');
const board = document.getElementById('board');
const winningMessage = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartBtn = document.getElementById('restartBtn');

startGame();

restartBtn.addEventListener('click', startGame);

function startGame(){
    circleTurn=false;
    selectBox.forEach(box => {
        box.classList.remove(X_CLASS);
        box.classList.remove(O_CLASS);
        box.removeEventListener('click', handleClick)
        box.addEventListener('click', handleClick, {once: true})
    })
    setBoardHover();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    console.log('clicked');
    const box = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(box, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns();
        setBoardHover();    
    }
}

function isDraw() {
    return [...selectBox].every(box => {
        return box.classList.contains(X_CLASS) || 
                box.classList.contains(O_CLASS);
    })
}

function endGame(draw){
     if (draw) {
        winningMessage.innerText = 'Draw !'
     } else {
        winningMessage.innerText = `${circleTurn ? "Os ": "Xs "}WIN!!!`; 
     }
     winningMessageElement.classList.add('show');
}

function placeMark(box, currentClass) {
    box.classList.add(currentClass);
}

function swapTurns() {
    circleTurn=!circleTurn;
}

function setBoardHover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(circleTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return selectBox[index].classList.contains(currentClass);
        })
    })
}