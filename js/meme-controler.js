'use strict'

var gCanvas;
var gCtx;
var gFirsTime = true
var gCurrImg = ''

function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
}

function drawImg(image) {
    var img = new Image()
    img.src = image.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        if (!gFirsTime) {
            drawText();
        } else {
            gFirsTime = false
        }
    }
}

function onSaveText() {
    var text = document.querySelector('.memeTxt').value
    createMeme(text)
    drawImg(getImg(gCurrImg.id))
}

function drawText() {
    var meme = loadFromStorage('meme')
    var memeText = meme.lines
    gCtx.fillStyle = `${memeText.color}`
    gCtx.font = `${memeText.size}px Ariel`
    gCtx.textAlign = `${memeText.align}`
    gCtx.fillText(memeText.txt, 10, 10)
}

function imageClicked(Image) {
    var gallery = document.querySelector('.images')
    //gallery.style.display = 'none'
gallery.classList.toggle('hide');


    var canvas = document.querySelector('.canvas-container')
    canvas.classList.toggle('hide');

    var meme = loadFromStorage('meme')
    gCurrImg = Image

    if (!meme) {
        drawImg(getImg(Image.id))
    } else {
        drawImg(getImg(Image.id))
    }
}

function goToHomePage() {
    var gallery = document.querySelector('.images')
    //gallery.style.display = 'none'
    gallery.classList.toggle('hide');

    var canvas = document.querySelector('.canvas-container')
    canvas.classList.toggle('hide');
}