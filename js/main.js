'use strict'

let gElCanvas
let gCtx
let gIsDragging = false
let gStartPos = null

const STORAGE_MAIN = 'searchHistory'

let gSearchHistory = []
let gKeywordSearchCountMap = {}


function onInit() {
    console.log('Hi');
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gElMemeGallery.classList.remove('hidden')
    gElMemeEditor.classList.add('hidden')
    gElSavedMemes.classList.add('hidden')

    gElMemeNav.classList.remove('active')
    gElGalleryNav.classList.add('active')


    onResize()
    renderMeme()
    renderSavedMemes()

    loadSearchHistoryFromStorage()

    renderMemeGallery()
    onUpdateKeywordSize()
}


function onResize() {
    renderMeme()
}


function onSavedInit() {
    gElMemeNav.classList.add('active')
    gElGalleryNav.classList.remove('active')

    gElSavedMemes.classList.remove('hidden')
    gElMemeGallery.classList.add('hidden')
    gElMemeEditor.classList.add('hidden')
}

function onSearchMeme(txt) {

    const filteredImgs = setFilterBy(txt)
    renderMemeGallery(filteredImgs)

    gSearchHistory.push(txt)
    const updatedMap = updateKeywordSearchMap(gSearchHistory)
}

function onKeyWordPress(word) {
    const txt = word.innerText.toLowerCase()

    const elInput = document.querySelector('.search-input')
    elInput.value = txt

    onSearchMeme(txt)
    gSearchHistory.push(txt)
    gKeywordSearchCountMap = updateKeywordSearchMap(gSearchHistory)
    saveToStorage(STORAGE_MAIN, gSearchHistory)

    onUpdateKeywordSize()
}

function onUpdateKeywordSize() {
    const keywordEls = document.querySelectorAll('.keyword')

    keywordEls.forEach(el => {
        const keyword = el.innerText.toLowerCase().trim()
        const count = gKeywordSearchCountMap[keyword] || 1
        const newFontSize = 14 + count 
        el.style.fontSize = newFontSize + 'px'
    })

}

function onTypeText(elTxt) {

    const meme = getMeme()
    const currLine = meme.lines[meme.selectedLineIdx]
    if (!currLine) return
    currLine.txt = elTxt.value
    renderMeme()
}

// Need Fix
function onSwitchLine() {
    const meme = getMeme()
    let lineIdx = meme.selectedLineIdx
    switchLine(lineIdx)
    renderMeme()
    console.log('lineIdx:', lineIdx)
    // console.log('onSwitchLine')

}

function onAddLine() {
    console.log('onAddLine')
    // renderMeme({ showSelection: false })
    addTxtLine()

    renderMeme({ showSelection: true })

}
function onRemoveLine() {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    deleteTxtLine(lineIdx)
    console.log('onDeleteLine')
    renderMeme()

}

function onUpdateLineSize(diff) {
    updateLineSize(diff)
    renderMeme()
}

function onSetTxtAlign(align) {
    setTextAlign(align)
    renderMeme()
    console.log('align:', align)
}

function onSetFont(elFont) {
    console.log('elFont:', elFont)
    setFontStyle(elFont)
    renderMeme()
}

function onSetFillStyle(color) {
    setFontColor(color)
    console.log('TxtColor', color);
    renderMeme()

}

function onSetLineStyle(color) {
    setFontLineColor(color)
    console.log('LineColor', color);
    renderMeme()

}

function onDown(ev) {
    const pos = getEvPos(ev)
    const lineIdx = getLineAtPos(pos)
    const meme = getMeme()

    if (lineIdx === -1) return

    meme.selectedLineIdx = lineIdx
    gIsDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    if (!gIsDragging) return
    const meme = getMeme()


    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    const line = meme.lines[meme.selectedLineIdx]
    line.x += dx
    line.y += dy

    gStartPos = pos
    renderMeme()
}

function onUp() {
    gIsDragging = false
    document.body.style.cursor = 'grab'

}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
  
    let pos = {
      x: ev.offsetX,
      y: ev.offsetY,
    }
  
    if (TOUCH_EVS.includes(ev.type)) {
      // Prevent triggering the mouse ev
      ev.preventDefault()
      // Gets the first touch point
      ev = ev.changedTouches[0]
      // Calc the right pos according to the touch screen
      pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
      }
    }
    return pos
  }
  
function getLineAtPos(pos) {
    return gMeme.lines.findIndex(line => {
        const textWidth = gCtx.measureText(line.txt).width
        const textHeight = line.size
        return (
            pos.x >= line.x - textWidth / 2 &&
            pos.x <= line.x + textWidth / 2 &&
            pos.y >= line.y - textHeight &&
            pos.y <= line.y
        )
    })
}

// mobile meny toggle
function ontoggleMenu() {
    console.log('onToggleMenu');
    document.body.classList.toggle('menu-open')
}