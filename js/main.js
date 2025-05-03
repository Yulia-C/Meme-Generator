'use strict'

let gElCanvas
let gCtx
let gIsDragging = false
let gStartPos = null

function onInit() {
    console.log('Hi');
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')


    onResize()
    renderMeme({ showSelection: true })
    renderSavedMemes()
    renderMemeGallery()


}

function onResize() {
    renderMeme({ showSelection: true })
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
    if (!currLine) return
    currLine.txt = elTxt.value
    renderMeme()
}

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
    const clientX = ev.type.startsWith('touch') ? ev.touches[0].clientX : ev.clientX
    const clientY = ev.type.startsWith('touch') ? ev.touches[0].clientY : ev.clientY
    const rect = gElCanvas.getBoundingClientRect()
    return {
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top
    }
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