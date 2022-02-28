"use strict";

// need to get access to div's in my grid
// and the score  board
var divSquares = document.querySelectorAll(".grid div");
var scoreBoard = document.querySelector("#result");
var game = {
  shooterPositionIndex: 217,
  result: 0,
  bullet: null,
  firedBullets: [],
  bulletFired: false,
  aliens: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  bullets: [],
  direction: 1,
  width: 15
}; //functions to remove and add the alien styles

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
}; // add class to shooter


divSquares[game.shooterPositionIndex].classList.add("shooter"); //moving the shooter

var moveShooter = function moveShooter(event) {
  divSquares[game.shooterPositionIndex].classList.remove("shooter");

  if (event.keyCode == "37" && game.shooterPositionIndex > 210) {
    game.shooterPositionIndex -= 1;
  } else {
    if (event.keyCode == "39" && game.shooterPositionIndex < 224) game.shooterPositionIndex += 1;
  }

  divSquares[game.shooterPositionIndex].classList.add("shooter");
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
  }

  for (var _i = 0; _i < game.aliens.length; _i++) {
    game.aliens[_i] += game.direction;
  }

  for (var _i2 = 0; _i2 < game.aliens.length; _i2++) {
    addAlienClass();
  }
};

var startAndEndGame = function startAndEndGame(event) {
  if (event.keyCode == "32") {
    var timer = setInterval(function () {
      ifAliensHitTheEdge();
      aliensPosition();
    }, 300);

    var aliensPosition = function aliensPosition() {
      if (game.aliens[game.aliens.length - 1] >= 210) {
        clearInterval(timer);
        alert("GAME OVER");
      }
    };
  }
};

var shootBullet = function shootBullet(event) {
  if (event.keyCode == "38") {
    game.bullet = game.shooterPositionIndex;
    game.firedBullets.push(game.bullet);
  }
};

var moveBulletArray = function moveBulletArray() {
  for (var i = 0; i < game.firedBullets.length; i++) {
    divSquares[game.firedBullets[i]].classList.remove("bullet");
  }

  for (var _i3 = 0; _i3 < game.firedBullets.length; _i3++) {
    game.firedBullets[_i3] -= game.width;
  }

  for (var _i4 = 0; _i4 < game.firedBullets.length; _i4++) {
    divSquares[game.firedBullets[_i4]].classList.add("bullet");
  }
};

setInterval(moveBulletArray, 400);

var checkIfHit = function checkIfHit() {
  for (var i = 0; i < game.aliens.length; i++) {
    if (game.aliens[i] === game.firedBullets) {
      divSquares[game.firedBullets].classList.remove("bullet");
    }
  }
};

setInterval(checkIfHit, 100); // logic
// listens to anytime a key is pressed and runs the function

document.addEventListener("keydown", startAndEndGame);
document.addEventListener("keydown", moveShooter);
document.addEventListener("keydown", shootBullet); // const moveBullet = () => {
//   divSquares[game.bullet].classList.remove("bullet");
//   game.bullet -= game.width;
//     divSquares[game.bullet].classList.add("bullet");
// };
// moveBullet()
// }