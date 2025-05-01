'use strict'
const STORAGE_KEY = 'memeDB'

let gMeme = loadFromStorage(STORAGE_KEY) || []



var gImgs = _createMemeImgs(25)


var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMemeImgs(){
    return gImgs
}

function getMeme() {
    //  gMeme = {
    //     selectedImgId: 2,
    //     selectedLineIdx: 0,
    //     lines: [
    //         {
    //             txt: 'I sometimes eat Falafel',
    //             size: 20,
    //             color: 'red',
    //             align: 'center',
    //             font: 'Arial',
    //         }
    //     ]
    // }
    return gMeme
}

function removeMeme(memeId) {
    const memeIdx = gMeme.findIndex(meme => meme.id === memeId)
    gMeme.splice(memeIdx, 1)
    _saveMemesToStorage()
}

function addMeme(data) {
    const meme = _createMeme(data)
    gMeme.unshift(meme)
    _saveMemesToStorage()
    return meme
}

function getMemeById(memeIdx) {
    const meme = gMeme.find(meme => meme.id === memeIdx)
    return meme
}

function _createMeme(data){
    return {
        id:makeId(3),
        data
    }
    // gMeme = {
    //     selectedImgId: 2,
    //     selectedLineIdx: 0,
    //     lines: [
    //         {
    //             txt: 'I sometimes eat Falafel',
    //             size: 20,
    //             color: 'red',
    //             align: 'center',
    //             font: 'Arial',
    //         }
    //     ]
    // }
    
   
}

function _createMemeImgs(count) {
    const memes = []
    for (var i = 0; i < count; i++) {
        memes[i] = _createMemeImg(i + 1)
    }
    console.log('memes:', memes)
    return memes
}

function _createMemeImg(id = 1) {
    const meme = { id, url: `img/${id}.jpg`, keywords: getKeyWords() }
    return meme
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}