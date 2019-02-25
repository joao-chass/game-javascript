var diryJ, dirxJ, jog, velJ, pjx, pjy;
var velT;
var tamTelaW, tamTelaH;
var jogo;
var frames;
var contBombas,painelContBombas,velB,tmpCriaBomba;
var bombasTotal;
var vidaPlaneta, barraPlaneta;
var ie,ison;
var telaMsg;


//Função que determina os eventos quando eu APERTO as teclas.
function teclaDw() {
    /*"event.keyCode; Obtém o valor Unicode da tecla do teclado pressionada:*/
    var tecla = event.keyCode;
    if (tecla == 38) {//Cima
        //Observar que o "eixo Y é invertido", no caso, para cima é negativo
        diryJ = -1;
    }
    else if (tecla == 40) {//Baixo
        diryJ = +1;
    }
    if (tecla == 37) {//Esquerda
        dirxJ = -1;
    }
    else if (tecla == 39) {//Direita
        dirxJ = +1;
    }
    if (tecla == 32) {//TIRO
        atira(pjx+50,pjy);
    }

}

//Função que determina os eventos quando eu SOLTO as teclas.
function teclaUp() {
    var tecla = event.keyCode;
    if ((tecla == 38) || (tecla == 40)) {//Cima ou Baixo
        diryJ = 0;
    }
    if ((tecla == 37) || (tecla == 39)) {//Esquerda ou Direita
        dirxJ = 0;
    }

}

function criaBomba(){
    if(jogo){
        var y=0;
        var x=Math.random()*tamTelaW;
        var bomba=document.createElement("div");
        var att1=document.createAttribute("class");
        var att2=document.createAttribute("style");
        att1.value="bomba";
        att2.value="top:"+y+"px;left:"+x+"px;";
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        document.body.appendChild(bomba);
        contBombas--;
    }
}
function controlaBomba(){
    bombasTotal=document.getElementsByClassName("bomba");
    var tam=bombasTotal.length;
    for(var i=0;i<tam;i++){
        if(bombasTotal[i]){
            var pi=bombasTotal[i].offsetTop;
            pi+=velB;
            bombasTotal[i].style.top=pi+"px";
            if(pi>tamTelaH){
                vidaPlaneta-=10;
                criaExplosao(2,bombasTotal[i].offsetLeft,null);
                bombasTotal[i].remove();
            }
        }
    }
}
////////

function atira(x,y){
	var t=document.createElement("div");
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
    att1.value="tiroJog";
    att2.value="top:"+y+"px;left:"+x+"px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
}
function controleTiros(){
    var tiros=document.getElementsByClassName("tiroJog");
    var tam=tiros.length;
    for(var i=0;i<tam;i++){
        if(tiros[i]){
            var pt=tiros[i].offsetTop;
            pt-=velT;
            tiros[i].style.top=pt+"px";
            conlisaoTiroBomba(tiros[i]);
            if(pt<0){
                document.body.removeChild(tiros[i]);
                //tiros[i].remove();
            }
        }
    }
}

function criaExplosao(tipo,x,y){ //tipo 1=ar, 2=terra
    if(document.getElementById("explosao"+(ie-3))){
        document.getElementById("explosao"+(ie-3)).remove();
    }
    var explosao=document.createElement("div");
    var img=document.createElement("img");
    var som=document.createElement("audio");
    //atributos para div
    var att1=document.createAttribute("class");
    var att2=document.createAttribute("style");
    var att3=document.createAttribute("id");
    //atributo para imagem
    var att4=document.createAttribute("src");
    //atributo para audio
    var att5=document.createAttribute("src");
    var att6=document.createAttribute("id");

    att3.value="explosao"+ie;
    if(tipo==1){
        att1.value="explosaoAr";
        att2.value="top:"+y+"px;left:"+x+"px";
        att4.value="imagens/explode_ar.gif?"+new Date();
    }else{
        att1.value="explosaoChao";
        att2.value="top:"+(tamTelaH-57)+"px;left:"+(x-17)+"px";
        att4.value="imagens/explode.gif?"+new Date();
    }
    att5.value="imagens/explosao.mp3?"+new Date();
    att6.value="som"+ison;
    explosao.setAttributeNode(att1);
    explosao.setAttributeNode(att2);
    explosao.setAttributeNode(att3);
    img.setAttributeNode(att4);
    som.setAttributeNode(att5); 
    som.setAttributeNode(att6);
    explosao.appendChild(img);
    explosao.appendChild(som);
    document.body.appendChild(explosao);
    document.getElementById("som"+ison).play();
    ie++;
    ison++;
}

