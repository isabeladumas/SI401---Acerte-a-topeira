# 🔨 Acerte a Toupeira (Whac-a-Mole)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

Projeto final desenvolvido para a disciplina **SI401 - Programação Web**. Trata-se de uma plataforma online completa que recria o clássico jogo de Arcade "Acerte a Toupeira" (Whac-a-Mole), incluindo sistema de usuários, histórico de partidas e ranking global.

---

## 📋 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Membros do Grupo](#-membros-do-grupo)

---

## 🎯 Sobre o Projeto

O objetivo deste projeto foi aplicar os conhecimentos práticos de Front-end e Back-end adquiridos na disciplina. A plataforma permite que usuários se cadastrem, façam login e joguem partidas customizadas do jogo *Acerte a Toupeira*. Todo o processamento de regras do jogo e interações na tela ocorrem via **JavaScript (Front-end)**, enquanto a persistência de dados, autenticação de usuários e controle de sessões são gerenciados de forma nativa com **PHP e MySQL (Back-end)**, sem a utilização de frameworks.

Todos os códigos de marcação e estilo foram validados e aprovados pelos validadores oficiais do W3C.

---

## ✨ Funcionalidades

### 👤 Sistema de Usuários (Back-end)
* **Cadastro e Login:** Autenticação segura utilizando sessões em PHP. Apenas usuários logados podem jogar e visualizar rankings.
* **Perfil de Usuário:** Possibilidade de edição de informações de contato (Nome, Telefone, E-mail, Senha). CPF, Data de Nascimento e Username são imutáveis.
* **Histórico de Partidas:** Visualização completa das partidas anteriores jogadas pelo usuário (Data, Tamanho do Tabuleiro, Modalidade, Pontuação e Nível).
* **Ranking Global:** Tabela com os melhores jogadores da plataforma.

### 🎮 Gameplay (Front-end)
* **Tabuleiro Customizável:** O usuário define a dimensão do tabuleiro antes da partida (de 4 a 64 buracos).
* **Duas Modalidades de Jogo:**
  * **Clássica:** Acerte apenas as toupeiras que surgem aleatoriamente.
  * **Explosiva:** Toupeiras e Bombas surgem juntas. Acertar uma bomba penaliza o jogador e diminui a pontuação.
* **Dificuldade Progressiva:** Partidas divididas por níveis de duração fixa. A cada nível avançado, o tempo de exposição da toupeira na tela diminui.
* **Sistema de Progressão:** Para passar de nível, o jogador precisa atingir uma meta percentual (X%) de acertos com base na quantidade de toupeiras que surgiram naquele tempo.
* **Botão de Desistência:** Opção de encerrar a partida a qualquer momento e salvar a pontuação atual.

---

## 💻 Tecnologias Utilizadas

* **Front-end:**
  * HTML5 (Semântico e validado no W3C)
  * CSS3 (Estilização via arquivos externos, sem templates de terceiros)
  * JavaScript Vanilla (Manipulação do DOM, eventos temporizados `setTimeout`/`setInterval` e lógica do jogo)
* **Back-end:**
  * PHP (Puro, sem frameworks)
  * Gerenciamento de Sessões e Autenticação
* **Banco de Dados:**
  * MySQL / MariaDB

---

## 👥 Membros do Grupo
* Gabriel Hebert Reis de Oliveira - 178093
* Guilherme Barbosa de Brito - 294266
* Isabela Dumas de Sousa - 218680
* Kaio Vinicius da Silva - 268803
* Sofia Helena Sato - 207010
