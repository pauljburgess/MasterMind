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

let secretCode = [0, 0, 0, 0, 0];
let guessRow = [0, 0, 0, 0, 0] //Move to init function later?
const marker = []

/*----- state variables -----*/
let colourInHand;
let comparitor;
let guessIdx;
let decoded = false;
let guessCounter = 1;
let hardMode = false;

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


setSecretCode();


function resetGame() {
    guessRow = [0, 0, 0, 0, 0];
    secretCode = [0, 0, 0, 0, 0];
    resetGuessRowColours();
    setSecretCode();
    boardReset();
    replayBtn.style.visibility = 'hidden';
    winnerBanner.style.visibility = "hidden";
    selectLevel.style.visibility = "visible";
    guessCounter = 1;
}


function boardReset() {
    const clearEls = document.querySelectorAll('div.old-guess > div');
    const clearMarkerEls = document.querySelectorAll('div.markers > div');

    clearEls.forEach((el) => {
        el.removeAttribute("class");
    }
    )

    clearMarkerEls.forEach((el) => {
        el.removeAttribute("class");
    }
    )
}


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


function resetGuessRowColours() {
    guessRowIds.forEach((el) => {
        const guessRowEl = document.getElementById(`${el}`)
        guessRowEl.style.backgroundColor = 'transparent';
    })
}

function winner() {
    //https://www.freecodecamp.org/news/how-to-compare-arrays-in-javascript/
    if (guessRow.toString() === secretCode.toString()) {
        replayBtn.style.visibility = "visible";
        selEl.removeEventListener("click", colourSelect);
        guessEL.removeEventListener("click", placeToken);
        winnerBanner.style.visibility = "visible";
        guessEL.style.visibility = "hidden";
    }
}

function defeat() {
    if (guessCounter === 12 && guessRow.toString() !== secretCode.toString()) {
        replayBtn.style.visibility = "visible";
        selEl.removeEventListener("click", colourSelect);
        guessEL.removeEventListener("click", placeToken);
        defeatBanner.style.visibility = "visible";
        guessEL.style.visibility = "hidden";
    }
}


function results() {
    winner()
    compareCodes()
    fillRow()
    defeat()
    guessBtn.style.visibility = 'hidden';
    guessCounter += 1;
    colourInHand = 0;
    guessRow = [0, 0, 0, 0, 0]
    resetGuessRowColours()
}