function conlisaoTiroBomba(tiro){
    var tam=bombasTotal.length;
    for(var i=0;i<tam;i++){
        if(bombasTotal[i]){
            if(
                (
                    (tiro.offsetTop<=(bombasTotal[i].offsetTop+67))&& //cima do tiro com a parte de baixo do inimigo
                    ((tiro.offsetTop+50)>=(bombasTotal[i].offsetTop)) //baixo do tiro a parte do inimigo
                )
                &&
                (
                    (tiro.offsetLeft<=(bombasTotal[i].offsetLeft+99))&& //esqeuerda do tiro com direito do inimigo
                    ((tiro.offsetLeft+50)>=(bombasTotal[i].offsetLeft)) //direito tiro com esquerda do inimigo
                )
            ){
                criaExplosao(1,bombasTotal[i].offsetLeft-25,bombasTotal[i].offsetTop);
                bombasTotal[i].remove();
                tiro.remove(); 
            }
        }
    }

}

function controlaJogador(){
    pjy += diryJ*velJ;
    pjx += dirxJ*velJ;

    //retorna a posição de um elemento especificado.
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
}
function gerenciaGame(){
    barraPlaneta.style.width=vidaPlaneta+"px";
    if(contBombas<=0){
        jogo=false;
        clearInterval(tmpCriaBomba);
        telaMsg.style.backgroundImage="url('imagens/fundo.jpg')"
        telaMsg.style.display="block";
    }
    if(vidaPlaneta<=0){
        jogo=false;
        clearInterval(tmpCriaBomba);
        telaMsg.style.backgroundImage="url('imagens/mundo.gif')"
        telaMsg.style.display="block";
    }
}

function gameLoop() {
    //"If "jogo" for TRUE...
    if(jogo === true){
        //Funções de Controle
        controlaJogador();
        controleTiros();
        controlaBomba();
    }
    gerenciaGame();
    //Função que vai gerir o Loop do game, gerando a animação - OBSERVE A RECURSIVIDADE (gameLoop -> frames -> gameLoop)
    frames = requestAnimationFrame(gameLoop);
}


function reinicia(){
    bombasTotal=document.getElementsByClassName("bomba");
    var tam=bombasTotal.length; 
    for(var i=0;i<tam;i++){
        if(bombasTotal[i]){
            bombasTotal[i].remove();
        }
    }
    telaMsg.style.display="none";
    clearInterval(tmpCriaBomba);
    cancelAnimationFrame(frames);
    vidaPlaneta=300;
    pjx=tamTelaW/2;
    pjy=tamTelaH/2;
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
    contBombas=20;
    jogo=true;
    tmpCriaBomba=setInterval(criaBomba, 1700);
    gameLoop();
}


//Função que organiza a inicialização do jogo
function inicia() {
    jogo =false;
    //Inicialização da tela:
    //A propriedade innerHeight retorna a largura da área de conteúdo de uma janela
    tamTelaH = window.innerHeight;
    tamTelaW = window.innerWidth;

    //Inicialização Jogador:
    dirxJ = diryJ = 0;
    pjx = tamTelaW/2;
    pjy = tamTelaH/2;
    velJ=velT=9;
    jog = document.getElementById("naveJog");
    //retorna a posição de um elemento especificado.
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";

    //controle das bombas 
    contBombas=20;
    velB=3;
    
    //controle do planeta
    vidaPlaneta=300;
    barraPlaneta=document.getElementById("barraPlaneta");
    barraPlaneta.style.width=vidaPlaneta+"px";

    //controle de explosao
    ie=ison=0;
    
    //Telas
    telaMsg=document.getElementById("telaMsg");
    telaMsg.style.backgroundImage="url('imagens/tela1.png')";
    telaMsg.style.display="block";
    document.getElementById("btnJogar").addEventListener("click",reinicia);




}

//addEventListener() registra uma única espera de evento em um único alvo(no caso, window).
//alvo.addEventListener(tipo, escuta[, usarCaptura]);
window.addEventListener("load", inicia);

document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);