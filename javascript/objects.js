const telaInicial = {
    element: 'interacao-inicial',

    start: function (){
        playAudio('audio-ambience');
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
        ["lstsh52tOCeuYuEFb9-H-Q", "MjrLMjSVJsNwaBI7QxYZ8w"], //violeta - energia | violeta - seu pai lhe procura

        ["z47ETL5CUBKpjasHtTQ-hg", "1THEKAYLH3RWiL3bDfEhJw"], //bento - morte | bento - a morte lhe deseja

        ["FW9F-ivAypGuVtY8EpJSXA", "DTkzvXbkaLqgeLvTS9hSlg"], //bruno - energia | bruno - o caos lhe consome

        ["xXGrCndov5-Eqn_XN7Z3Ag", "lOP2go2Colm-e4xn1186Iw"], //akin - conhecimento | akin - saber tudo...

        ["1234", "1234567"]
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
        console.log(errorSpan)
        if (this.verifyUser()){
            hideContent(this.error);
            if (this.verifyPassword()){
                hideContent(this.error);
                showContent(this.progressBar);
                playAudioOver('startingSYS');
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

    start: function(){
        this.key1 = document.createElement('img');
        this.key1.src = 'media/img/key1.png';

        this.key2 = document.createElement('span');
        this.key2.id = 'textoEnergia';

        this.key3 = document.createElement('img');
        this.key3.src = 'media/img/key3.jpg';

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
            playAudio('mamae');
        }
    }
}