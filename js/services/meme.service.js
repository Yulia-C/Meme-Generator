'use strict'
const STORAGE_KEY = 'memeDB'

let gMemes = loadFromStorage(STORAGE_KEY) || []

function getMemes() {
    return gMemes
}

function removeMeme(memeId) {
    const memeIdx = gMemes.findIndex(meme => meme.id === memeId)
    gMemes.splice(memeIdx, 1)
    _saveMemesToStorage()
}

function addMeme(data) {
    const meme = _createMeme(data)
    gMemes.unshift(meme)
    _saveMemesToStorage()
    return meme
}

function getMemeById(memeIdx) {
    const meme = gMemes.find(meme => meme.id === memeIdx)
    return meme
}

function _createMeme(data) {
    return {
        id: makeId(6),
        createdAt: Date.now(),
        data
    }
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMemes)
}