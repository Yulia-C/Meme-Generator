'use strict'

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getKeyWords() {
    const keyWords = ['funny', 'cartoon', 'coding', 'animal', 'cat', 'sad']
    const wordCount = getRandomIntInclusive(1, 2)

    const selectedWords = []
    const usedIndexes = new Set()

    while (selectedWords.length < wordCount) {
        const randIdx = getRandomIntInclusive(0, keyWords.length - 1)
        if (!usedIndexes.has(randIdx)) {
            usedIndexes.add(randIdx)
            selectedWords.push(keyWords[randIdx])
        }
    }
    return selectedWords
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

