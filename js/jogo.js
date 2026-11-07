const DURACAO_PARTIDA = 30;      // segundos
const TEMPO_VISIVEL_INICIAL = 1000;      // ms que o zumbi fica visivel
const REDUCAO_POR_NIVEL = 100;
const PAUSA_ENTRE_ZUMBIS = 400;  // ms entre um zumbi e o proximo
const PORCENTAGEM_NECESSARIA = 80;
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
let acertosTotais = 0;
let acertos = 0;
let erros = 0;
let buracoAtual = null;   // buraco com zumbi agora (null = nenhum)
let nivelAtual = 1; 

// Timers (guardados para poder limpar)
let timerRelogio = null;
let timerZumbi = null;
let timerPausa = null;

function atualizarPlacar() {
    numeros[0].innerHTML = tempoRestante;
    numeros[1].innerHTML = nivelAtual;
    numeros[2].innerHTML = acertos;
    numeros[3].innerHTML = calcularPorcentagemAcertos()+ "%";
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

//atualizar tempo visivel por nivel
function calcularTempoVisivel() {
    return(
        TEMPO_VISIVEL_INICIAL - (nivelAtual - 1) * REDUCAO_POR_NIVEL
    );
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

function calcularPorcentagemAcertos() {
    return ((acertos / (acertos+erros)) * 100).toFixed(1);
}


function contarTempo() {
    if (!jogando) {
        return;
    }

    if (tempoRestante > 0) {
        tempoRestante--;
        atualizarPlacar();
    }

    if (tempoRestante === 0) {
        clearInterval(timerRelogio);
        timerRelogio = null;
        terminarNivel();
    }
}

function iniciarJogo() {
    if (jogando) {
        return;
    }

    buracos = tabuleiro.querySelectorAll(".buraco");

    const linhas = parseInt(infoJogo[0].textContent, 10);
    const colunas = parseInt(infoJogo[1].textContent, 10);

    if (buracos.length !== linhas * colunas) {
        return;
    }

    jogando = true;
    nivelAtual = 1;
    tempoRestante = DURACAO_PARTIDA;
    acertos = 0;
    erros = 0;

    botaoIniciar.disabled = true;
    atualizarPlacar();

    timerRelogio = setInterval(contarTempo, 1000);
    mostrarZumbi();
}

function terminarNivel() {
    if (!jogando) {
        return;
    }

    pararTimers();

    if (buracoAtual !== null) {
        buracoAtual.innerHTML = "";
        buracoAtual = null;
    }

    const porcentagem = Number(calcularPorcentagemAcertos());

    if (porcentagem >= PORCENTAGEM_NECESSARIA) {
        nivelAtual++;
        tempoRestante = DURACAO_PARTIDA;

        // Começa o próximo nível sem zerar os acertos totais
        atualizarPlacar();

        timerRelogio = setInterval(contarTempo, 1000);
        mostrarZumbi();
    } else {
        terminarJogo();
    }
}


function pararJogo() {
    jogando = false;
    pararTimers();
    esconderZumbi();
    botaoIniciar.disabled = false;
}

function terminarJogo() {
    pararJogo();
    alert("Fim de jogo! Acertos: " + acertosTotais + " | Erros: " + erros);
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