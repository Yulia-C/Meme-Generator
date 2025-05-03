'use strict'

function renderMemeGallery() {
    const memeImgs = getMemeImgs()
    // console.log('memeImgs:', memeImgs)

    const elMemeContainer = document.querySelector('.meme-container')
    elMemeContainer.innerHTML =
        `<label class="file-input" for="file-upload-input">
                    <i class="fa-solid fa-upload"></i> Upload Image
                    <input id="file-upload-input" type="file" name="meme" onchange="onMemeUpload(event)" style="display: none;"/>
                </label>
                ${memeImgs.map(meme => {
            return `
                    <article class="meme-img">
                    <img onclick="onSelectMeme(${meme.id}, this)" class="rounded-m meme-img" src="memes-imgs/${meme.id}.jpg" alt="meme">
                    </article>`
        }).join('')}`


}