'use strict'

var gImgs = createImages()
var gMeme = createMeme('');
var gMemeSavedCount = 0


function createMeme(text, size) {
    if (!size) size = 20
    var meme = {
        selectedImgId: 2,
        selectedLineIdx: 0,
        lines: [{ txt: text, size: size, align: 'left', color: 'white', x: 60, y: 50 },
        { txt: text, size: size, align: 'left', color: 'white', x: 60, y: 350 }
        ]
    }
    return meme
}

function setMemeText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function createImages() {
    var images = []
    for (var i = 0; i < 18; i++) {
        images.push(createImage(i))
    }
    return images
}

function getMeme() {
    return gMeme
}

function getImg(id) {
    return gImgs.find(image => image.id === parseInt(id))
}

function getImgs() {
    return gImgs
}

function createImage(id) {
    var image = {
        id,
        url: `meme-imgs (square)/${id}.jpg`,
        keywords: ['president']
    }
    return image
}

function getCurrLine() {
    var meme = getMeme()
    var currLine = meme.lines[meme.selectedLineIdx]
    return currLine
}

function resetMeme() {
    getCurrLine().txt = ''
}

function saveMeme() {
    saveToStorage(`meme-${gMemeSavedCount++}`, gMeme)
}
