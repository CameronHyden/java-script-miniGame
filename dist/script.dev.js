"use strict";

// need to get access to div's in my grid
// and the score  board
var divSquares = document.querySelectorAll(".grid div");
var scoreBoard = document.querySelector("#result");
var resetButton = document.querySelector("#restart-button");
var startGameButton = document.querySelector("#start-button");
var shootButton = document.querySelector("#shooting-button");
var game = {
  shooterPositionIndex: 217,
  result: 0,
  bullet: null,
  firedBullets: [],
  aliens: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  direction: 1,
  width: 15
};
var timer; //functions to remove and add the styles

var addAlienClass = function addAlienClass() {
  for (var i = 0; i < game.aliens.length; i++) {
    divSquares[game.aliens[i]].classList.add("alienInvader");
  }
};

addAlienClass();

var removeAlienClass = function removeAlienClass() {
  for (var i = 0; i < game.aliens.length; i++) {
    divSquares[game.aliens[i]].classList.remove("alienInvader");
  }
};

addShooterClass = function addShooterClass() {
  divSquares[game.shooterPositionIndex].classList.add("shooter");
};

addShooterClass();

removeShooterClass = function removeShooterClass() {
  divSquares[game.shooterPositionIndex].classList.remove("shooter");
};

addBulletClass = function addBulletClass() {
  for (var i = 0; i < game.firedBullets.length; i++) {
    divSquares[game.firedBullets[i]].classList.add("bullet");
  }
};

removeBulletClass = function removeBulletClass() {
  for (var i = 0; i < game.firedBullets.length; i++) {
    divSquares[game.firedBullets[i]].classList.remove("bullet");
  }
}; //moving the shooter


var moveShooter = function moveShooter(event) {
  removeShooterClass();

  if (event.keyCode == "37" && game.shooterPositionIndex > 210) {
    game.shooterPositionIndex -= 1;
  } else {
    if (event.keyCode == "39" && game.shooterPositionIndex < 224) game.shooterPositionIndex += 1;
  }

  addShooterClass();
};

var ifAliensHitTheEdge = function ifAliensHitTheEdge() {
  var rightEdge = game.aliens[game.aliens.length - 1] % game.width === 14;
  var leftEdge = game.aliens[0] % game.width === 0; //checking if hit the edge, if so add the width(15) so they drop down,
  // then depending on what side, change the direction

  if (rightEdge && game.direction === 1 || leftEdge && game.direction === -1) {
    game.direction = game.width;
  } else {
    if (game.direction === game.width && rightEdge === true) {
      game.direction = -1;
    } else {
      if (game.direction === game.width && leftEdge === true) {
        game.direction = 1;
      }
    }
  }

  moveAliens();
}; //loop to remove class then add the direction and then add the class to new location


var moveAliens = function moveAliens() {
  for (var i = 0; i < game.aliens.length; i++) {
    removeAlienClass();
    game.aliens[i] += game.direction;
    addAlienClass();
  }
};

var startAndEndGame = function startAndEndGame(event) {
  startGameButton.disabled = true;
  timer = setInterval(function () {
    ifAliensHitTheEdge();
    ifAliensReachEnd();
  }, 300);
};

var ifAliensReachEnd = function ifAliensReachEnd() {
  if (game.aliens[game.aliens.length - 1] >= 210) {
    clearInterval(timer);
    alert("GAME OVER");
  }
};

var shootBullet = function shootBullet(event) {
  if (event.keyCode == "38") {
    game.bullet = game.shooterPositionIndex;
    game.firedBullets.push(game.bullet);
  }
};

var shootBulletPhone = function shootBulletPhone() {
  game.bullet = game.shooterPositionIndex;
  game.firedBullets.push(game.bullet);
};

var moveBulletArray = function moveBulletArray() {
  for (var i = 0; i < game.firedBullets.length; i++) {
    removeBulletClass();
    game.firedBullets[i] -= game.width;
    addBulletClass();
  }
};

setInterval(moveBulletArray, 400);

var checkIfHit = function checkIfHit() {
  for (var i = 0; i < game.aliens.length; i++) {
    for (var j = 0; j < game.firedBullets.length; j++) {
      if (game.aliens[i] === game.firedBullets[j]) {
        divSquares[game.aliens[i]].classList.remove("alienInvader");
        game.aliens.splice(i, 1);
        divSquares[game.firedBullets[j]].classList.remove("bullet");
        game.firedBullets.splice(j, 1);
        game.result += 1;
        scoreBoard.innerHTML = game.result;
      }
    }
  }
};

setInterval(checkIfHit, 20);

var checkIfBulletLeftBoard = function checkIfBulletLeftBoard() {
  for (var i = 0; i < game.firedBullets.length; i++) {
    if (game.firedBullets[i] < 15) {
      divSquares[game.firedBullets[i]].classList.remove("bullet");
      game.firedBullets.splice(i, 1);
    }
  }
};

setInterval(checkIfBulletLeftBoard, 40);

var restartTheGame = function restartTheGame(event) {
  removeAlienClass();
  removeShooterClass();
  removeBulletClass();
  clearInterval(timer);
  game.aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
  game.shooterPositionIndex = 217, game.result = 0, scoreBoard.innerHTML = game.result;
  game.bullet = null;
  game.firedBullets = [];
  startGameButton.disabled = false;
  addAlienClass();
  addShooterClass();
}; // logic
// listens to anytime a key is pressed and runs the function


document.addEventListener("keydown", moveShooter);
document.addEventListener("keydown", shootBullet);
resetButton.addEventListener("click", restartTheGame);
startGameButton.addEventListener("click", startAndEndGame);
shootButton.addEventListener("click", shootBulletPhone);