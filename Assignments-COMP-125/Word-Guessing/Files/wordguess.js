"use strict";

const words = [
  "House",
  "Job",
  "Business",
  "Food",
  "Restaurant",
  "Telephone",
  "Address",
  "Money",
  "Friend",
  "Love",
  "Happy",
  "Angry",
  "Excited",
  "Tired",
]; // Array of Random Words
var currentWord; // Store current word

// Various elements
var wordDiv = document.getElementById("word");
var inputBox = document.getElementById("letter");
var startButton = document.getElementById("startGame");
var msgBox = document.getElementById("msgBox");

var correctLetters = 0; // Track how many correct letters there are

function startGame() {
  inputBox.style.display = "block"; // Show Inputbox
  wordDiv.innerHTML = ""; // Clear the word
  msgBox.innerHTML = ""; // Clear the message box
  inputBox.disabled = false; // Enable inputbox
  inputBox.focus(); // Focus input box
  currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase(); // Set current word to guess
  correctLetters = 0; // Reset correctLetters

  console.log(currentWord);
  
  // Create elements for each letter and placing a * in it
  for (let i = 0; i < currentWord.length; i++) {
    var letterDiv = document.createElement("div");
    letterDiv.innerHTML =
      '<div class="wordBox-letter">*</div><div class="wordBox-line"></div>';
    letterDiv.className = "wordBox";
    wordDiv.appendChild(letterDiv);
  }
}

/* Event Listeners -- DO NOT REMOVE THIS */
startButton.addEventListener("click", startGame); // Starting game by clicking the start button

var letterAdded = [];
var count = 0;
var countEqualLetter = 0;
inputBox.addEventListener("input", function(){
  
  let letter = document.getElementById("letter").value.toUpperCase();
  let timeVar = window.setTimeout(checkLetter, 300);
  
  console.log("letter typed: "+letter);

  function checkLetter(){
    document.getElementById("letter").value = "";
    
    for (let i = 0; i < currentWord.length; i++) {
      if (letter === currentWord[i]){
        var rightLetter = document.getElementsByClassName("wordBox")[i];
        rightLetter.innerHTML = '<div class="wordBox-letter">'+letter+'</div><div class="wordBox-line"></div>';
        countEqualLetter ++;
        }
      };

      if (!letterAdded.includes(letter)){
           letterAdded.push(letter);
           console.log("list = " + letterAdded);
           if(rightLetter !== '<div class="wordBox-letter">*</div><div class="wordBox-line"></div>'){
               count=count+countEqualLetter;
           }
      }

    countEqualLetter=0;
    console.log("length word =" + currentWord.length);
    console.log("count= " + count);
    if ( count === currentWord.length) {
      let msgDisplay = document.createElement("p");
      msgDisplay.innerHTML = "You guessed the word "+ currentWord +" correctly!";
      msgBox.appendChild(msgDisplay);
      letterAdded = [];
      count = 0;
    };
  };
});



/*Requirements:

When you enter a letter, make sure it stays for 300ms before it calls the eventListener
When a word is fully guessed, the msgBox will display ‘You guessed the word <WORD> correctly!”
The inputBox will get disabled when the word is guessed correctly.


Hints:

Handle words that have the same letter twice correctly (e.g. Food)
Handle casing correctly. If someone guesses with a lowercase letter or uppercase it should still work. 
*/