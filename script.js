// need to get access to div's in my grid
// and the score  board

const divSquares = document.querySelectorAll(".grid div");
const scoreBoard = document.querySelector("#result");

// global variables

const width = 15;
let shooterPositionIndex = 217;
let result = 0;
let direction = 1;


//set starting position of the aliens
const aliens = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

//functions to remove and add the alien styles
const addAlienClass = () => {
  for (let i = 0; i < aliens.length; i++) {
    divSquares[aliens[i]].classList.add("alienInvader");
  }
};
addAlienClass();
const removeAlienClass = () => {
  for (let i = 0; i < aliens.length; i++) {
    divSquares[aliens[i]].classList.remove("alienInvader");
  }
};

// add class to shooter
divSquares[shooterPositionIndex].classList.add("shooter");

//moving the shooter
// need to change index position when right or left arrow key is pressed
//need to remove then re add shooter class to new index position
const moveShooter = (event) => {
  divSquares[shooterPositionIndex].classList.remove("shooter");
  if (event.keyCode == "37" && shooterPositionIndex > 210) {
    shooterPositionIndex -= 1;
  } else {
    if (event.keyCode == "39" && shooterPositionIndex < 224)
      shooterPositionIndex += 1;
  }
  divSquares[shooterPositionIndex].classList.add("shooter");
};

const MoveAliensEdgeToEdge = () => {
  const rightEdge = aliens[aliens.length - 1] % width === 14;
  const leftEdge = aliens[0] % width === 0;
  //checking if hit the edge, if so add the width(15) so they drop down,
  // then depending on what side, change the direction
  if ((rightEdge && direction === 1) || (leftEdge && direction === -1)) {
    direction = width;
  } else {
    if (direction === width && rightEdge === true) {
      direction = -1;
    } else {
      if (direction === width && leftEdge === true) {
        direction = 1;
      }
    }
  }
  //loop to remove class then add the direction and then add the class to new location
  for (let i = 0; i < aliens.length; i++) {
    removeAlienClass();
  }
  for (let i = 0; i < aliens.length; i++) {
    aliens[i] += direction;
  }
  for (let i = 0; i < aliens.length; i++) {
    addAlienClass();
  }
};

// setInterval(MoveAliensEdgeToEdge, 500);

//decide game-over - NOT WORKING YET
// for (let i = 0; i < aliens.length; i++) {
//   if (aliens[i] === 100) console.log("hello");
//   clearInterval(moveAliens);
// }

// logic
// listens to anytime a key is pressed and runs the function
document.addEventListener("keydown", moveShooter);
