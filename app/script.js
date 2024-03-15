/*----- constants -----*/
const colours = {
    Black: 'rgba(0, 0, 0, 1)',
    White: 'rgba(240, 240, 240, 1)',
    Brown: 'rgba(168, 140, 78, 1)',
    Red: 'rgba(217, 0, 0, 1)',
    Orange: 'rgba(255, 136, 0, 1)',
    Yellow: 'rgba(235, 238, 63, 1)',
    Green: 'rgba(33, 128, 82, 1)',
    Blue: 'rgba(30, 181, 227, 1)',
}

const guessRowIds = ['first', 'second', 'third', 'fourth', 'fifth'];

/*----- state variables -----*/
let colourInHand;
let comparitor;
let guessIdx;
let decoded = false;
let guessCounter = 1;
let hardMode = false;
let secretCode = [0, 0, 0, 0, 0];
let guessRow = [0, 0, 0, 0, 0];
let marker = [];

/*----- cached elements  -----*/
const selEl = document.getElementById("selection");
const guessEL = document.getElementById("guess-row");
const guessBtn = document.getElementById("guess-btn");
const prevGuesses = document.getElementById("old-guess");
const replayBtn = document.getElementById("replay-btn");
const winnerBanner = document.getElementById("winner");
const defeatBanner = document.getElementById("defeat");
const oldGuessEl = document.getElementById("old-guess");
const selectLevel = document.getElementById("level-selection");
const setBtn = document.getElementById("set-btn");
const guessedEls = document.querySelectorAll('div.old-guess > div');
const markerEls = document.querySelectorAll('div.markers > div');

/*----- event listeners -----*/
function clickColours() {
    selEl.addEventListener("click", colourSelect);
}

function clickGuess() {
    guessEL.addEventListener("click", placeToken);
}

guessBtn.addEventListener("click", results);
replayBtn.addEventListener("click", resetGame);
setBtn.addEventListener("click", setLevel);


/*----- functions -----*/

// This function sets the hardMode variable based on the player input.
// It is called when users click the 'Set' button.
// As this happens just before play begins, it also hides the level selection banner,
// reveals the guess row, and makes the guess row and colours clickable.
function setLevel() {
    if (document.querySelector('input[name="level"]:checked').value === 'easy') {
        hardMode = false
    } else if (document.querySelector('input[name="level"]:checked').value === 'hard') {
        hardMode = true
    }

    selectLevel.style.visibility = "hidden";
    guessEL.style.visibility = "visible";
    clickGuess();
    clickColours();
}

// This function sets the secret code by:
// Checking the secretCode array for 0s
// Generating a random number between 1-8 (inclusive)
// Checking if the number is already included in the array
// Finding the firt 0 in the array
// Changing that 0 to the new random number
function setSecretCode() {
    while (secretCode.includes(0)) {
        let random = (Math.floor(Math.random() * 8) + 1)
        if (!secretCode.includes(random)) {
            const zero = (el) => el < 1
            let firstZero = secretCode.findIndex(zero);
            secretCode[firstZero] = random
        }
    }
}

// Setting the secretCode on start-up
setSecretCode();


// This function sets the colourInHand variable (used to set background colours)
// and the comparitor variable (used for marking logic), based on the colour that
// the player selects. The opening if statement keep the parent div from being selected.
function colourSelect(evt) {
    if (evt.target.id === 'selection') {
        colourInHand = ''
    } else {
        colourInHand = colours[evt.target.id];
    }

    if (evt.target.id === 'Black') {
        comparitor = 1
    } else if (evt.target.id === 'White') {
        comparitor = 2
    } else if (evt.target.id === 'Brown') {
        comparitor = 3
    } else if (evt.target.id === 'Red') {
        comparitor = 4
    } else if (evt.target.id === 'Orange') {
        comparitor = 5
    } else if (evt.target.id === 'Yellow') {
        comparitor = 6
    } else if (evt.target.id === 'Green') {
        comparitor = 7
    } else if (evt.target.id === 'Blue') {
        comparitor = 8
    }
}

// This function takes the selected colour and changes the background colour of the guessRow 
// space that the player clicks on. It also places the comparitor variable (set when the player
// chose the colour) in the guessRow array. When that array no longer contains any 0s, the guess
// button will appear. The colourInHand and comparitor variables are reset.
function placeToken(evt) {
    const rowID = document.getElementById(evt.target.id);
    if (evt.target.id === "guess-row") {
        return
    } else {
        rowID.style.backgroundColor = colourInHand;
    }

    if (evt.target.id === 'first') {
        guessIdx = 0
    } else if (evt.target.id === 'second') {
        guessIdx = 1
    } else if (evt.target.id === 'third') {
        guessIdx = 2
    } else if (evt.target.id === 'fourth') {
        guessIdx = 3
    } else if (evt.target.id === 'fifth') {
        guessIdx = 4
    }

    guessRow[guessIdx] = comparitor

    if (!guessRow.includes(0)) {
        guessBtn.style.visibility = 'visible';
    }

    colourInHand = 0;
    comparitor = 0;
}

