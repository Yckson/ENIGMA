function playAudio(idAudio){
    if (mediaVariables.currentAudio != null){
        stopAudio(mediaVariables.currentAudio);
    }
    let audio = document.querySelector(`audio#${idAudio}`);
    audio.play();
    mediaVariables.currentAudio = idAudio;

}

function playAudioOver(idAudio){
    let audio = document.querySelector(`audio#${idAudio}`);
    audio.play();
}

function stopAudio(idAudio){
    let audio = document.querySelector(`audio#${idAudio}`);
    audio.currentTime = 0;
    console.log(audio);
    mediaVariables.currentAudio = null;
}

function pauseAudio(){
    let audio = document.querySelector(`audio#${mediaVariables.currentAudio}`);
    audio.pause();
}

function hideContent(contentId){
    let content = document.querySelector(`#${contentId}`);
    if (!content.classList.contains('hidden')){
        content.classList.add('hidden');
    }
}

function showContent(contentId){
    let content = document.querySelector(`#${contentId}`);
    content.classList.remove('hidden');
}

async function letterByLetter(elementId, contentToWrite, speed){
   let element = document.querySelector(`#${elementId}`);
   for (let c = 0; c < contentToWrite.length; c++){
        element.innerHTML += contentToWrite[c];
        await sleep(speed);
   }
   
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}