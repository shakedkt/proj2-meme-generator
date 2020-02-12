'use strict'

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    drawImg(getImg(2))
}

function drawImg(proj) {
    var img = new Image()
    img.src = proj.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function onSaveText() {
    var text = document.querySelector('.memeTxt').value
    makeMeme(text)
    drawText()
}

function drawText() {
var meme = loadFromStorage('meme')
var memeText = meme.lines
    //gCtx.lineWidth = 
    //gCtx.strokeStyle = 'red'
    gCtx.fillStyle = `${memeText.color}`
   gCtx.font = `${memeText.size}px Ariel`
    gCtx.textAlign = `${memeText.align}`
   gCtx.fillText(memeText.txt, 10, 10)
}

function clearCanvas() {
   gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
   gCanvas = document.getElementById('my-canvas')
   gCtx = gCanvas.getContext('2d')
   drawImg(getImg(2))
}