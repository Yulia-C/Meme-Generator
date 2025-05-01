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
    renderMemes()
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



function renderMemes() {
    const memes = getMemes()
    const elSavedMemes = document.querySelector('.meme-saved-page')

    elSavedMemes.innerHTML = memes.map(meme => {
        return `
        <article class="meme-img">
            <button class="remove btn" onclick="onRemoveMeme('${meme.id}')">X</button>
                    <img onclick="onSelectMeme(${meme.id})" class="rounded-m meme-img" src="${meme.data}" alt="meme">
                </article>`
    }).join('')
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

// onSahare
function onShareMeme(ev) {
    console.log('sharing...');

    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('meme/jpeg')

    // After a succesful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

    }
    uploadImg(canvasData, onSuccess)
}
async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}

// onUpload
function onMemeUpload(ev) {
    loadMemeFromInput(ev, coverCanvasWithMeme)
    console.log('ev:', ev)
}
function loadMemeFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => {
            onImageReady(img)
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
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