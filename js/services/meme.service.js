'use strict'
const STORAGE_KEY = 'memeDB'

let gSavedMemes = loadFromStorage(STORAGE_KEY) || []
let gMeme = {
    id: null,
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Meme Text Here',
            size: 40,
            color: 'white',
            align: 'center',
            font: 'Impact',
            x: 200,
            y: 50
        }
    ]
}

var gImgs

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function getSavedMemes() {
    return gSavedMemes
}

function addMeme(data) {
    const memeToSave = {
        id: makeId(),
        data, 
        selectedImgId: gMeme.selectedImgId,
        selectedLineIdx: gMeme.selectedLineIdx,
        lines: gMeme.lines.map(line => ({ ...line })) 
    }
    gSavedMemes.unshift(memeToSave)
    _saveMemesToStorage()
    return memeToSave
}

function removeMeme(memeId) {
    const memeIdx = gSavedMemes.findIndex(meme => meme.id === memeId)
    gSavedMemes.splice(memeIdx, 1)
    _saveMemesToStorage()
}

function getMemeById(memeIdx) {
    return gImgs.find(meme => meme.id === memeIdx)
}


function _createMemeImgs(count) {
    const memes = []
    for (var i = 0; i < count; i++) {
        memes[i] = _createMemeImg(i + 1)
    }
    // console.log('memes:', memes)
    return memes
}

function getMemeImgs() {
    return gImgs = _createMemeImgs(25)
}

function _createMemeImg(id = 1) {
    const meme = { id, url: `memes-imgs/${id}.jpg`, keywords: getKeyWords() }
    return meme
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}