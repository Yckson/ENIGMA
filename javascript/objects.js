const AudioLibrary = {
    ambience: document.querySelector('audio#ambience'),
    correct: document.querySelector('#correct'),
    wrong: document.querySelector('#wrong'),
    mamae: document.querySelector('#mamae'),
    startingSYS: document.querySelector('#startingSYS'),
    book: document.querySelector('#book')
};






const telaInicial = {
    element: 'interacao-inicial',

    start: function (){
        playAudio(AudioLibrary.ambience);
        hideContent(this.element);
        telaDeCarregamento.start();
    }
}

const telaDeCarregamento = {
    element: 'view01',

    start: async function() {
        showContent(this.element);
        await letterByLetter(this.element, 'INICIANDO O SISTEMA', 200);
        await letterByLetter(this.element, '...', 400);
        await sleep(5000);
        hideContent(this.element);
        TelaDeLogin.start()
        
    }
}

const TelaDeLogin = {
    element: 'view02',
    user: 'user',
    password: 'pw',
    buttonStart: 'login',
    error: 'error',
    progressBar: 'progressBar',
    loadingBar: 'innerProgressBar',
    currentLoggedUser: [null, null],

    list_of_users: [
        ["lstsh52tOCeuYuEFb9-H-Q", "MjrLMjSVJsNwaBI7QxYZ8w"],
        ["z47ETL5CUBKpjasHtTQ-hg", "1THEKAYLH3RWiL3bDfEhJw"],
        ["8qEjvx-LYjWD7Orjvwiq0Q", "U3p2gpLB4-mJz5_qY0uiYA"],
        ["xXGrCndov5-Eqn_XN7Z3Ag", "lOP2go2Colm-e4xn1186Iw"],

    ],

    start: function (){
        showContent(this.element);
    },

    verifyLength: function(pword){
        let password = document.querySelector(`input#${pword}`);
        if (password.value.length >= 7){
            showContent(this.buttonStart);
        }
        else{
            hideContent(this.buttonStart);
        }
    },

    verifyUser: function(){
        let user = document.querySelector(`input#${this.user}`).value;
        let inUsers = false;
        for (let c = 0; c <  this.list_of_users.length; c++){
            if (this.list_of_users[c][0] == user){
                inUsers = true;
            }
        }

        return inUsers;
    },

    verifyPassword: function(){
        let pw = document.querySelector(`input#${this.password}`).value;
        let user = document.querySelector(`input#${this.user}`).value;
        let isCorrect = false;
        for (let c = 0; c < this.list_of_users.length; c++){
            if (user == this.list_of_users[c][0] && pw == this.list_of_users[c][1]){
                isCorrect = true;
            }
        }
        return isCorrect;

    },


    login: async function(){
        let errorSpan = document.querySelector(`span#${this.error}`);
        let loadingBar = document.querySelector(`div#${this.loadingBar}`);
        if (this.verifyUser()){
            hideContent(this.error);
            if (this.verifyPassword()){
                hideContent(this.error);
                showContent(this.progressBar);
                playAudioOver(AudioLibrary.startingSYS);
                hideContent(this.buttonStart);
                for (let c = 0; c < 100; c++){
                    loadingBar.style.width = `${c}%`;
                    await sleep(50);
                }
                await sleep(1000);
                this.currentLoggedUser[0] = document.querySelector(`input#${this.user}`).value;
                this.currentLoggedUser[1] = document.querySelector(`input#${this.password}`).value;
                hideContent(this.element);
                TelaDoVideo.start();

            }
            else{
                errorSpan.innerHTML = "Senha Incorreta!";
                showContent(this.error);
            }
        }
        else{
            errorSpan.innerHTML = "Usuário Incorreto!";
            showContent(this.error);
        }
    }


}

const TelaDoVideo = {
    element: 'view03',
    video: 'video01',

    start: function (){
        showContent(this.element);
        let video = document.querySelector(`video#${this.video}`);
        video.play();
        this.removeVideo();
    },

    removeVideo: async function (){
        await sleep(13000);
        hideContent(this.element);
        sysOutput.start()
    }
}

const sysOutput = {
    element: 'view04',
    key1: null,
    key2: null,
    key3: null,
    key4: false,
    key4Content: document.createElement('img'),
    textPressed: '',

    start: function(){
        this.key1 = document.createElement('img');
        this.key1.src = 'media/img/key1.png';

        this.key2 = document.createElement('span');
        this.key2.id = 'textoEnergia';

        this.key3 = document.createElement('img');
        this.key3.src = 'media/img/key3.jpg';

        this.key4Content.src = 'media/img/key4.jpg';

        let view = document.querySelector(`div#${this.element}`);

        showContent(this.element);

        if (TelaDeLogin.currentLoggedUser[0] == TelaDeLogin.list_of_users[0][0]){
            view.appendChild(this.key1);
        }
        else if (TelaDeLogin.currentLoggedUser[0] == TelaDeLogin.list_of_users[1][0]){
            view.appendChild(this.key2);
            letterByLetter('textoEnergia', "Existe uma lenda de uma dimensão alternativa, um espaço que poderia ser cessado pelo puro acaso. Uma possibilidade minúscula, inacreditável, de que ao interagir com uma passagem, você poderia acessar outro lugar que não pretendia. Como se em todas as vezes que as portas do elevador se abrem, ou quando você se prepara para sair de casa, ou até mesmo quando abre o micro-ondas para pegar comida, você está jogando na loteria da probabilidade anárquica", 50);
        }
        else if (TelaDeLogin.currentLoggedUser[0] == TelaDeLogin.list_of_users[2][0]){
            view.appendChild(this.key3);
        }
        else if (TelaDeLogin.currentLoggedUser[0] == TelaDeLogin.list_of_users[3][0]){
            playAudio(AudioLibrary.mamae);
            this.key4 = true;
        }
    },

    keyLogger: function (key){
        if (!this.key4){
            return false;
        }

        let text = 'e perder tudo';
        let proposedText = this.textPressed + key;
        if (proposedText == text.substring(0, proposedText.length)){
            this.textPressed = proposedText;
            new Audio(AudioLibrary.correct.src).play();
        }
        else{
            if (this.textPressed.length > 2){
                AudioLibrary.startingSYS.pause();
                stopAudio(AudioLibrary.mamae);
                telaDeErro.start();
            }
            this.textPressed = '';
        }

        if (this.textPressed == text){
            let view = document.querySelector(`div#${this.element}`);
            view.appendChild(this.key4Content);
            playAudioOver(AudioLibrary.book);
        }


    }
}

const telaDeErro = {
    element: 'view05',

    start: function (){
        sysOutput.key4 = false;
        showContent(this.element);

    }
}