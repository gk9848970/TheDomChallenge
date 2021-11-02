let board = document.querySelector('.board')
let currentScoreSpan = document.querySelector('.your-score')
let highestScoreSpan = document.querySelector('.highest-score')
let GRIDSIZE = 4
let LOCAL_STORAGE_PREFIX = 'COLOR-SPOTTER'
let SCORE_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-HighestScore`
let CURRENT_SCORE = 0
let HIGHEST_SCORE = LoadHighestScore() || 0
let oddBoxIndex;
let squares;
let COLOR;

SetUPGrid()
UpdateSpanScore(highestScoreSpan, HIGHEST_SCORE)

board.addEventListener('click', e => {
    if(!e.target.matches('.square')) return

    let targetBox = e.target
    if(targetBox === squares[oddBoxIndex]) {
        GRIDSIZE++
        CleanBoard()
        SetUPGrid()
        CURRENT_SCORE++
        if(CURRENT_SCORE > HIGHEST_SCORE) {
            HIGHEST_SCORE = CURRENT_SCORE
            SaveHighestScore()
            UpdateSpanScore(highestScoreSpan, HIGHEST_SCORE)
        }
        UpdateSpanScore(currentScoreSpan, CURRENT_SCORE)
    }
    else {
        GRIDSIZE = 4
        CURRENT_SCORE = 0
        ShakeBoard()
        CleanBoard()
        SetUPGrid()
        UpdateSpanScore(currentScoreSpan, CURRENT_SCORE)
    }
})

// Functions

function SetUPGrid() {
    squares = MakeSquaresArray(GRIDSIZE)
    COLOR = RandomColor()
    ColorSquares(squares, GRIDSIZE)
    SetBoardDisplay(GRIDSIZE)
    squares.forEach(sqr => AddSquareToElement(board, sqr))
}

function CleanBoard() {
    while (board.lastChild) {
        board.removeChild(board.lastChild);
    }
}

function ShakeBoard() {
    board.animate([
        { transform: "translateX(3px)" },
        { transform: "translateX(-3px)"},
        { transform: "translateX(0px)" }
      ],
      {
        duration: 120,
        iterations: 6,
        easing: "linear"
      });
}

function UpdateSpanScore(span, score) {
    span.innerText = score.toString()
}

// Functions Handling Local Storing of Highest Score

function SaveHighestScore() {
    localStorage.setItem(SCORE_STORAGE_KEY, HIGHEST_SCORE.toString())
}

function LoadHighestScore() {
    const highestScoreString = localStorage.getItem(SCORE_STORAGE_KEY)
    return parseInt(highestScoreString)
}

function RandomColor(){
    return '#' + Math.floor(Math.random()*16777215).toString(16)
}

function RandomIndexInGrid(gridSize){
    return Math.floor(Math.random() * (gridSize * gridSize));
}

function MakeSquaresArray(gridSize) { 
    let arr = []
    for (let i = 0; i < gridSize; i++) {
        for (let i = 0; i < gridSize; i++) {
            let square = document.createElement('div')
            square.classList.add('square')
            arr.push(square)
        }
    }
    return arr
}

function ColorSquares(sqrArray, gridSize) {
    oddBoxIndex = RandomIndexInGrid(gridSize)
    for (let i = 0; i < sqrArray.length; i++) {
        sqrArray[i].style.backgroundColor = `${COLOR}`
        if(i === oddBoxIndex) {
            sqrArray[i].style.opacity = '.7'
        }
    }
}

function AddSquareToElement(element, square) {
    element.appendChild(square)
}

function SetBoardDisplay(gridSize) {
    board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}







