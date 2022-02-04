var posicaoInialDaPeca = '';
var destinoDaPeca = '';
var vezDeJogar = null;
var jogoIniciado = false;
var ultimaPecaSelecionada  = null;
var pontosJogador1 = null;
var pontosJogador2 = null;
const jogador1 = "jogador1";
const jogador2 = "jogador2";

function reset(){
    posicaoInialDaPeca = '';
    destinoDaPeca = '';
}

function select(idButton) {
    if(vezDeJogar === null){
        vezDeJogar = setJogador(idButton);
        ultimaPecaSelecionada = idButton;
        posicaoInialDaPeca = document.getElementById(idButton).parentNode.id;
        return;
    }

    if(vezDeJogar === setJogador(idButton)){
        ultimaPecaSelecionada = idButton;
        posicaoInialDaPeca = document.getElementById(idButton).parentNode.id;
    }else {
        alert("Não é sua vez de jogar");
    }

    pontosJogador1 = document.getElementById("pontosjogador1");
    pontosJogador2 = document.getElementById("pontosjogador2");
}

function jump(coordinate){
    const div    = document.getElementById(coordinate);
    if(div.firstElementChild){
        return;
    }
    //Dar para trocar por ultima peça selecionada
    const button = document.getElementById(ultimaPecaSelecionada);
    if(vezDeJogar !== setJogador(button.id)){
        return;
    }

    const [lineStarting, columnStarting ] = posicaoInialDaPeca.split(":");
    const [lineDestination, columnDestination ] = coordinate.split(":");
    const diferencaLine = calculoModulo(lineDestination - lineStarting);

    if(diferencaLine === 2){
        const divRival = document.getElementById(`${Number(lineStarting)+1}:${Number(columnDestination)-1}`);
        divRival.removeChild(divRival.firstChild);
        setPointsGamer(button.id);
    }

    div.appendChild(button);
    vezDeJogar = alternaVez(button.id);
}

function setJogador(idButton){
    if(idButton <= 12 & idButton >=1){
        return jogador1;
    }

    if(idButton > 12 & idButton <= 24){
        return jogador2;
    }
}

function alternaVez(idButton){
    return setJogador(idButton) === jogador1 ? jogador2 : jogador1;
}

function verifyCoordinate(coordinates, idButton){
    if(coordinates.lineStarting === coordinates.lineDestination){
        return false;
    }
    
    if(coordinates.columnStarting === coordinates.columnDestinaion){
        return false;
    }
}

function calculoModulo(value){
    return value < 0 ? (value * (-1)) : value;
}

function setPointsGamer(idButton){
    if(setJogador(idButton) === jogador1){
        pontosJogador1.innerText = Number(pontosJogador1.innerText) + 1;
    }else {
        pontosJogador2.innerText = Number(pontosJogador2.innerText) + 1;
    }
}