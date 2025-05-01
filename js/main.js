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



function onSelectMeme(elMeme) {
    console.log('Selected');
    elMeme.classList.toggle('selected')

    if (elMeme.classList.contains('selected')) {

        coverCanvasWithMeme(elMeme)
    }
}

function coverCanvasWithMeme(elMeme) {
    gElMeme = elMeme
    redrawCanvas()
}
function redrawCanvas() {
    if (!gElMeme) return

    const img = gElMeme
    // const imgAspect = img.naturalWidth / img.naturalHeight
    // const canvasAspect = gElCanvas.width / gElCanvas.height
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width



    // let drawWidth, drawHeight, offsetX, offsetY

    // if (canvasAspect > imgAspect) {

    //     drawHeight = gElCanvas.height
    //     drawWidth = img.naturalWidth * (drawHeight / img.naturalHeight)
    // } else {

    //     drawWidth = gElCanvas.width
    //     drawHeight = img.naturalHeight * (drawWidth / img.naturalWidth)
    // }

    // offsetX = (gElCanvas.width - drawWidth) / 2
    // offsetY = (gElCanvas.height - drawHeight) / 2

    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    // gCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

}





function onTypeText() {
    console.log('Typing...');


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