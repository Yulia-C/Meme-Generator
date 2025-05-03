'use strict'

var gElCanvas
var gCtx
var gElMeme = null

function onInit() {
    console.log('Hi');
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    window.addEventListener('resize', onResize)

    onResize()
    renderMeme()
    renderMemeGallery()    
}

function onResize() {
    resizeCanvas()
    redrawCanvas()
}


function onSavedInit() {
    console.log('onSavedInIt');
}

function onSearchMeme(elMeme) {
    console.log(elMeme);

}

function onKeyWordPress(word) {
    console.log(word.innerText)
}

function onTypeText(elTxt) {
    const meme = getMeme()
    const currLine = meme.lines[meme.selectedLineIdx]
    
    if(!currLine) return
    currLine.txt = elTxt.value
    renderMeme()
}

function onSwitchLine() {
    console.log('onSwitchLine')

}
function onAddLine() {
    console.log('onAddLine')

}
function onDeleteLine() {
    console.log('onDeleteLine')

}

function onUpdateLineSize(diff) {
    console.log('diff:', diff)
}

function onSetTxtAlign(align) {
    console.log('align:', align)
}

function onSetFont(elFont) {
    console.log('elFont:', elFont)
}

function onSetFillStyle(color) {
    console.log('TxtColor', color);

}




function onDownloadMeme(elMeme) {
    console.log(elMeme);

    const dataUrl = gElCanvas.toDataURL()
    elMeme.href = dataUrl
    elMeme.download = 'my-meme'
}


function resizeCanvas() {

    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 2
    gElCanvas.height = elContainer.offsetHeight - 2
}

// mobile meny toggle
function ontoggleMenu() {
    console.log('onToggleMenu');
    document.body.classList.toggle('menu-open')
}