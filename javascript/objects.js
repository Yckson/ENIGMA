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
                for (let c = 0; c < 100; c++){
                    loadingBar.style.width = `${c}%`;
                    await sleep(50);
                }
                this.currentLoggedUser[0] = document.querySelector(`input#${this.user}`).value;
                this.currentLoggedUser[1] = document.querySelector(`input#${this.pw}`).value;

            }
            else{
                errorSpan.innerHTML = "Senha Incorreta!";
                showContent(this.error);
            }
        }
        else{
            errorSpan.innerHTML = "Usuário Inexistente!";
            showContent(this.error);
        }
    }


}