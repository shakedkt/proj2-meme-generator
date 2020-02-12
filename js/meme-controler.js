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
debugger
var memeText = meme.lines
    //gCtx.lineWidth = 
    //gCtx.strokeStyle = 'red'
    gCtx.fillStyle = `${memeText.color}`
   gCtx.font = `${memeText.size}px Ariel`
    gCtx.textAlign = `${memeText.align}`
   gCtx.fillText(memeText.txt, 200, 300)
}

function saveAndRestoreExample() {
   drawText('befor save', 100, 60)
   gCtx.save()
   // drawText('after save', 100, 160)
   drawText('after save and change', 20, 260)
   gCtx.restore()
   drawText('after restore', 100, 360)
}

function clearCanvas() {
   gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
   // You may clear part of the canvas
   // gCtx.clearRect(50, 50, 200, 200)
}