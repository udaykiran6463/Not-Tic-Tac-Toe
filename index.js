var animateButton = function (e) {
    e.preventDefault;
    //reset animation
    // e.target.classList.remove("animate");

    e.target.classList.add("animate");
    setTimeout(function () {
        e.target.classList.remove("animate");
    }, 500);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener("click", animateButton, false);
}
// ----------------------------------------------
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const btn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

let winningPositions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6] //diagonals
];

// let's create a function to initialize the game
function init() {
    currPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    btn.classList.remove("active");
    gameInfo.innerHTML = `Player ${currPlayer}'s turn`;
    gameInfo.style.scale = "1";
    gameInfo.style.color = "white";
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    });
    
}

init();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function invertCurrPlayer(){
    if(currPlayer == 'X'){
        currPlayer = 'O';
    }
    else{
        currPlayer = 'X';
    }
}

function swapTurns(){
    if(currPlayer === 'X'){
        currPlayer = 'O';
        gameInfo.innerText = `Player ${currPlayer}'s turn`;
    }
    else{
        currPlayer = 'X';
        gameInfo.innerText = `Player ${currPlayer}'s turn`;
    }
}

function checkGameOver(index) {
    let answer = "";

    for (let i = 0; i < winningPositions.length; i++) {
        let flag = 1;
        for (let j = 0; j < winningPositions[i].length; j++) {
            if (gameGrid[winningPositions[i][j]] === "" || gameGrid[winningPositions[i][j]] !== boxes[index].innerText) {
                flag = 0;
                break;
            }
        }

        if (flag === 1) {
            answer = gameGrid[winningPositions[i][0]];
            for (let k = 0; k < winningPositions[i].length; k++) {
                boxes[winningPositions[i][k]].classList.add("win");
            }
            break;
        }

    }

    
    if(answer !== ""){
        gameInfo.style.scale = "2";
        gameInfo.style.color = "#ff0081"
        gameInfo.innerHTML = `winner Player - ${answer}`;
        btn.classList.add("active");
        boxes.forEach((box)=>{
            box.style.pointerEvents = "none";
        })
        return;
    }
    else{
        // could be a draw case
        let count = 0;
        for(let k=0; k<gameGrid.length; k++){
            if(gameGrid[k] === ""){
                return;
            }
        }
        btn.classList.add("active");
        gameInfo.innerText = `Match TIE`;
        gameInfo.style.scale = `2`;

    }
};



function delayClick() {
    setTimeout(function() {
        init(); 
    }, 550);
}
btn.addEventListener('click', delayClick);

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        

        // swap turens
        swapTurns();

        // check for the winer
        checkGameOver(index);
    }
}









