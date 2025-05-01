'use strict'

function onInit(){
    console.log('Hi');
    
}

function ontoggleMenu(){
    console.log('onToggleMenu');
        document.body.classList.toggle('menu-open')
    
}

function onSavedInit(){
    console.log('onSavedInIt');
}

function onSearchMeme(elMeme){
console.log(elMeme);

}

function onKeyWordPress(word){
console.log(word.innerText)
}

function onMemeUpload(ev){
    // loadImageFromInput(ev,onRenderMeme)
    console.log('ev:', ev)
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.canvas-container').innerHTML = ''
    // const reader = new FileReader()

    // reader.onload = function (event) {
    //     const img = new Image()
    //     img.onload = () => {
    //         onImageReady(img)
    //     }
    //     img.src = event.target.result
    // }
    // reader.readAsDataURL(ev.target.files[0])
    console.log('Loading...');
    
}

function renderMeme(meme) {
    gElCanvas.height = (meme.naturalHeight / meme.naturalWidth) * gElCanvas.width
    gCtx.drawImage(meme, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onTypeText(){
    console.log('Typing...');
    
}
function onSwitchLine(){
    console.log('onSwitchLine')

}
function onAddLine(){
    console.log('onAddLine')
    
}
function onDeleteLine(){
    console.log('onDeleteLine')

}

function onUpdateLineSize(diff){
console.log('diff:', diff)
}

function onSetTxtAlign(align){
console.log('align:', align)
}

function onSetFont(elFont){
console.log('elFont:', elFont)
}

function onSetFillStyle(color){
console.log('TxtColor', color);

}

function onSaveMeme() {
const data = gElCanvas.toDataURL()
addMeme(data)
    renderMemes()
console.log('Saving...');
}
function onRemoveMeme(memeIdx){
    removeMeme(memeIdx)
    renderMemes()
}

function onShareMeme(elMeme){
    console.log('sharing...');
    
}

function onDownloadMeme(elMeme){
    console.log(elMeme);
    
    // const dataUrl = gElCanvas.toDataURL()
    // elMeme.href = dataUrl
    // elMeme.download = 'my-meme'
}