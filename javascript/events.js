document.querySelector('button#iniciar').addEventListener('click', () => {
    telaInicial.start();
})

document.querySelector('input#pw').addEventListener('input', ()=> {
    TelaDeLogin.verifyLength('pw');
})

document.querySelector('button#login').addEventListener('click', ()=>{
    TelaDeLogin.login();
})