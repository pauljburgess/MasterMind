/*----- constants -----*/

const colours = {
    Black : 'rgba(0, 0, 0, 1)',
    White : 'rgba(240, 240, 240, 1)',
    Brown : 'rgba(168, 140, 78, 1)',
    Red : 'rgba(217, 0, 0, 1)',
    Orange : 'rgba(255, 136, 0, 1)',
    Yellow : 'rgba(235, 238, 63, 1)',
    Green: 'rgba(33, 128, 82, 1)',
    Blue : 'rgba(30, 181, 227, 1)',
}

const guessRowIds = ['first', 'second', 'third', 'fourth', 'fifth'];

let codeToGuess = [0, 0, 0, 0, 0];
let guessRow = [0, 0, 0, 0, 0] //Move to init function later?
const marker = []

/*----- state variables -----*/
let colourInHand;
let comparitor;
let guessIdx;
let decoded = false;
let divIdMarker1 = 1;
let divIdMarker2 = 1;

/*----- cached elements  -----*/
const selEl = document.getElementById("selection");
const guessEL = document.getElementById("guess-row");
const guessBtn = document.getElementById("guess-btn");
const prevGuesses = document.getElementById("old-guess");
const replayBtn = document.getElementById("replay-btn")

/*----- event listeners -----*/

selEl.addEventListener("click", colourSelect)
guessEL.addEventListener("click", placeToken)
guessBtn.addEventListener("click", results)
replayBtn.addEventListener("click", resetGame)

/*----- functions -----*/

//Sets random code with no duplicates by:
//Generating a random number between 1-8 inclusive
//If that number is not included in the codeToGuess array,
//it finds the first 0 in the array and sets that zero to the random number.
//It continues to do this while the codeToGuess array contains zeroes
function setSecretCode() {
    while (codeToGuess.includes(0)) {
        let random = (Math.floor(Math.random() * 8) + 1)
        if (!codeToGuess.includes(random)) {
            const zero = (el) => el < 1
            let firstZero = codeToGuess.findIndex(zero);
            codeToGuess[firstZero] = random
            }
        } 
    }
setSecretCode();

function resetGame() {
    guessRow = [0, 0, 0, 0, 0];
    console.log(guessRow);
    resetGuessRowColours();
    setSecretCode();
    removeOldGuesses();
    console.log(codeToGuess);
    replayBtn.style.visibility = 'hidden';
}

//https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
function removeOldGuesses() {
    while (prevGuesses.firstChild){
        prevGuesses.removeChild(prevGuesses.lastChild);
    }
}


function colourSelect(evt) {
    if (evt.target.id === 'selection') {
        colourInHand = ''
    } else {
        colourInHand = colours[evt.target.id];   
    }

    //Set the number to push into the guessRow array
    if (evt.target.id === 'Black') {
        comparitor = 1
    } else if (evt.target.id === 'White'){
        comparitor = 2
    } else if (evt.target.id === 'Brown'){
        comparitor = 3
    } else if (evt.target.id === 'Red'){
        comparitor = 4
    } else if (evt.target.id === 'Orange'){
        comparitor = 5
    } else if (evt.target.id === 'Yellow'){
        comparitor = 6
    } else if (evt.target.id === 'Green'){
        comparitor = 7
    } else if (evt.target.id === 'Blue'){
        comparitor = 8
    }
}

function placeToken(evt) {
    const rowID = document.getElementById(evt.target.id);
    if (evt.target.id === "guess-row"){
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

}

function compareCodes() {
    guessRow.forEach((el, idx) => {
         if(codeToGuess.includes(el) && idx === codeToGuess.indexOf(el)){
            marker[idx] = 1
         } else if (codeToGuess.includes(el) && idx !== codeToGuess.indexOf(el)) {
            marker[idx] = 2
         } else {
            marker[idx] = 3
         }
        });
}

function createPreviousGuessDivs() {
    guessRow.forEach((el) => {
        const guessToken = document.createElement("div")
        document.getElementById(`A-${divIdMarker1}`).appendChild(guessToken).className = `C-${el}`;
    });
}

function createMarkerDivs() {
    marker.forEach((el) => {
        const markerToken = document.createElement("div")
        document.getElementById(`B-${divIdMarker2}`).appendChild(markerToken).className = `M-${el}`;
    });
}


function resetGuessRowColours() {
    guessRowIds.forEach((el) => {
        const guessRowEl = document.getElementById(`${el}`)
        guessRowEl.style.backgroundColor = 'transparent';
    })
}

function winner() {
    if (guessRow.toString() === codeToGuess.toString()){
        replayBtn.style.visibility = "visible"     
    } 

}



function results() {
    //https://www.freecodecamp.org/news/how-to-compare-arrays-in-javascript/
    winner()
    compareCodes()

    const oldGuess = document.createElement("div")
    oldGuess.setAttribute("id", `A-${divIdMarker1}`)
    document.getElementById("old-guess").appendChild(oldGuess).className = "prev-guess";

    const markers = document.createElement("div")
    markers.setAttribute("id", `B-${divIdMarker2}`)
    document.getElementById("old-guess").appendChild(markers).className = "markers";

    createPreviousGuessDivs();
    createMarkerDivs();

    guessBtn.style.visibility = 'hidden';

    divIdMarker1 += 1;
    divIdMarker2 += 1;

    colourInHand = 0;
    
    guessRow = [0, 0, 0, 0, 0]
    resetGuessRowColours()
}

