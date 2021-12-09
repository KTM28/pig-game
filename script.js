'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const section0 = document.querySelector('.player--0');
const section1 = document.querySelector('.player--1');

// let scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;
let scores, currentScore, activePlayer, playing;

// Starting conditions //

// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;

  section0.classList.remove('player--winner');
  section1.classList.remove('player--winner');
  section0.classList.add('player--active');
  section1.classList.remove('player--active');
};

// calling the init function to start the game
init();

// Switch player Function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  section0.classList.toggle('player--active');
  section1.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `assets/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; // CHANGE LATER
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Holding score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the score of the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Else Switch to the next player
      switchPlayer();
    }
  }
});

// Start New Game
btnNew.addEventListener('click', init);
// btnNew.addEventListener('click', function () {
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   diceEl.classList.add('hidden');
//   current0El.textContent = 0;
//   current1El.textContent = 0;

//   // document
//   //   .querySelector(`.player--${activePlayer}`)
//   //   .classList.remove('player--winner');
//   section0.classList.remove('player--winner');
//   section1.classList.remove('player--winner');
//   section0.classList.add('player--active');
//   section1.classList.remove('player--active');

//   scores = [0, 0];
//   currentScore = 0;
//   activePlayer = 0;
//   playing = true;
// });
