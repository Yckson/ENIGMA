function playAudio(audio){
    if (mediaVariables.currentAudio != null){
        stopAudio(mediaVariables.currentAudio);
    }
    audio.play();
    mediaVariables.currentAudio = audio;

}

function playAudioOver(audio){
    audio.play();
}

function stopAudio(audio){
    pauseAudio(audio);
    audio.currentTime = 0;
    mediaVariables.currentAudio = null;
}

function pauseAudio(){
    let audio = mediaVariables.currentAudio;
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