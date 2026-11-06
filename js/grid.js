/**
 * grid.js - Geração dinâmica do tabuleiro do jogo Acerte a Toupeira
 * Permite ao jogador escolher o número de linhas e colunas (mínimo 4 e máximo 64 buracos)
 * e gera o tabuleiro dinamicamente ao clicar no botão "INICIAR".
 */

function inicializarGrid() {
  // 1. Identificar o botão INICIAR
  const btnIniciar = Array.from(document.querySelectorAll('button')).find(
    btn => btn.textContent.trim().toUpperCase() === 'INICIAR'
  ) || document.querySelector('.cartao--estreito-jogo .botao') || document.querySelector('.botao');

  // 2. Identificar o container dos buracos
  const tabelaBuracos = document.querySelector('.tabela-buracos');

  // 3. Localizar os elementos de LINHAS, COLUNAS e MODOS
  const titulos = Array.from(document.querySelectorAll('.cartao--estreito-jogo h3.titulo--jogo'));

  let elLinhas = null;
  let cartaoLinhas = null;
  let elColunas = null;
  let cartaoColunas = null;
  let elModo = null;
  let cartaoModo = null;

  titulos.forEach((titulo) => {
    const texto = titulo.textContent.trim().toUpperCase();
    const cartao = titulo.nextElementSibling;
    const valor = cartao ? cartao.querySelector('.numero--info-jogo') : null;

    if (texto.includes('LINHA')) {
      elLinhas = valor;
      cartaoLinhas = cartao;
    } else if (texto.includes('COLUNA')) {
      elColunas = valor;
      cartaoColunas = cartao;
    } else if (texto.includes('MODO')) {
      elModo = valor;
      cartaoModo = cartao;
    }
  });

  // Fallbacks caso os títulos tenham textos diferentes
  if (!elLinhas || !elColunas) {
    const todosValores = document.querySelectorAll('.cartao--estreito-jogo .cartao--info-jogo .numero--info-jogo');
    const todosCartoes = document.querySelectorAll('.cartao--estreito-jogo .cartao--info-jogo');
    if (todosValores.length >= 2) {
      elLinhas = elLinhas || todosValores[0];
      cartaoLinhas = cartaoLinhas || todosCartoes[0];
      elColunas = elColunas || todosValores[1];
      cartaoColunas = cartaoColunas || todosCartoes[1];
    }
    if (todosValores.length >= 3) {
      elModo = elModo || todosValores[2];
      cartaoModo = cartaoModo || todosCartoes[2];
    }
  }

  // 4. Tornar os campos de LINHAS e COLUNAS interativos para o usuário poder escolher os valores
  function configurarCampoInterativo(cartao, elValor, nomeCampo, min = 1, max = 64) {
    if (!cartao || !elValor) return;

    cartao.style.cursor = 'pointer';
    cartao.title = `Clique para alterar o número de ${nomeCampo.toLowerCase()}`;
    elValor.style.cursor = 'pointer';

    cartao.addEventListener('click', () => {
      const valorAtual = elValor.textContent.trim() || '1';
      const entrada = prompt(`Escolha o número de ${nomeCampo.toLowerCase()} (mínimo ${min}, máximo ${max}):`, valorAtual);

      if (entrada === null) return; // Usuário cancelou

      const numero = parseInt(entrada.trim(), 10);
      if (isNaN(numero) || numero < min || numero > max) {
        alert(`Por favor, insira um valor válido entre ${min} e ${max} para as ${nomeCampo.toLowerCase()}.`);
        return;
      }

      elValor.textContent = numero;
    });
  }

  configurarCampoInterativo(cartaoLinhas, elLinhas, 'Linhas');
  configurarCampoInterativo(cartaoColunas, elColunas, 'Colunas');

  // Permitir alternar modo ao clicar no cartão de MODOS
  if (cartaoModo && elModo) {
    cartaoModo.style.cursor = 'pointer';
    cartaoModo.title = 'Clique para alternar o modo de jogo';
    cartaoModo.addEventListener('click', () => {
      const modoAtual = elModo.textContent.trim().toLowerCase();
      elModo.textContent = modoAtual.includes('class') ? 'Explosivo' : 'Classico';
    });
  }

  // 5. Função responsável por gerar o tabuleiro de buracos
  function gerarTabuleiro(linhas, colunas) {
    if (!tabelaBuracos) return;

    const totalBuracos = linhas * colunas;

    // Limpa os buracos existentes
    tabelaBuracos.innerHTML = '';

    // Atualiza a grade CSS de acordo com as linhas e colunas escolhidas
    tabelaBuracos.style.display = 'grid';
    tabelaBuracos.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;
    tabelaBuracos.style.gridTemplateRows = `repeat(${linhas}, 1fr)`;

    // Cria dinamicamente cada buraco
    for (let i = 0; i < totalBuracos; i++) {
      const buraco = document.createElement('div');
      buraco.classList.add('buraco');
      buraco.dataset.index = i;
      tabelaBuracos.appendChild(buraco);
    }
  }

  // Expõe a função globalmente para reutilização em outros scripts ou testes
  window.gerarTabuleiro = gerarTabuleiro;

  // 6. Evento do botão INICIAR
  if (btnIniciar) {
    btnIniciar.addEventListener('click', (evento) => {
      if (evento) evento.preventDefault();

      // Ler valores atuais dos elementos
      const linhas = elLinhas ? parseInt(elLinhas.textContent.trim(), 10) : 3;
      const colunas = elColunas ? parseInt(elColunas.textContent.trim(), 10) : 4;
      const totalBuracos = linhas * colunas;

      // Validação: Mínimo 4 e máximo 64 buracos no total
      if (isNaN(linhas) || isNaN(colunas) || linhas <= 0 || colunas <= 0 || totalBuracos < 4 || totalBuracos > 64) {
        alert(
          `Quantidade inválida! O número total de buracos deve ser no mínimo 4 e no máximo 64.\n` +
          `Configuração atual: ${linhas || 0} linhas × ${colunas || 0} colunas = ${isNaN(totalBuracos) ? 0 : totalBuracos} buracos.`
        );
        return;
      }

      // Gera o tabuleiro dinamicamente
      gerarTabuleiro(linhas, colunas);
    });
  }
}

// Inicialização segura
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarGrid);
} else {
  inicializarGrid();
}
