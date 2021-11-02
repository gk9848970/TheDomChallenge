const starsContainer = document.querySelector('#display-star');
const stars = document.querySelectorAll('#display-star i');
const starNumber = document.querySelector('.star-number');
let CurrentRatingStar = null;
let StarSelected = false;

starsContainer.addEventListener('mousemove', (e) => {
    if(!e.target.matches('.fa')) return
    const targetStar = e.target
    UnfillAll()
    FillUptoTargetStar(targetStar)
})

starsContainer.addEventListener('click', (e) => {
    if(!e.target.matches('.fa')) return
    CurrentRatingStar = e.target
    StarSelected = true
    AddStarNumber(CurrentRatingStar)
})

starsContainer.addEventListener('mouseleave', () => {
    UnfillAll()
    if(StarSelected) {
        FillUptoTargetStar(CurrentRatingStar)
    }
})

function FillUptoTargetStar(targetStar) {
    for(let i = 0; i < stars.length; i++) {
        FillSingle(stars[i])
        if(stars[i] == targetStar) break;
    }
}

function UnfillAll() {
    stars.forEach(UnfillSingle)
}

function FillSingle(star) {
    star.classList.remove('fa-star-o')
    star.classList.add('fa-star')
}

function UnfillSingle(star) {
    star.classList.remove('fa-star')
    star.classList.add('fa-star-o')
}

function AddStarNumber(currentStar) {
    for(let i = 0; i < stars.length; i++) {
        if(stars[i] == currentStar) {
            starNumber.innerHTML = "" + (i + 1)
            break
        }
    }
}
