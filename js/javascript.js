
//GamePlay

var gamePlay = (function(){

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

    function handleClick(e)  {
        'use strict';
        const box = e.target
        const currentClass = displayController.circleTurn ? displayController.O_CLASS : displayController.X_CLASS;
        placeMark(box, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isdraw()){
             endGame(true)
        } else {
            swapTurns();
            setBoardHover();    
        }
    }

    function startGame(){
        gamePlay.circleTurn=false;
        displayController.selectBox().forEach(box => {
            box.classList.remove(displayController.X_CLASS);
            box.classList.remove(displayController.O_CLASS);
            box.removeEventListener('click', handleClick)
            box.addEventListener('click', handleClick, {once: true})
        })
        setBoardHover();
        displayController.winningMessageElement().classList.remove('show');
    }

    function isdraw() {
        return [...displayController.selectBox()].every(box => {
            return box.classList.contains(displayController.X_CLASS) || 
                    box.classList.contains(displayController.O_CLASS);
        })
    }

    function endGame(draw){
        if (draw) {
           displayController.winningMessage().innerText = 'Draw !'
        } else {
           displayController.winningMessage().innerText = `${displayController.circleTurn ? "Os ": "Xs "}WIN!!!`; 
        }
        displayController.winningMessageElement().classList.add('show');
    }

   function placeMark(box, currentClass) {
        box.classList.add(currentClass);
    }

    function swapTurns() {
        displayController.circleTurn=!displayController.circleTurn;
    }

    function setBoardHover() {
        displayController.board().classList.remove(displayController.X_CLASS);
        displayController.board().classList.remove(displayController.O_CLASS);
        if(displayController.circleTurn) {
            displayController.board().classList.add(displayController.O_CLASS);
        } else {
            displayController.board().classList.add(displayController.X_CLASS);
        }   
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return displayController.selectBox()[index].classList.contains(currentClass);
            })
        })
    }
    return {
        startGame,
    }

})();

//displayController

var displayController = (function() {
    
    const X_CLASS= 'x';
    const O_CLASS = 'o';
    let circleTurn;

    const selectBox = document.querySelectorAll('[data-box]');
    const board = document.getElementById('board');
    const winningMessage = document.querySelector('[data-winning-message-text]');
    const winningMessageElement = document.getElementById('winningMessage');
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', gamePlay.startGame);

    return {
        selectBox:function() {return selectBox},
        board:function() {return board},
        winningMessage:function() {return winningMessage},
        winningMessageElement:function() {return winningMessageElement},
        X_CLASS,
        O_CLASS,
        circleTurn
    }
})();

gamePlay.startGame();











