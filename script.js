// need to get access to div's in my grid
// and the score  board

const divSquares = document.querySelectorAll(".grid div");
const scoreBoard = document.querySelector("#result");

const game = {
  shooterPositionIndex: 217,
  result: 0,
  bullet: null,
  firedBullets: [],
  bulletFired: false,
  aliens: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
  ],
  bullets: [],
  direction: 1,
  width: 15,
};

//functions to remove and add the alien styles
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

// add class to shooter
divSquares[game.shooterPositionIndex].classList.add("shooter");

//moving the shooter
const moveShooter = (event) => {
  divSquares[game.shooterPositionIndex].classList.remove("shooter");
  if (event.keyCode == "37" && game.shooterPositionIndex > 210) {
    game.shooterPositionIndex -= 1;
  } else {
    if (event.keyCode == "39" && game.shooterPositionIndex < 224)
      game.shooterPositionIndex += 1;
  }
  divSquares[game.shooterPositionIndex].classList.add("shooter");
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
  }
  for (let i = 0; i < game.aliens.length; i++) {
    game.aliens[i] += game.direction;
  }
  for (let i = 0; i < game.aliens.length; i++) {
    addAlienClass();
  }
};

const startAndEndGame = (event) => {
  if (event.keyCode == "32") {
    const timer = setInterval(() => {
      ifAliensHitTheEdge();
      aliensPosition();
      checkIfHit();
    }, 300);
    const aliensPosition = () => {
      if (game.aliens[game.aliens.length - 1] >= 210) {
        clearInterval(timer);
        alert("GAME OVER");
      }
    };
  }
};

const shootBullet = (event) => {
  if (event.keyCode == "38") {
    game.bullet = game.shooterPositionIndex;
    game.firedBullets.push(game.bullet);
  }
};

const moveBulletArray = () => {
  for (let i = 0; i < game.firedBullets.length; i++) {
    divSquares[game.firedBullets[i]].classList.remove("bullet");
  }
  for (let i = 0; i < game.firedBullets.length; i++) {
    game.firedBullets[i] -= game.width;
  }

  for (let i = 0; i < game.firedBullets.length; i++) {
    divSquares[game.firedBullets[i]].classList.add("bullet");
  }
};
setInterval(moveBulletArray, 400)

const checkIfHit = () => {
  for (let i = 0; i < game.aliens.length; i++){
    if (game.aliens[i] == game.firedBullets) {
      console.log("hello")
      divSquares[game.aliens[i]].classList.remove("alienInvader");
    }
  }
};


// logic
// listens to anytime a key is pressed and runs the function
document.addEventListener("keydown", startAndEndGame);
document.addEventListener("keydown", moveShooter);
document.addEventListener("keydown", shootBullet);

