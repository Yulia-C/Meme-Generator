'use strict'



function onSelectMeme(imgId) {
    const imgData = getMemeById(imgId)
    
    const img = new Image()
    img.src = imgData.url

    img.onload = () => {
        gMeme = {
            id: null,
            selectedImg: img,
            selectedImgId: imgData.id,
            selectedLineIdx: 0,
            lines: [
                {
                    txt: 'Meme Text Here',
                    size: 40,
                    color: 'white',
                    align: 'center',
                    font: 'Impact',
                    x: gElCanvas.width / 2,
                    y: 50
                }
            ]
        }

        renderMeme()
    }
}

function renderMeme() {
    const meme = getMeme()
    const img = meme.selectedImg
    if (!img) return

    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    meme.lines.forEach(line => drawText(line))
}

function drawText(line) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.align

    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
}


function onSaveMeme() {
    // const meme = addMeme(data)
    const data = gElCanvas.toDataURL()
    addMeme(data)
    renderSavedMemes()
    console.log('Saving...');
}

function renderSavedMemes() {
    const memes = getSavedMemes()
    console.log('meme:', memes)
    const elSavedMemes = document.querySelector('.meme-saved-page')
    elSavedMemes.innerHTML = memes.map(meme => {
        return `
        <article class="meme-img">
            <button class="remove btn" onclick="onRemoveMeme('${meme.id}')">X</button>
                    <img onclick="onSelectMeme(${meme.id})" class="rounded-m meme-img" src="${meme.data}" alt="meme">
                </article>`
    }).join('')
}


function onRemoveMeme(memeIdx) {
    removeMeme(memeIdx)
    renderSavedMemes()
}

// onDownload
function onDownloadMeme(elMeme) {
    console.log(elMeme);

    const dataUrl = gElCanvas.toDataURL()
    elMeme.href = dataUrl
    elMeme.download = 'my-meme'
}

// onShare
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
    console.log('ev:', ev)
    loadMemeFromInput(ev, img =>{
        gMeme = {
            id: null,
            selectedImg: img,
            selectedImgId: makeId(3),
            selectedLineIdx: 0,
            lines: [
                {
                    txt: 'Meme Text Here',
                    size: 40,
                    color: 'white',
                    align: 'center',
                    font: 'Impact',
                    x: gElCanvas.width / 2,
                    y: 50
                }
            ]
        }

        renderMeme()
    })
}
function loadMemeFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''

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