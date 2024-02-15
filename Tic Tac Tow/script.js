const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winingPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer="x";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents="all";
        boxes[index].classList.remove("win");
        boxes[index].classList.remove("tie");
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText=`current Player - ${currentPlayer}`;
}
initGame();

function swapturn(){
    if (currentPlayer === "x"){
        currentPlayer = "o";
    }
    else{
        currentPlayer="x";
    }
    gameInfo.innerText=`Current Player -${currentPlayer}`;

}

function checkGameOver(){
    let answer = "";
    winingPosition.forEach((position) =>{
        if(gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="" 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] ===gameGrid[position[2]]) ){
           
            if(gameGrid[position[0]]=== "x"){
                answer ="x";
            }
            else{
                answer ="o";
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })


            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
            gameInfo.innerText= `winner Player - ${answer}`;
        }
        if(answer!==""){
            newGameBtn.classList.add("active");
            return;
        }
    })

    let count= 0;
    gameGrid.forEach((index)=>{
        if(index !== ""){
            count += 1; 
        }
        
        if(count === 9){
            gameInfo.innerText="Game Tied !";
            newGameBtn.classList.add("active");
            boxes.forEach((box)=>{
                box.classList.add("tie");
            })
           
        }
    })
}

function handleClick(index){
    if(gameGrid[index]===""){
      boxes[index].innerText = currentPlayer;  
      gameGrid[index] = currentPlayer;
      boxes[index].style.pointerEvents="none";
      swapturn();

      checkGameOver();
     


    }
   
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",() => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click",initGame);
