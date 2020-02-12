'use strict'

var gID = 1
var gImgs = createImages()


//var gMemes = createMeme(text)

function makeMeme(text) {
    createMeme(text)
}

function createMeme(text) {
    debugger
    var meme = {
        selectedImgId: gImgs.id,
        selectedLineIdx: 0,
        lines: { txt: text, size: 20, align: 'left', color: 'red' }
    }
    saveToStorage('meme', meme)
    return meme
}

function createImages() {
    var images = []
    while (images.length <= 18) {
        images.push(createImage())
    }
    return images
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getImg(id) {
    return gImgs.find(image => image.id === parseInt(id))
}

function createImage() {
    var image = {
        id: gID,
        url: `meme-imgs (square)/${gID++}.jpg`,
        keywords: ['president']
    }
    return image
}

