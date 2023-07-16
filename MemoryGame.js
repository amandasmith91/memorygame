const gameContainer = document.getElementById("game");

let choice1 = null;
let choice2 = null;
let choicesMade = 0;
let canPlay = false;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (canPlay) return;
  if (event.target.classList.contains("chosen")) return;

  let cardChoice = event.target;
  cardChoice.style.backgroundColor = cardChoice.classList[0];

  if (!choice1 || !choice2) {
    cardChoice.classList.add("chosen");
    choice1 = choice1 || cardChoice;
    choice2 = cardChoice === choice1 ? null : cardChoice;
  }

  if (choice1 && choice2) {
    canPlay = true;
    let meme1 = choice1.className;
    let meme2 = choice2.className;

    if (meme1 === meme2) {
      choicesMade += 2;
      choice1.removeEventListener ("click", handleCardClick);
      choice2.removeEventListener("click", handleCardClick);
      choice1 = null;
      choice2 = null;
      canPlay = false;
    } else {
      setTimeout(function() {
        choice1.style.backgroundColor = "";
        choice2.style.backgroundColor = "";
        choice1.classList.remove("chosen");
        choice2.classList.remove("chosen");
        choice1 = null;
        choice2 = null;
        canPlay = false;
      }, 1000);
    }

  }
  if (choicesMade === COLORS.length) alert("YA DONE!");
  
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);


