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
    makeMeme(text)
    drawImg(getImg(2))
}

function drawText() {
    var meme = loadFromStorage('meme')
    var memeText = meme.lines
    gCtx.fillStyle = `${memeText.color}`
    gCtx.font = `${memeText.size}px Ariel`
    gCtx.textAlign = `${memeText.align}`
    gCtx.fillText(memeText.txt, 10, 10)
}

function draw() {
    drawImg(proj)
}

function imageClicked (Image) {
var gallery = document.querySelector('.images')
gallery.style.display = 'none'
var meme = loadFromStorage('meme')

if (!meme) {
drawImg(getImg(Image.id))

//} else if (image.id === meme.) {

//}
}
}