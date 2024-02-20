const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const wrapper = document.querySelector(".wrapper");

let currentPlayer;
let gameGrid;
let filledBoxesCount;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


//function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    filledBoxesCount=0;

    //Grid initially empty and also on UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with default css properties again
        //since we need to remove green
        box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    wrapper.classList.remove("O");
    wrapper.classList.remove("X");
}

initGame();

boxes.forEach((box,index) =>{
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";

        filledBoxesCount++;
        console.log(filledBoxesCount);

        //swap turn
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
        wrapper.classList.add("O");
        wrapper.classList.remove("X");

    } else {
        currentPlayer = "X";
        wrapper.classList.add("X");
        wrapper.classList.remove("O");

    }
    //ui update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let winner = "";
    winningPositions.forEach((positions) => {
        //all three positions should be non empty and exactly same in value
        if( (gameGrid[positions[0]]!="" || gameGrid[positions[1]]!="" || gameGrid[positions[2]]!="")
         && (gameGrid[positions[0]]===gameGrid[positions[1]]) && (gameGrid[positions[0]]===gameGrid[positions[2]])) {
        
            //now we got the winner
            winner = gameGrid[positions[0]];

            //disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            //new we know x/O is winner
            //putting green on the boxes
            boxes[positions[0]].classList.add("win");
            boxes[positions[1]].classList.add("win");
            boxes[positions[2]].classList.add("win");

            gameInfo.innerText= `Winner Player - ${winner}`;
            newGameBtn.classList.add("active");
     
        }
    }); 


    //check whether there is tie
    if(filledBoxesCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
};




//new Game button
newGameBtn.addEventListener("click", initGame);