'use strict'


function onSelectMeme(imgId) {
    const imgData = getMemeById(imgId)

    gElMemeGallery.classList.add('hidden')
    gElMemeEditor.classList.remove('hidden')
    // gElSavedMemes.classList.add('hidden')

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
                    fill: 'white',
                    color: 'black',
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

function renderMeme({ showSelection = true } = {}) {
    const meme = getMeme()
    const img = meme.selectedImg
    if (!img) return

    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    meme.lines.forEach((line, idx) => {
        drawText(line)
        if (showSelection && idx === meme.selectedLineIdx) {
            drawTextBox(line)
        }
    })

    updateInputPlaceholder()
}

function drawText(line) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.fill
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size + 'px'} ${line.font}`
    gCtx.textAlign = line.align

    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
}

function drawTextBox(line) {
    const textWidth = gCtx.measureText(line.txt).width
    const padding = 10
    const height = line.size + 10

    let x = line.x
    let y = line.y

    if (line.align === 'center') {
        x -= textWidth / 2
    } else if (line.align === 'right') {
        x -= textWidth
    }

    gCtx.beginPath()
    gCtx.setLineDash([4, 3])
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 2
    gCtx.rect(x - padding / 2, y - line.size, textWidth + padding, height)
    gCtx.stroke()
    gCtx.setLineDash([])

}


function onSaveMeme() {

    renderMeme({ showSelection: false })

    // const dataUrl = gElCanvas.toDataURL()
    const memeCopy = JSON.parse(JSON.stringify(getMeme()))
    memeCopy.data = gElCanvas.toDataURL()
    addMeme(memeCopy)
    renderMeme({ showSelection: true })
    renderSavedMemes()
    // console.log('Saving...');

    console.log('Saving...');
}

function renderSavedMemes() {
    const memes = getSavedMemes()
    // console.log('meme:', memes)
    const elSavedMemes = document.querySelector('.meme-saved-page')
    elSavedMemes.innerHTML = memes.map(meme => {
        return `
        <article class="meme-img">
            <button class="remove-btn" onclick="onRemoveMeme('${meme.id}')">X</button>
                    <img onclick="onSelectFromSaved('${meme.id}')" class="rounded-m saved-meme-img" src="${meme.data}" alt="meme">
                </article>`
    }).join('')
}

function onSelectFromSaved(memeId) {
    let savedMeme = getSavedMemeById(memeId)
    console.log('savedMeme:', savedMeme)
    const img = new Image()
    img.onload = () => {
        gMeme = {
            id: savedMeme.id,
            selectedImg: img,
            selectedImgId: savedMeme.selectedImgId || null,
            selectedLineIdx: savedMeme.selectedLineIdx || 0,
            lines: savedMeme.lines.map(line => ({ ...line }))
        }
        renderMeme()
    }
    img.src = savedMeme.data
}

function onRemoveMeme(memeIdx) {
    removeMeme(memeIdx)
    renderSavedMemes()
}


function updateInputPlaceholder() {
    const meme = getMeme()
    const currLine = meme.lines[meme.selectedLineIdx]
    const elInput = document.querySelector('.meme-input-text')

    if (!currLine) return
    elInput.placeholder = currLine.txt || 'Meme text here'
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
    loadMemeFromInput(ev, img => {
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