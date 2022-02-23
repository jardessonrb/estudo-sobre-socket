var posicaoInialDaPeca = '';
var destinoDaPeca = '';
var vezDeJogar = null;
var jogoIniciado = false;
var ultimaPecaSelecionada  = null;
var pontosJogador1 = null;
var pontosJogador2 = null;
var jogadas = null;
const jogador1 = "jogador1";
const jogador2 = "jogador2";

function reset(){
    posicaoInialDaPeca = '';
    destinoDaPeca = '';
}

function selectPiece(idButton) {
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

    jogadas = document.getElementById("jogadasnapartida");
    pontosJogador1 = document.getElementById("pontosjogador1");
    pontosJogador2 = document.getElementById("pontosjogador2");
}

function movePiece(coordinate){
    const div = document.getElementById(coordinate);
    if(div.firstElementChild){
        return;
    }
    //Dar para trocar por ultima peça selecionada
    const button = document.getElementById(ultimaPecaSelecionada);
    if(vezDeJogar !== setJogador(button.id)){
        return;
    }

    const coordinates = splitCoordeantes(coordinate);
    if(!verifyCoordinate(coordinates)){
        alert("Jogada invalida ...");
        return;
    }

    const { lineStarting, lineDestination, columnStarting, columnDestination } = coordinates;
    if(setJogador(button.id) === jogador1){
        const diferencaOrigemDestino = lineDestination - lineStarting;
        if(diferencaOrigemDestino === -1){
            alert("Jogada invalida");
            return;
        }

        if(diferencaOrigemDestino === 2){
            if(columnStarting < columnDestination){
                const divRival = document.getElementById(`${Number(lineStarting) + 1}:${Number(columnStarting) + 1}`);
                divRival.removeChild(divRival.firstElementChild);
                div.appendChild(button);
                setPointsGamer(button.id);
                alternaVez(button.id);
                return;
            }
            if(columnStarting > columnDestination){
                const divRival = document.getElementById(`${Number(lineStarting) + 1}:${Number(columnStarting) - 1}`);
                divRival.removeChild(divRival.firstElementChild);
                div.appendChild(button);
                setPointsGamer(button.id);
                alternaVez(button.id);
                return;
            }
        }

        if(diferencaOrigemDestino === 1){
            div.appendChild(button);
            alternaVez(button.id);
            return;
        }
    }else {
        const diferencaOrigemDestino = lineDestination - lineStarting;
        if(diferencaOrigemDestino === 1){
            alert("Jogada invalida");
            return;
        }

        if(diferencaOrigemDestino === -2){
            if(columnStarting > columnDestination){
                const divRival = document.getElementById(`${Number(lineStarting) - 1}:${Number(columnStarting) - 1}`);
                divRival.removeChild(divRival.firstElementChild);
                div.appendChild(button);
                setPointsGamer(button.id);
                alternaVez(button.id);
                return;
            }
            if(columnStarting < columnDestination){
                const divRival = document.getElementById(`${Number(lineStarting) - 1}:${Number(columnStarting) + 1}`);
                divRival.removeChild(divRival.firstElementChild);
                div.appendChild(button);
                setPointsGamer(button.id);            
                alternaVez(button.id);
                return;
            }
        }

        if(diferencaOrigemDestino === -1){
            div.appendChild(button)
            alternaVez(button.id);
            return;
        }
    }

}


function splitCoordeantes(coordinate){
    const [lineStarting, columnStarting ] = posicaoInialDaPeca.split(":");
    const [lineDestination, columnDestination ] = coordinate.split(":");

    return {
        lineStarting,
        columnStarting,
        lineDestination,
        columnDestination
    }
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
    vezDeJogar = setJogador(idButton) === jogador1 ? jogador2 : jogador1;
    setJogadas();
    return;
}

function verifyCoordinate(coordinates){
    if(coordinates.lineStarting === coordinates.lineDestination){
        return false;
    }
    
    if(coordinates.columnStarting === coordinates.columnDestinaion){
        return false;
    }

    return true;
}

function setPointsGamer(idButton){
    if(setJogador(idButton) === jogador1){
        pontosJogador1.innerText = Number(pontosJogador1.innerText) - 1;
    }else {
        pontosJogador2.innerText = Number(pontosJogador2.innerText) - 1;
    }

    return;
}

function setJogadas(){
    jogadas.innerText = Number(jogadas.innerText) + 1;
}