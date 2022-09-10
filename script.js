// Selected
const btnStart=document.querySelector(".start")
const restart=document.querySelector(".restart")
const stoped=document.querySelector(".stop")
const gameContainer=document.querySelector(".game-container")
const playerContent=document.querySelector(".player")
const result_content=document.querySelector(".result_content")
const result_of_game=document.querySelector(".result_of_game")
const cells=document.querySelectorAll(".cell")
let board=["","","","","","","","",""]
let currentPlayer="X"
let isActiveGame=true
const winingConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
]

// AddEventListeners
btnStart.addEventListener("click",()=>startGame())
restart.addEventListener("click",()=>restartGame())
stoped.addEventListener("click",()=>stopGame())
cells.forEach((cell,index)=>cell.addEventListener("click",()=>handleGameStart(cell,index)))

const startGame=()=>{
    btnStart.style.display="none"
    gameContainer.style.display="flex"
}
const restartGame=()=>{
    gameContainer.style.display="flex"
    result_of_game.style.display="none"
    clear()
}
const stopGame=()=>{
    btnStart.style.display="flex"
    result_of_game.style.display="none"
    clear()
}
const result=()=>{
    result_of_game.style.display="flex"
    gameContainer.style.display="none"
}

const handleGameStart=(currentcell,currentCellİndex)=>{
    if(isvalidationCell(currentcell) && isActiveGame){
        currentcell.innerText=currentPlayer
        console.log(currentPlayer)
        currentcell.classList.add(`player${currentPlayer}`)
        cellToBoard(currentcell,currentCellİndex)
        changePlayer(currentcell)
        handleConditionCell()
    }
}
const isvalidationCell=(cell)=>{
    if(cell.innerText==="X" || cell.innerText==="O"){
        return false
    }
    return true
}

const changePlayer=(currentcell)=>{
    currentcell.classList.remove(`player${currentPlayer}`)
    playerContent.innerText=`${currentPlayer} now it's your turn`
    currentcell.innerText=currentPlayer
    currentPlayer=currentPlayer==="X" ? "O" : "X"
    currentcell.innerText=currentPlayer
    currentcell.classList.add(`player${currentPlayer}`)
}
const cellToBoard=(cell,index)=>{
board[index]=cell.innerText
}

const handleConditionCell=()=>{
    let winning=false
    for(let i=0;i<=7;i++){
        let winingCondition=winingConditions[i]
        const a=board[winingCondition[0]]
        const b=board[winingCondition[1]]
        const c=board[winingCondition[2]]
        if(a==="" || b==="" ||c===""){
            continue;
        }
        if(a===b && b===c){
            winning=true
            break
        }
    }

    if(winning){
        result()
        result_content.innerHTML=`
        <div class="result">Congratulations ${currentPlayer}. You are a winner !</div>
        <i class="fa-solid fa-trophy"></i>
        `
        return
    }
    if(!board.includes("")){
        result()
        result_content.innerHTML=`
        <div class="result">Unfortunately, the game ended in a draw</div>
        <i class="fa-solid fa-face-frown-open"></i>
        `
    }
}

const clear=()=>{
    board=["","","","","","","","",""]
    playerContent.innerText=""
    result_content.innerText=""
    cells.forEach((cell)=>cell.innerText="") 
}