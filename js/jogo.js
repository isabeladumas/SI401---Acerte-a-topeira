const DURACAO_PARTIDA = 30;      // segundos
const TEMPO_VISIVEL = 1000;      // ms que o zumbi fica visível
const PAUSA_ENTRE_ZUMBIS = 400;  // ms entre um zumbi e o próximo

//Elementos da página
const botaoIniciar = document.querySelector(".botao");
const botaoDesistir = document.querySelector(".botao-desistir");
const buracos = document.querySelectorAll(".buraco");
const numeros = document.querySelectorAll(".numero--info-jogador");

// ===== Estado do jogo =====
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

// ===== Zumbi =====
function mostrarZumbi() {
    const indice = Math.floor(Math.random() * buracos.length);
    buracoAtual = buracos[indice];
    buracoAtual.innerHTML = "??";
    buracoAtual.style.fontSize = "2.5rem";

    // Depois de TEMPO_VISIVEL ms o zumbi some sozinho
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

// ===== Clique nos buracos =====
for (let i = 0; i < buracos.length; i++) {
    buracos[i].addEventListener("click", function () {
        if (!jogando) {
            return;
        }
        if (buracos[i] == buracoAtual) {
            // Acerto
            acertos++;
            atualizarPlacar();
            clearTimeout(timerZumbi);
            esconderZumbi();
        } else {
            // Erro (clicou em buraco vazio)
            erros++;
        }
    });
}

// ===== Iniciar / Terminar / Desistir =====
function iniciarJogo() {
    if (jogando) {
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

botaoIniciar.addEventListener("click", iniciarJogo);
botaoDesistir.addEventListener("click", desistirDoJogo);    

