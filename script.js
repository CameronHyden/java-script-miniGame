

// need to get access to div's in my grid
// and the score  board

const divSquares = document.querySelectorAll(".grid div");
const scoreBoard = document.querySelector("#result");
const resetButton = document.querySelector("#restart-button");
const startGameButton = document.querySelector("#start-button");
const shootButton = document.querySelector("#shooting-button");

const game = {
  shooterPositionIndex: 217,
  result: 0,
  bullet: null,
  firedBullets: [],
  aliens: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
  ],
  direction: 1,
  width: 15,

};

let timer;
//functions to remove and add the styles
const addAlienClass = () => {
  for (let i = 0; i < game.aliens.length; i++) {
    divSquares[game.aliens[i]].classList.add("alienInvader");
  }
};
addAlienClass();
const removeAlienClass = () => {
  for (let i = 0; i < game.aliens.length; i++) {
    divSquares[game.aliens[i]].classList.remove("alienInvader");
  }
};

addShooterClass = () =>{
  divSquares[game.shooterPositionIndex].classList.add("shooter");
}
addShooterClass()

removeShooterClass = () => {
  divSquares[game.shooterPositionIndex].classList.remove("shooter");
} 

addBulletClass = () =>{
  for (let i = 0; i < game.firedBullets.length; i++) {
    divSquares[game.firedBullets[i]].classList.add("bullet");
  }
}
removeBulletClass = () =>{
  for (let i = 0; i < game.firedBullets.length; i++) {
    divSquares[game.firedBullets[i]].classList.remove("bullet");
  }
}

//moving the shooter
const moveShooter = (event) => {
  removeShooterClass()
  if (event.keyCode == "37" && game.shooterPositionIndex > 210) {
    game.shooterPositionIndex -= 1;
  } else {
    if (event.keyCode == "39" && game.shooterPositionIndex < 224)
      game.shooterPositionIndex += 1;
  }
  addShooterClass();
};

const ifAliensHitTheEdge = () => {
  const rightEdge = game.aliens[game.aliens.length - 1] % game.width === 14;
  const leftEdge = game.aliens[0] % game.width === 0;
  //checking if hit the edge, if so add the width(15) so they drop down,
  // then depending on what side, change the direction
  if (
    (rightEdge && game.direction === 1) ||
    (leftEdge && game.direction === -1)
  ) {
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
};
//loop to remove class then add the direction and then add the class to new location
const moveAliens = () => {
  for (let i = 0; i < game.aliens.length; i++) {
    removeAlienClass();
    game.aliens[i] += game.direction;
    addAlienClass();
  }
};

const startAndEndGame = (event) => {
  startGameButton.disabled = true
  timer = setInterval(() => {
    ifAliensHitTheEdge();
    ifAliensReachEnd();
  }, 300);
};

const ifAliensReachEnd = () => {
  if (game.aliens[game.aliens.length - 1] >= 210) {
    clearInterval(timer);
    alert("GAME OVER");
  }
};

const shootBullet = (event) => {
  if (event.keyCode == "38") {
    game.bullet = game.shooterPositionIndex;
    game.firedBullets.push(game.bullet);
  }
};

const shootBulletPhone = () => {
    game.bullet = game.shooterPositionIndex;
    game.firedBullets.push(game.bullet);
  
};

const moveBulletArray = () => {
  for (let i = 0; i < game.firedBullets.length; i++) {
    removeBulletClass()
    game.firedBullets[i] -= game.width;
    addBulletClass()
  }
};
setInterval(moveBulletArray, 400);

const checkIfHit = () => {
  for (let i = 0; i < game.aliens.length; i++) {
    for (let j = 0; j < game.firedBullets.length; j++) {
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

const checkIfBulletLeftBoard = () => {
  for (let i = 0; i < game.firedBullets.length; i++) {
    if (game.firedBullets[i] < 15) {
      divSquares[game.firedBullets[i]].classList.remove("bullet");
      game.firedBullets.splice(i, 1);
    }
  }
};
setInterval(checkIfBulletLeftBoard, 40);

const restartTheGame = (event) =>{
  removeAlienClass()
  removeShooterClass()
  removeBulletClass()
  clearInterval(timer);
  game.aliens = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
  ]
  game.shooterPositionIndex = 217,
  game.result = 0,
  scoreBoard.innerHTML = game.result
  game.bullet = null
  game.firedBullets = []
  startGameButton.disabled = false
  addAlienClass()
  addShooterClass()
  
};

// logic
// listens to anytime a key is pressed and runs the function
document.addEventListener("keydown", moveShooter);
document.addEventListener("keydown", shootBullet);
resetButton.addEventListener("click", restartTheGame);
startGameButton.addEventListener("click", startAndEndGame);
shootButton.addEventListener("click", shootBulletPhone);