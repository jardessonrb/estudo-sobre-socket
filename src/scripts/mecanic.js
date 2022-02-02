 posicaoInialDaPeca = '';
var destinoDaPeca = '';
var vezDeJogar = null;
var jogoIniciado = false;
var ultimaPecaSelecionada  = null;
const jogador1 = "jogador1";
const jogador2 = "jogador2";

function reset(){
    posicaoInialDaPeca = '';
    destinoDaPeca = '';
    // vezDeJogar = null;
    // jogoIniciado = false;
    // ultimaPecaSelecionada  = null;
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
}

function jump(coordinate){
    const div    = document.getElementById(coordinate);
    console.log(div.firstElementChild);
    if(div.firstElementChild){
        return;
    }
    //Dar para trocar por ultima peça selecionada
    const button = document.getElementById(ultimaPecaSelecionada);
    if(vezDeJogar !== setJogador(button.id)){
        return;
    }

    const [lineStarting, columnStarting ] = posicaoInialDaPeca.split(":");
    const [lineDestination, columnDestinaion ] = coordinate.split(":");
    // console.log({lineStarting, columnStarting, lineDestination, columnDestinaion});
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

