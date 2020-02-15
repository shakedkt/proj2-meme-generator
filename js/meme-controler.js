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
        gCtx.font = `${line.size}px impact`
        gCtx.strokeStyle = 'black';
        gCtx.strokeText(line.txt, line.x, line.y)
        gCtx.fillStyle = `${line.color}`
        gCtx.textAlign = `${line.align}`
        gCtx.fillText(line.txt, line.x, line.y)
    });
}

function imageClicked(Image) {
    var gallery = document.querySelector('.images')
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
    var gallery = document.querySelector('.images')
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
    var images = document.querySelector('.images')
    if (!images.className.includes('hide')) {
        images.classList.add('hide');
    }
var savedSection = document.querySelector('.saved-section')
    if(savedSection.className.includes('hide')) {
        savedSection.classList.toggle('hide')
    }
    renderSavedMemes()
}

function changeColor() {
    var textColor = document.querySelector('.btn-invisible').value
    var meme = getMeme()
    getCurrLine().color = textColor
    drawImg(getImg(meme.selectedImgId))
}

function openColorPicker() {
    document.querySelector('span.opener')
        .addEventListener('click',
            e => document.querySelector('.btn-invisible').click()
        );
}

function openDownLoad() {
    document.querySelector('.download').click()
}

function downloadCanvas(elLink) {
    var data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'jpg'
}


function openHamburger() {
    var leftSide = document.querySelector('.left-side')
    leftSide.classList.toggle('flex');
    document.body.classList.toggle('menu-open');
    document.body.addEventListener("click", closeMenu, {capture: true});
}

function closeMenu() {
    var leftSide = document.querySelector('.left-side')
    if (document.body.className.includes('menu-open')) {
        leftSide.classList.toggle('hide');
        document.body.removeEventListener("click", closeMenu);
    }
}


function renderSavedMemes() {
var strHtml = ''
var memeCount = 0

var memeList = loadFromStorage('meme-0')


/*
<img class="images-wrapper" src="meme-imgs (square)/1.jpg" alt="" id="1" onclick="imageClicked(this)">
*/

var savedContiner = document.querySelector('.saved-section')
savedContiner.innerHTML = strHtml
}