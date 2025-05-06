
const questions = [
  { q: "Qual dos alimentos é mais rico em carboidratos?", a: "Arroz", options: ["Frango", "Arroz", "Queijo", "Ovo"] },
  { q: "Qual é a principal função dos carboidratos?", a: "Fornecer energia", options: ["Construção celular", "Fornecer energia", "Produzir hormônios", "Transporte de oxigênio"] },
  { q: "A glicose é um exemplo de:", a: "Monossacarídeo", options: ["Dissacarídeo", "Lipídio", "Monossacarídeo", "Polissacarídeo"] },
  { q: "Qual é um polissacarídeo importante encontrado nas plantas?", a: "Amido", options: ["Glicose", "Frutose", "Sacarose", "Amido"] },
  { q: "Qual destes não é um carboidrato?", a: "Colesterol", options: ["Glicogênio", "Lactose", "Colesterol", "Frutose"] },
  { q: "A celulose é encontrada em:", a: "Plantas", options: ["Animais", "Plantas", "Fungos", "Bactérias"] },
  { q: "O carboidrato de reserva dos animais é:", a: "Glicogênio", options: ["Celulose", "Amido", "Glicogênio", "Quitina"] },
  { q: "Qual açúcar está presente no leite?", a: "Lactose", options: ["Glicose", "Frutose", "Lactose", "Sacarose"] },
  { q: "A frutose é encontrada principalmente em:", a: "Frutas", options: ["Carnes", "Frutas", "Leite", "Grãos"] },
  { q: "O que são carboidratos simples?", a: "Açúcares com rápida digestão", options: ["Fibras vegetais", "Açúcares com rápida digestão", "Amidos complexos", "Proteínas solúveis"] },
  { q: "Excesso de carboidratos pode levar a:", a: "Aumento de peso", options: ["Perda muscular", "Anemia", "Aumento de peso", "Desidratação"] },
  { q: "Pães, massas e cereais são fontes de:", a: "Amido", options: ["Frutose", "Glicose", "Amido", "Lactose"] },
  { q: "Qual dos seguintes é um dissacarídeo?", a: "Sacarose", options: ["Glicose", "Amido", "Sacarose", "Celulose"] },
  { q: "Qual carboidrato é utilizado em soluções intravenosas?", a: "Glicose", options: ["Glicose", "Amido", "Frutose", "Celulose"] },
  { q: "Carboidratos são compostos por:", a: "Carbono, hidrogênio e oxigênio", options: ["Cálcio e fósforo", "Ácido e base", "Carbono, hidrogênio e oxigênio", "Proteínas e lipídios"] }
];

let questionIndex = 0;
let playerIndex = 0;
const numPlayers = 4;
let scores = Array(numPlayers).fill(0);
let currentQuestion = null;
let timer;
let countdown = 20;

const correctSound = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");
const wrongSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function startGame() {
  questionIndex = 0;
  playerIndex = 0;
  scores.fill(0);
  nextTurn();
  updateScoreTable();
}

function nextTurn() {
  if (questionIndex >= questions.length) {
    endGame();
    return;
  }

  currentQuestion = questions[questionIndex];
  document.getElementById('question').innerText = `Jogador ${playerIndex + 1}, sua vez!`;
  const playersDiv = document.getElementById('players');
  playersDiv.innerHTML = '';

  const player = document.createElement('div');
  player.className = 'player';
  player.innerHTML = `<h3>Jogador ${playerIndex + 1}</h3>
    <p>${currentQuestion.q}</p>
    <div id="options">
      ${shuffle(currentQuestion.options).map(opt =>
        `<button onclick="answer('${opt.replace(/'/g, "\\'")}')">${opt}</button>`).join('')}
    </div>
    <div class="score">Pontuação: <span id="score">${scores[playerIndex]}</span></div>
    <p id="timer">Tempo restante: ${countdown}s</p>`;
  playersDiv.appendChild(player);

  startTimer();
}

function startTimer() {
  clearInterval(timer);
  countdown = 20;
  document.getElementById("timer").innerText = `Tempo restante: ${countdown}s`;
  timer = setInterval(() => {
    countdown--;
    document.getElementById("timer").innerText = `Tempo restante: ${countdown}s`;
    if (countdown <= 0) {
      clearInterval(timer);
      answer(null);
    }
  }, 1000);
}

function answer(selected) {
  clearInterval(timer);
  if (selected === currentQuestion.a) {
    scores[playerIndex]++;
    correctSound.play();
    alert(`✅ Jogador ${playerIndex + 1} acertou!`);
  } else {
    wrongSound.play();
    alert(`❌ Jogador ${playerIndex + 1} errou!`);
  }

  playerIndex++;
  if (playerIndex >= numPlayers) {
    playerIndex = 0;
    questionIndex++;
  }
  updateScoreTable();
  setTimeout(nextTurn, 1000);
}

function endGame() {
  const maxScore = Math.max(...scores);
  const winners = scores.map((score, i) => score === maxScore ? i + 1 : null).filter(i => i !== null);
  let message = winners.length === 1
    ? `🎉 Fim do jogo! Jogador ${winners[0]} venceu com ${maxScore} ponto(s)!`
    : `🤝 Empate! Jogadores ${winners.join(", ")} com ${maxScore} ponto(s)!`;
  document.getElementById("question").innerText = message;
  document.getElementById("players").innerHTML = '';
  document.getElementById("nextBtn").innerText = "Reiniciar Jogo";
  document.getElementById("nextBtn").disabled = false;
}

function updateScoreTable() {
  const table = document.getElementById("scoreboard");
  if (!table) return;
  table.innerHTML = "<h2>Pontuação</h2>" + scores.map((score, i) =>
    `<p>Jogador ${i + 1}: ${score} ponto(s)</p>`).join("");
}


