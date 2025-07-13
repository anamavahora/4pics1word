const levels = [
  {
    word: "cake",
    images: [
      "https://i.imgur.com/eKQ2Ghq.jpg",
      "https://i.imgur.com/zYIlgBl.jpg",
      "https://i.imgur.com/kz1hmHN.jpg",
      "https://i.imgur.com/Zb0d7h3.jpg"
    ]
  },
  {
    word: "fire",
    images: [
      "https://i.imgur.com/74kZxlO.jpg",
      "https://i.imgur.com/x4M7aGL.jpg",
      "https://i.imgur.com/EIV9oQQ.jpg",
      "https://i.imgur.com/oZXomxM.jpg"
    ]
  }
];

let currentLevel = 0;
let currentAnswer = "";
let selectedWord = "";

function loadLevel(levelIndex) {
  const level = levels[levelIndex];
  const images = level.images;
  selectedWord = level.word.toUpperCase();
  currentAnswer = "";

  for (let i = 0; i < 4; i++) {
    document.getElementById(`img${i + 1}`).src = images[i];
  }

  const letters = shuffleArray(generateLetters(selectedWord));
  const letterContainer = document.getElementById("letters");
  const answerDisplay = document.getElementById("answer");
  letterContainer.innerHTML = "";
  answerDisplay.innerText = "";

  letters.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = () => {
      if (currentAnswer.length < selectedWord.length) {
        currentAnswer += letter;
        answerDisplay.innerText = currentAnswer;
      }
    };
    letterContainer.appendChild(btn);
  });

  document.getElementById("message").innerText = "";
}

function backspace() {
  currentAnswer = currentAnswer.slice(0, -1);
  document.getElementById("answer").innerText = currentAnswer;
}

function submitAnswer() {
  if (currentAnswer === selectedWord) {
    document.getElementById("message").innerText = "🎉 Correct!";
    setTimeout(() => {
      currentLevel++;
      if (currentLevel < levels.length) {
        loadLevel(currentLevel);
      } else {
        document.getElementById("message").innerText = "🏆 You've completed all levels!";
        document.getElementById("letters").innerHTML = "";
      }
    }, 1000);
  } else {
    document.getElementById("message").innerText = "❌ Try again!";
  }
}

function generateLetters(word) {
  const extraLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let letters = word.split("");
  while (letters.length < 12) {
    const rand = extraLetters[Math.floor(Math.random() * extraLetters.length)];
    letters.push(rand);
  }
  return letters;
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

loadLevel(currentLevel);
