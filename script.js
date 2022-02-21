// need to get access to div's in my grid
// and the score  board

const divSquares = document.querySelectorAll(".grid div");
const scoreBoard = document.querySelector("#result");

// global variables
//I need to define length of the board, my shooter, the aliens and result

const width = 15;
let shooterPositionIndex = 217;
let result = 0;
let direction = 1;

const rightEdge = [
  14, 29, 44, 59, 74, 89, 104, 119, 134, 149, 164, 179, 194, 209, 224,
];

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

// moving the aliens
// todo --- get the aliens moving side to side
const moveAliens = () => {
  removeAlienClass();

  for (let i = 0; i < aliens.length; i++) {
    aliens[i] += direction;
  }
//   for(let i = 0; i< aliens.length -i; i++){
//     if (aliens[i] == rightEdge){
//         console.log("i hit the right edge")
//     }
//   }
  addAlienClass();
};

// // calling this function every 500milliseconds
// setInterval(moveAliens, 500)


//decide game-over
for (let i = 0; i < aliens.length; i++) {
if (aliens[i] === 100)
    console.log("hello")
    clearInterval(moveAliens);
} 


// logic
// listens to anytime a ket is pressed and runs the function
document.addEventListener("keydown", moveShooter);
