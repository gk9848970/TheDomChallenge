const chessBoard = document.querySelector('.chess-board')
const CHESS_SIZE = 8;

// Getting squares in Grid From
const squaresAll = Array.from(document.querySelectorAll('.chess-square'))
let SQUARE_GRID = [], counter = 0;

for(let i = 0; i < CHESS_SIZE; i++) {
    let arr = []
    for(let j = 0; j < CHESS_SIZE; j++) {
        arr.push(squaresAll[counter])
        counter++
    }
    SQUARE_GRID.push(arr)
}

// Click Functionality
chessBoard.addEventListener('click', (e)=> {
    if(!e.target.matches('.chess-square')) return
    const square = e.target
    const row = parseInt(square.dataset.row)
    const col = parseInt(square.dataset.col)
    ClearSquares()
    ColorSquares(row, col)
})

// Clearing Color when clicked outside Chess Board
document.body.addEventListener('click', (e) => {
    if(e.target.closest('.chess-board')) return
    ClearSquares()
})

// Coloring Right Squares
function ColorSquares(row, col) {
    // Top Left
    let i = row, j = col;
    while(i >= 0 && j >= 0) {
        AddClass(SQUARE_GRID[i][j], 'red')
        i--;
        j--;
    }

    // Top right
    i = row, j = col;
    while(i >= 0 && j < CHESS_SIZE) {
        AddClass(SQUARE_GRID[i][j], 'red')
        i--;
        j++;
    }

    // Bottom Right
    i = row, j = col;
    while(i < CHESS_SIZE && j < CHESS_SIZE) {
        AddClass(SQUARE_GRID[i][j], 'red')
        i++;
        j++;
    }

    // Bottom Left
    i = row, j = col;
    while(i < CHESS_SIZE && j >= 0) {
        AddClass(SQUARE_GRID[i][j], 'red')
        i++;
        j--;
    }
}

// Clearing Squares
function ClearSquares() {
    squaresAll.forEach(sqr => RemoveClass(sqr, 'red'))
}

function AddClass(element, className) {
    element.classList.add(className)
}

function RemoveClass(element, className) {
    element.classList.remove(className)
}