// Fun nerdy JS for interactivity

document.addEventListener('DOMContentLoaded', () => {
  // Easter egg: Konami code for a surprise
  const konamiCode = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'
  ];
  let input = [];
  window.addEventListener('keydown', (e) => {
    input.push(e.key);
    if (input.length > konamiCode.length) input.shift();
    if (input.join('') === konamiCode.join('')) {
      document.body.style.background = 'linear-gradient(90deg, #ff006e, #8338ec, #3a86ff)';
      alert('👾 Nerd mode activated! 👾');
    }
  });

  // Calculator logic
  if (document.getElementById('calculator-section')) {
    const display = document.getElementById('calc-display');
    const buttons = document.querySelectorAll('.calc-buttons button');
    let current = '';
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.textContent;
        if (val === '=') {
          try {
            current = eval(current).toString();
          } catch {
            current = 'Error';
          }
          display.value = current;
        } else if (val === 'C') {
          current = '';
          display.value = '';
        } else {
          current += val;
          display.value = current;
        }
      });
    });
  }
  // Show/hide calculator on Project 1 click/enter
  const project1 = document.getElementById('project1-card');
  const calcSection = document.getElementById('calculator-section');
  if (project1 && calcSection) {
    function toggleCalculator() {
      if (calcSection.style.display === 'block') {
        calcSection.style.display = 'none';
      } else {
        calcSection.style.display = 'block';
        calcSection.scrollIntoView({behavior: 'smooth'});
      }
    }
    project1.addEventListener('click', toggleCalculator);
    project1.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleCalculator();
      }
    });
  }
  // Game modal logic
  const project2 = document.getElementById('project2-card');
  const gameModal = document.getElementById('game-modal');
  const closeGameBtn = document.getElementById('close-game');
  const gameArea = document.getElementById('game-area');
  const gameSquare = document.getElementById('game-square');
  const gameScore = document.getElementById('game-score');
  const gameTimer = document.getElementById('game-timer');
  let score = 0;
  let timeLeft = 10;
  let gameInterval, timerInterval;

  function randomPosition() {
    const areaRect = gameArea.getBoundingClientRect();
    const maxX = areaRect.width - 40;
    const maxY = areaRect.height - 40;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    gameSquare.style.left = x + 'px';
    gameSquare.style.top = y + 'px';
  }
  function startGame() {
    score = 0;
    timeLeft = 10;
    gameScore.textContent = 'Score: 0';
    gameTimer.textContent = 'Time: 10';
    gameSquare.style.display = 'block';
    randomPosition();
    gameInterval = setInterval(randomPosition, 700);
    timerInterval = setInterval(() => {
      timeLeft--;
      gameTimer.textContent = 'Time: ' + timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }
  function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    gameSquare.style.display = 'none';
    gameScore.textContent = 'Final Score: ' + score;
    gameTimer.textContent = 'Game Over!';
  }
  gameSquare && gameSquare.addEventListener('click', () => {
    score++;
    gameScore.textContent = 'Score: ' + score;
    randomPosition();
  });
  if (project2 && gameModal) {
    function showGame() {
      gameModal.style.display = 'flex';
      startGame();
    }
    project2.addEventListener('click', showGame);
    project2.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') showGame();
    });
  }
  closeGameBtn && closeGameBtn.addEventListener('click', () => {
    gameModal.style.display = 'none';
    endGame();
  });
});
