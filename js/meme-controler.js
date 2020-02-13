'use strict'

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
}

function drawImg(image) {
    var img = new Image()
    img.src = image.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText();
    }
}

function onSaveText() {
    var text = document.querySelector('.memeTxt').value
    var meme = getMeme()
    setMemeText(text)
    drawImg(getImg(meme.selectedImgId))
}

function drawText() {
    var meme = getMeme()

    meme.lines.forEach(line => {
        gCtx.fillStyle = `${line.color}`
        gCtx.font = `${line.size}px Ariel`
        gCtx.textAlign = `${line.align}`
        gCtx.fillText(line.txt, line.x, line.y)
    });
}

function imageClicked(Image) {
    var gallery = document.querySelector('.images')
    gallery.classList.toggle('hide');

    var canvas = document.querySelector('.canvas-container')
    canvas.classList.toggle('hide');

    var aboutMe = document.querySelector('.about-me')
    aboutMe.classList.toggle('hide')

    var meme = getMeme()
    meme.selectedImgId = Image.id

    drawImg(getImg(Image.id))
}

function goToHomePage() {
    var gallery = document.querySelector('.images')
    if (gallery.className.includes('hide')) {
        gallery.classList.toggle('hide');

        var aboutMe = document.querySelector('.about-me')
        aboutMe.classList.toggle('hide')

        var canvas = document.querySelector('.canvas-container')
        canvas.classList.toggle('hide');

        resetMeme()
    }
}

function changeFont(direction) {
    var meme = getMeme()
    var currLine = meme.lines[meme.selectedLineIdx]

    if (direction === 'increase') currLine.size += 10
    else currLine.size -= 10

    drawImg(getImg(meme.selectedImgId))
}

function upBtn() {
    var meme = getMeme()
    getCurrLine().y -= 10
    drawImg(getImg(meme.selectedImgId))
}

function downBtn() {
    var meme = getMeme()
    getCurrLine().y += 10
    drawImg(getImg(meme.selectedImgId))
}

function switchLine() {
    var meme = getMeme()
    if (meme.selectedLineIdx === 1) {
        meme.selectedLineIdx = 0
    } else {
        meme.selectedLineIdx = 1
    }
}

function onFocus(line) {
    if (getCurrLine().txt !== "") return
    else line.value = ''
}

function goToAbout() {
    window.location.replace('#social');

}

function onSaveMeme() {
    saveMeme()
    openModal()
}


function goToSaveSection() {

}