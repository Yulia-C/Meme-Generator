'use strict'


function onSaveMeme() {
    const data = gElCanvas.toDataURL()
    addMeme(data)
    renderMeme()
    console.log('Saving...');
}

function renderMeme() {
    const memes = getMeme()
    const elSavedMemes = document.querySelector('.meme-saved-page')

    elSavedMemes.innerHTML = memes.map(meme => {
        return `
        <article class="meme-img">
            <button class="remove btn" onclick="onRemoveMeme('${meme.id}')">X</button>
                    <img onclick="onSelectMeme(${meme.id})" class="rounded-m meme-img" src="${meme.data}" alt="meme">
                </article>`
    }).join('')
}

function onRemoveMeme(memeIdx){
    removeMeme(memeIdx)
    renderMeme()
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