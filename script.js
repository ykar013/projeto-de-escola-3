const boardSize = 30;
const playerCount = 6;
const positions = Array(playerCount).fill(0);
let currentPlayer = 0;

const questions = [
  {
    q: "Qual destes é um carboidrato simples?",
    options: ["Glicose", "Celulose", "Amido", "Proteína"],
    answer: "Glicose"
  },
  {
    q: "O que os carboidratos fornecem ao corpo?",
    options: ["Energia", "Vitaminas", "Hormônios", "Oxigênio"],
    answer: "Energia"
  },
  {
    q: "Qual é um exemplo de carboidrato complexo?",
    options: ["Frutose", "Amido", "Glicose", "Sacarose"],
    answer: "Amido"
  },
  {
    q: "Os carboidratos são formados por quais elementos?",
    options: ["C, H e O", "C, N e O", "H, O e P", "C, H e S"],
    answer: "C, H e O"
  },
  {
    q: "Qual destes alimentos é rico em carboidratos?",
    options: ["Pão", "Carne", "Queijo", "Ovo"],
    answer: "Pão"
  },
  {
    q: "Os carboidratos são armazenados no corpo na forma de:",
    options: ["Glicogênio", "Proteína", "Lipídios", "Vitaminas"],
    answer: "Glicogênio"
  }
];

const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");
const soundWin = document.getElementById("sound-win");

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    // Adiciona peças dos jogadores
    positions.forEach((pos, index) => {
      if (pos === i) {
        const piece = document.createElement("div");
        piece.classList.add("piece", `p${index + 1}`);
        cell.appendChild(piece);
      }
    });

    board.appendChild(cell);
  }
}

function nextQuestion() {
  document.getElementById("question-box").classList.remove("hidden");
  const q = questions[Math.floor(Math.random() * questions.length)];
  document.getElementById("question").textContent = q.q;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt === q.answer);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(correct) {
  document.getElementById("question-box").classList.add("hidden");

  if (correct) {
    soundCorrect.play();
    positions[currentPlayer] = Math.min(positions[currentPlayer] + 1, boardSize - 1);
  } else {
    soundWrong.play();
  }

  createBoard();

  if (positions[currentPlayer] === boardSize - 1) {
    soundWin.play();
    alert(`Jogador ${currentPlayer + 1} venceu!`);
    return;
  }

  currentPlayer = (currentPlayer + 1) % playerCount;
  document.getElementById("turn").textContent = `Vez do Jogador ${currentPlayer + 1} (${getPlayerColor(currentPlayer)})`;
}

function getPlayerColor(index) {
  return ["Vermelho", "Azul", "Verde", "Laranja", "Roxo", "Marrom"][index];
}

createBoard();
