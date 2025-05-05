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
            fill: 'black',
            align: 'center',
            font: 'Impact',
            x: 200,
            y: 50
        }
    ]
}

let gImgs = _createMemeImgs(25)


//Crudl functions

function getMeme() {
    return gMeme
}

function getSavedMemes() {
    return gSavedMemes
}

function getMemeImgs() {
    return gImgs
}

function setFilterBy(txt) {
    const lowerSearch = txt.toLowerCase()
    var filteredImgs = gImgs.filter(img => {
        return img.keywords.some(keyword => keyword.toLowerCase().includes(lowerSearch))
    })
    return filteredImgs
}

function updateKeywordSearchMap(searchHistory) {
    return searchHistory.reduce((acc, keyword) => {
        const key = keyword.toLowerCase()
        acc[key] = (acc[key] || 0) + 1
        return acc
    }, {})
}

function getSavedMemeById(idx) {
    return gSavedMemes.find(meme => meme.id === idx)
}

function addMeme(meme) {
    const memeToSave = {
        id: makeId(),
        data: meme.data,
        selectedImgId: meme.selectedImgId,
        selectedLineIdx: meme.selectedLineIdx,
        lines: meme.lines.map(line => ({ ...line }))
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


//Text crudl functions

function addTxtLine() {
    const line = {
        txt: 'Meme Text Here',
        size: 40,
        color: 'white',
        fill: 'black',
        align: 'center',
        font: 'Impact',
        x: gElCanvas.width / 2,
        y: 50,
    }
    
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    _saveMemesToStorage()
}

function deleteTxtLine(lineIdx) {
    const currLineIdx = gMeme.lines.findIndex(line => line.id === lineIdx)
    gMeme.lines.splice(currLineIdx, 1)
    _saveMemesToStorage()
}

function switchLine(diff) {
    const allLines = gMeme.lines.length
    if (allLines <= 1) return
    gMeme.selectedLineIdx += diff

    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = allLines - 1
    if (gMeme.selectedLineIdx >= allLines) gMeme.selectedLineIdx = 0
}


function updateLineSize(diff) {
    const idx = gMeme.selectedLineIdx
    var currLineSize = gMeme.lines[idx].size += diff
    _saveMemesToStorage()
}

function setTextAlign(align) {
    const idx = gMeme.selectedLineIdx
    var currAlign = gMeme.lines[idx].align = align
    _saveMemesToStorage()

}

function setFontStyle(font) {
    const idx = gMeme.selectedLineIdx
    var currStyle = gMeme.lines[idx].font = font
    _saveMemesToStorage()

}

function setFontColor(color) {
    const idx = gMeme.selectedLineIdx
    var currColor = gMeme.lines[idx].color = color
    _saveMemesToStorage()
}

function setFontLineColor(color) {
    const idx = gMeme.selectedLineIdx
    var currColor = gMeme.lines[idx].fill = color
    _saveMemesToStorage()
}

//Factory functions

function _createMemeImgs(count) {
    const memes = []
    for (var i = 0; i < count; i++) {
        memes[i] = _createMemeImg(i + 1)
    }
    return memes
}


function _createMemeImg(id = 1) {
    const meme = { id, url: `memes-imgs/${id}.jpg`, keywords: getKeyWords() }
    return meme
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}