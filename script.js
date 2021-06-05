const $gallery = document.querySelector('.gallery')
const $btnPrev = $gallery.querySelector('.gallery-prev')
const $btnNext = $gallery.querySelector('.gallery-next')
const $autoPlayBtn = document.querySelector('.gallery-autoplay')
const $photos = $gallery.querySelectorAll('.gallery-item')
const autoPlaySeconds = 4000
let currentIndex = 0

setTimeout(() => {
    $photos[currentIndex].classList.add('active')
}, 200)

const switchSlide = (current, next) => {
    $photos[current].classList.remove('active')
    setTimeout(() => $photos[next].classList.add('active'), 200)
    $dots[current].classList.remove('active')
    $dots[next].classList.add('active')

    currentIndex = next
}

const showNext = () => {
    let next = currentIndex + 1
    
    if (currentIndex >= $photos.length - 1) {
        next = 0
    }

    switchSlide(currentIndex, next)
}

const showPrev = () => {
    let next = currentIndex - 1
    
    if (currentIndex <= 0) {
        next = $photos.length - 1
    }

    switchSlide(currentIndex, next)
}

/*
    Dots
*/

const createDots = () => {
    let count = 1
    let dots = ''

    while (count <= $photos.length) {
        dots += `
            <li>
                <button ${count == 1 ? 'class="active"' : ''}>
                    ${count++}
                </button>
            </li>`
    }

    return dots
}

const insertDots = () => {
    const dots = document.createElement('ul')
    dots.classList.add('gallery-dots')
    dots.innerHTML = createDots()
    $gallery.append(dots)

    return $gallery.querySelector('.gallery-dots')
}

$dotsWrap = insertDots()
$dots = $dotsWrap.querySelectorAll('button')

$dotsWrap.addEventListener('click', (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
        return
    }

    if (isAutoPlay) {
        stopAutoPlay()
    }

    switchSlide(currentIndex, +evt.target.innerHTML - 1)
})

/*
    Auto Play
*/

let autoPlayInterval = null
let isAutoPlay = false

const initAutoPlay = (time) => {
    autoPlayInterval = setInterval(() => showNext(), time)
    $autoPlayBtn.classList.add('active')
}

const stopAutoPlay = () => {
    clearInterval(autoPlayInterval)
    isAutoPlay = false
    $autoPlayBtn.classList.remove('active')
}

$autoPlayBtn.addEventListener('click', () => {
    isAutoPlay = !isAutoPlay

    if (isAutoPlay) {
        initAutoPlay(autoPlaySeconds)
    } else {
        stopAutoPlay()
    }
})

const onBtnClick = (cb) => {
    if (isAutoPlay) {
        stopAutoPlay()
    }

    cb()
}

$btnPrev.addEventListener('click', () => {
    onBtnClick(showPrev)
})

$btnNext.addEventListener('click', () => {
    onBtnClick(showNext)
})
