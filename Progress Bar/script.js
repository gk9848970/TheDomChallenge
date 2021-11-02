const loadingSpan = document.querySelector('.loading-bar > span')
const button = document.querySelector('button')
const countSpan = document.querySelector('.animation-count')

let numberOfAnimations = 0

button.addEventListener('click', () => {
    numberOfAnimations++
    UpdateCount()
    if (numberOfAnimations === 1) {
        AnimateOnce()
    }
})

function AnimateOnce() {
    // Animate().finshed is a promise which resolves on completion of the animations inside animate()
    loadingSpan.animate([
        { width: '100%' }
    ], 
    {
        duration: 2000,
        iterations: `1`
        
    }).finished.then(() => {
        numberOfAnimations--
        UpdateCount()
        if(numberOfAnimations) {
            AnimateOnce()
        }
    })
}

function UpdateCount() {
    countSpan.innerText = numberOfAnimations
}