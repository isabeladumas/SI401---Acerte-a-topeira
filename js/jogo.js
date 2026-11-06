const DURACAO_PARTIDA = 30;      // segundos
const TEMPO_VISIVEL = 1000;      // ms que o zumbi fica visivel
const PAUSA_ENTRE_ZUMBIS = 400;  // ms entre um zumbi e o proximo
const ZUMBI = "\u{1F9DF}";       // emoji do zumbi (escrito como codigo para nao quebrar no salvamento)

//Elementos da pagina
const botaoIniciar = document.querySelector(".botao");
const botaoDesistir = document.querySelector(".botao-desistir");
const tabuleiro = document.querySelector(".tabela-buracos");
const infoJogo = document.querySelectorAll(".numero--info-jogo");
const numeros = document.querySelectorAll(".numero--info-jogador");

//Estado do jogo
let buracos = [];         // lista de buracos do tabuleiro atual
let jogando = false;
let tempoRestante = DURACAO_PARTIDA;
let acertos = 0;
let erros = 0;
let buracoAtual = null;   // buraco com zumbi agora (null = nenhum)

// Timers (guardados para poder limpar)
let timerRelogio = null;
let timerZumbi = null;
let timerPausa = null;

function atualizarPlacar() {
    numeros[0].innerHTML = tempoRestante;
    numeros[2].innerHTML = acertos;
}

function pararTimers() {
    clearInterval(timerRelogio);
    clearTimeout(timerZumbi);
    clearTimeout(timerPausa);
}

//Zumbi
function mostrarZumbi() {
    // Sorteia entre TODOS os buracos do tabuleiro atual
    const indice = Math.floor(Math.random() * buracos.length);
    buracoAtual = buracos[indice];
    buracoAtual.innerHTML = ZUMBI;
    buracoAtual.style.fontSize = "2.5rem";

    timerZumbi = setTimeout(esconderZumbi, TEMPO_VISIVEL);
}

function esconderZumbi() {
    if (buracoAtual != null) {
        buracoAtual.innerHTML = "";
        buracoAtual = null;
    }
    if (jogando) {
        timerPausa = setTimeout(mostrarZumbi, PAUSA_ENTRE_ZUMBIS);
    }
}

//Clique nos buracos
tabuleiro.addEventListener("click", function (evento) {
    if (!jogando) {
        return;
    }
    const clicado = evento.target;

    if (clicado == buracoAtual) {
        // Acerto
        acertos++;
        atualizarPlacar();
        clearTimeout(timerZumbi);
        esconderZumbi();
    } else if (clicado.classList.contains("buraco")) {
        // Erro (clicou em buraco vazio)
        erros++;
    }
});


function iniciarJogo() {
    if (jogando) {
        return;
    }


    buracos = tabuleiro.querySelectorAll(".buraco");
    const linhas = parseInt(infoJogo[0].textContent);
    const colunas = parseInt(infoJogo[1].textContent);

  
    if (buracos.length != linhas * colunas) {
        return;
    }

    jogando = true;
    tempoRestante = DURACAO_PARTIDA;
    acertos = 0;
    erros = 0;
    botaoIniciar.disabled = true;
    atualizarPlacar();

    timerRelogio = setInterval(function () {
        tempoRestante--;
        atualizarPlacar();
        if (tempoRestante <= 0) {
            terminarJogo();
        }
    }, 1000);

    mostrarZumbi();
}

function pararJogo() {
    jogando = false;
    pararTimers();
    esconderZumbi();
    botaoIniciar.disabled = false;
}

function terminarJogo() {
    pararJogo();
    alert("Fim de jogo! Acertos: " + acertos + " | Erros: " + erros);
}

function desistirDoJogo() {
    if (!jogando) {
        return;
    }
    if (confirm("Deseja mesmo desistir?")) {
        pararJogo();
    }
}


botaoIniciar.addEventListener("click", function () {
    setTimeout(iniciarJogo, 0);
});
botaoDesistir.addEventListener("click", desistirDoJogo);