// When the player clicks the 'Guess' button, this function:
// Compares the guessRow to the secretCode 
// Checks for a winner
// Checks for defeat
// Fills the next row on the board and marks the guess
// Hides the guess button
// Adds 1 to the guessCounter
// Resets the guessRow array and the guessRow colours
function results() {
    compareCodes()
    winner()
    defeat()
    fillRow()
    guessBtn.style.visibility = 'hidden';
    guessCounter += 1;
    guessRow = [0, 0, 0, 0, 0]
    resetGuessRowColours()
}


// This function compares the guessRow and the secretCode and 
// fills the marker array with a 1, 2, or 3 based on if each element
// of the guessRow array is contained in the secretCode array, if the 
// index of the mutually contained elements match or not, or if the element
// is not there at all.
function compareCodes() {
    guessRow.forEach((el, idx) => {
        if (secretCode.includes(el) && idx === secretCode.indexOf(el)) {
            marker[idx] = 1
        } else if (secretCode.includes(el) && idx !== secretCode.indexOf(el)) {
            marker[idx] = 2
        } else {
            marker[idx] = 3
        }
    });
}

// This function checks to see if both the guessRow array and secretCode are
// exactly alike. If so, it:
// Displays the 'Replay' button
// Makes the guessRow and colour selection row unclickable
// Displays the winner banner
// Hides the guess row
// https://www.freecodecamp.org/news/how-to-compare-arrays-in-javascript/ was helpful in
// writing the comparison method.
function winner() {
    if (guessRow.toString() === secretCode.toString()) {
        replayBtn.style.visibility = "visible";
        selEl.removeEventListener("click", colourSelect);
        guessEL.removeEventListener("click", placeToken);
        winnerBanner.style.visibility = "visible";
        guessEL.style.visibility = "hidden";
    }
}

// This function checks for defeat (12 guesses and no solution)
// If this is reached this funtion:
// Displays the 'Replay' button
// Makes the guessRow and colour selection row unclickable
// Displays the winner banner
// Hides the guess row
function defeat() {
    if (guessCounter === 12 && guessRow.toString() !== secretCode.toString()) {
        replayBtn.style.visibility = "visible";
        selEl.removeEventListener("click", colourSelect);
        guessEL.removeEventListener("click", placeToken);
        defeatBanner.style.visibility = "visible";
        guessEL.style.visibility = "hidden";
    }
}

// This function iterates through the guessRow array and fills the next line
// on the board accordingly. It copies the colours of the tokens from the guessRow
// to the corresponding position on the board (by setting div classes), and adds the markers based on the 
// marker array that was filled with the compareCodes functions (again by setting div classes). 
// If the player selected hard mode, then the marker array will be sorted first.
function fillRow() {
    guessRow.forEach((el, idx) => {
        const guessTokenEl = document.getElementById(`OGT-${guessCounter}-${idx}`)
        guessTokenEl.className = `C-${el}`
    })

    if (hardMode === true) {
        const sortedMarkers = marker.toSorted();
        sortedMarkers.forEach((el, idx) => {
            const markTokenEl = document.getElementById(`MKT-${guessCounter}-${idx}`)
            markTokenEl.className = `M-${el}`;
        })
    } else if (hardMode === false) {
        marker.forEach((el, idx) => {
            const markTokenEl = document.getElementById(`MKT-${guessCounter}-${idx}`)
            markTokenEl.className = `M-${el}`;
        })
    }
}

// This function iterates through the guessRowIds array and
// resets the background colour of each div
function resetGuessRowColours() {
    guessRowIds.forEach((el) => {
        const guessRowEl = document.getElementById(`${el}`)
        guessRowEl.style.backgroundColor = 'transparent';
    })
}

// This function resets the game by:
// Setting the secretCode array back to all 0s
// Generating a new secretCode
// Clearing the board of all previous guesses
// Hiding the replay button
// Hiding the Winner and Defeat banners
// Revealing the level selection banner
// Reseting the guessCounter to 1
function resetGame() {
    secretCode = [0, 0, 0, 0, 0];
    setSecretCode();
    resetBoard();
    replayBtn.style.visibility = 'hidden';
    winnerBanner.style.visibility = "hidden";
    defeatBanner.style.visibility = "hidden";
    selectLevel.style.visibility = "visible";
    guessCounter = 1;
}

// This function clears the board of all previous guesses by removing 
// the classes asigned to the divs in the fillRow function.
function resetBoard() {
    guessedEls.forEach((el) => {
        el.removeAttribute("class");
    })

    markerEls.forEach((el) => {
        el.removeAttribute("class");
    })
}




















