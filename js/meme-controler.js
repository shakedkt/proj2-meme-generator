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
    var memeText = meme.lines[meme.selectedLineIdx]
    gCtx.fillStyle = `${memeText.color}`
    gCtx.font = `${memeText.size}px Ariel`
    gCtx.textAlign = `${memeText.align}`
    gCtx.fillText(memeText.txt, getCurrLine().x, getCurrLine().y)
}

function imageClicked(Image) {
    var gallery = document.querySelector('.images')
    gallery.classList.toggle('hide');

    var canvas = document.querySelector('.canvas-container')
    canvas.classList.toggle('hide');

    var meme = getMeme()
    meme.selectedImgId = Image.id

    drawImg(getImg(Image.id))
}

function goToHomePage() {
    var gallery = document.querySelector('.images')
    //gallery.style.display = 'none'
    gallery.classList.toggle('hide');

    var canvas = document.querySelector('.canvas-container')
    canvas.classList.toggle('hide');
}

function changeFont(direction) {
    var meme = getMeme()
    var currLine = meme.lines[meme.selectedLineIdx]

    if (direction === 'increase') currLine.size += 10
    else currLine.size -= 10

    drawImg(getImg(meme.selectedImgId))
}

function upOrDown() {
    var meme = getMeme()

    getCurrLine().y += 10

    drawImg(getImg(meme.selectedImgId))
}