'use strict'

var gCanvas;
var gCtx;
var memeImageCounter = 18


function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    renderImages()
}

function renderImages() {
    var images = getImgs()
    var strHtml = ''
    for (var i = 1; i <= images.length; i++) {
        strHtml += `<img class="images-wrapper" src="meme-imgs (square)/${i}.jpg" alt="" id="${i}" onclick="imageClicked(this)">`
    }
    var imageContiner = document.querySelector('.images-continer')
    imageContiner.innerHTML = strHtml
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
        gCtx.font = `${line.size}px impact`
        gCtx.strokeStyle = 'black';
        gCtx.textAlign = `${line.align}`
        gCtx.strokeText(line.txt, line.x, line.y)
        gCtx.fillStyle = `${line.color}`
        gCtx.fillText(line.txt, line.x, line.y)
        
    });

}

function imageClicked(Image) {
    var gallery = document.querySelector('.images-continer')
    if (!gallery.className.includes('hide')) {
        gallery.classList.toggle('hide');
    }
    var canvas = document.querySelector('.canvas-container')
    if (canvas.className.includes('hide')) {
        canvas.classList.toggle('hide');
    }
    var aboutMe = document.querySelector('.about-me')
    if (!aboutMe.className.includes('hide')) {
        aboutMe.classList.toggle('hide')
    }
    var meme = getMeme()
    meme.selectedImgId = Image.id

    drawImg(getImg(Image.id))

    var textBox = document.querySelector('.memeTxt')
    textBox.value = ''
}

function onHomePage() {
    var gallery = document.querySelector('.images-continer')
    if (gallery.className.includes('hide')) {
        gallery.classList.toggle('hide');

        var aboutMe = document.querySelector('.about-me')
        aboutMe.classList.toggle('hide')

        var canvas = document.querySelector('.canvas-container')
        canvas.classList.add('hide');

        var savedMemes = document.querySelector('.saved-section')
        savedMemes.classList.add('hide')
        resetMeme()
    }
    document.querySelector('.memeTxt').input = ''
}

function changeFontSize(direction) {
    var meme = getMeme()
    var currLine = meme.lines[meme.selectedLineIdx]
    if (direction === 'increase') currLine.size += 10
    else if (currLine.size > 10) {
        currLine.size -= 10
    }
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

function onAbout() {
    window.location.replace('#social');
}

function onSaveMeme() {
    saveMeme()
    openModal()
}

function openModal() {
    var modal = document.querySelector('.modal')
    modal.classList.toggle('hide');

    setTimeout(function () {
        modal.classList.toggle('hide');
    }, 3000);
}

function onSaveSection() {
    var canvas = document.querySelector('.canvas-container')
    if (!canvas.className.includes('hide')) {
        canvas.classList.add('hide')
    }
    var images = document.querySelector('.images-continer')
    if (!images.className.includes('hide')) {
        images.classList.add('hide');
    }
    var savedSection = document.querySelector('.saved-section')
    if (savedSection.className.includes('hide')) {
        savedSection.classList.toggle('hide')
    }
    renderSavedMemes()
}

function changeColor(elLabel) {
    console.log(elLabel);
    
    var textColor = document.querySelector('.btn-invisible').value
    console.log(textColor);
    
    var meme = getMeme()
    getCurrLine().color = textColor
    drawImg(getImg(meme.selectedImgId))
}

function openDownLoad() {
    document.querySelector('.download').click()
}

function downloadCanvas(elLink) {
    var data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'jpg'
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onImgInput(ev) {

    loadImageFromInput(ev, renderCanvas)
}
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function leftAlign() {
    var meme = getMeme()
    getCurrLine().align = 'left'
    drawImg(getImg(meme.selectedImgId))
}

function centerAlign() {
    var meme = getMeme()
    getCurrLine().align = 'center'
    drawImg(getImg(meme.selectedImgId))
}

function rightAlign() {
    var meme = getMeme()
    getCurrLine().align = 'right'
    drawImg(getImg(meme.selectedImgId))
}

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.rect(x, y, 150, 150)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
    gCtx.fillStyle = 'orange'
    gCtx.fillRect(x, y, 150, 150)
}


function renderSavedMemes() {
    var strHtml = ''
    var memeCount = 0

    var savedContiner = document.querySelector('.saved-section')
    savedContiner.innerHTML = strHtml
}