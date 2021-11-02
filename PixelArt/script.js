const mainGrid = document.querySelector('.main-grid');
const colorGrid = document.querySelector('.color-grid');
const button = document.querySelector('button');
const colorBoxAll = document.querySelectorAll('.colorBox');
let FILL_COLOR = 'transparent';
let CURRENT_COLOR = 'transparent';

function RandomColor(){
    return '#' + Math.floor(Math.random()*16777215).toString(16)
}

function AddColors() {
    colorBoxAll.forEach(box => {
        box.style.backgroundColor = RandomColor();
    })
}

AddColors()

button.addEventListener('click', AddColors);

colorGrid.addEventListener('click', e => {
    if(!e.target.matches('.colorBox')) return

    const targetBox = e.target;
    FILL_COLOR = targetBox.style.backgroundColor;
})

mainGrid.addEventListener('mousedown', e => {
    CURRENT_COLOR = FILL_COLOR;
    if(!e.target.matches('.pixelBox')) return

    const targetBox = e.target;
    targetBox.style.backgroundColor = CURRENT_COLOR;
})

mainGrid.addEventListener('mousemove', e => {
    if(!e.target.matches('.pixelBox')) return

    const targetBox = e.target;
    targetBox.style.backgroundColor = CURRENT_COLOR;
})

mainGrid.addEventListener('mouseup', e => {
    CURRENT_COLOR = 'transaprent'
})



