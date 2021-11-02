const boxes = document.querySelectorAll('.box')
const button = document.querySelector('button')
const boxContainer = document.querySelector('.box-container')

//  Score Calculation
const highScoreSpan = document.querySelector('.high-score')
const currentScoreSpan = document.querySelector('.player-score')

const NUMBER_OF_BOX = 5
const BLINK_DURATION = 300
let GAME_LEVEL = 1

//  Score Calculation
let LOCAL_STORAGE_PREFIX = 'MEMORY_GAME'
let SCORE_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-HighestScore`
let CURRENT_SCORE = 0
let HIGHEST_SCORE = LoadHighestScore() || 0

let sequenceBoxArray = []
let clickIndex = 0
let NEUTRAL_BLINK_COLOR = "blue"
let CORRECT_BLINK_COLOR = "green"
let INCORRECT_BLINK_COLOR = "red"

//  Score Calculation
UpdateSpanScore(highScoreSpan, HIGHEST_SCORE)
UpdateSpanScore(currentScoreSpan, CURRENT_SCORE)

button.addEventListener('click', () => {
    let sequenceIndexArray = RandomIndexArray(GAME_LEVEL)
    sequenceBoxArray = GetSequenceArrayFromIndex(sequenceIndexArray)
    BlinkBoxesInSequence(sequenceBoxArray)
    ButonDisabled(true)
})

boxContainer.addEventListener('click', (e) => {
    if(!e.target.matches('.box')) return

    const targetBox = e.target
    if(CheckNthClick(clickIndex, targetBox)) {
        IncrementClickIndex()
        BlinkBox(targetBox, CORRECT_BLINK_COLOR)
    }

    else {
        ResetGame()
        BlinkBox(targetBox, INCORRECT_BLINK_COLOR)
        ShakeElement(boxContainer)
    }

    if(clickIndex == GAME_LEVEL) {
        NextLevel()
    }
})

function ResetGame() {
    clickIndex = 0
    GAME_LEVEL = 1
    CURRENT_SCORE = 0
    UpdateSpanScore(currentScoreSpan, CURRENT_SCORE)
    ButonDisabled(false)
}

function NextLevel() {
    console.log("You won");
    clickIndex = 0
    CURRENT_SCORE++
    UpdateSpanScore(currentScoreSpan, CURRENT_SCORE)
    if(CURRENT_SCORE > HIGHEST_SCORE) {
        HIGHEST_SCORE = CURRENT_SCORE
        SaveHighestScore()
        UpdateSpanScore(highScoreSpan, HIGHEST_SCORE)
    }
    IncrementGameLevel()
    ButonDisabled(false)
}

function ButonDisabled(bool) {
    button.disabled = bool
}

//  Score Calculation
function UpdateSpanScore(span, score) {
    span.innerText = score.toString()
}

function SaveHighestScore() {
    localStorage.setItem(SCORE_STORAGE_KEY, HIGHEST_SCORE.toString())
}

function LoadHighestScore() {
    const highestScoreString = localStorage.getItem(SCORE_STORAGE_KEY)
    return parseInt(highestScoreString)
}

function BlinkBoxesInSequence(boxArray) {
    for (let i = 0; i < boxArray.length; i++) {
        let box = boxArray[i]
        setTimeout(() => BlinkBox(box, NEUTRAL_BLINK_COLOR), i*BLINK_DURATION)
    }
}

function BlinkBox(box, color) {
    box.animate([
        { 
            backgroundColor: `${color}` 
        }], 
        {
            duration: BLINK_DURATION,
            iterations: 1,
            easing: "ease-out"
    })
}

function ShakeElement(element) {
    element.animate([
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

function RandomIndexArray(GAME_LEVEL) {
    let arr = []
    for(let i=0; i<GAME_LEVEL; i++) {
        arr.push(RandomIndex())
    }
    return arr
}

function RandomIndex() {
    return Math.floor(Math.random() * NUMBER_OF_BOX);
}

function GetSequenceArrayFromIndex(sequenceIndexArray) {
    let arr = [];
    sequenceIndexArray.forEach(ind => {
        let box = GetBoxByIndex(ind)
        arr.push(box)
    })
    return arr
}

function GetBoxByIndex(n) {
    return boxes[n]
}

function IncrementClickIndex() {
    return clickIndex++
}

function IncrementGameLevel() {
    return GAME_LEVEL++
}

function CheckNthClick(clickNumber, targetBox) {
    let boxToCheck = sequenceBoxArray[clickNumber]
    return boxToCheck === targetBox
}