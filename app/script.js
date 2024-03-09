/*----- constants -----*/

const colours = [
    {Black : 'rgba(0, 0, 0, 1)'},
    {White : 'rgba(240, 240, 240, 1)'},
    {Brown : 'rgba(168, 140, 78, 1)'},
    {Red : 'rgba(217, 0, 0, 1)'},
    {Orange : 'rgba(255, 136, 0, 1)'},
    {Yellow : 'rgba(235, 238, 63, 1)'},
    {Green: 'rgba(33, 128, 82, 1)'},
    {Blue : 'rgba(30, 181, 227, 1)'},
]

/*----- state variables -----*/
let colourInHand;
let comparitor;
let guessIdx;
let guessRow = [0, 0, 0, 0, 0] //Move to init function later?
let codeToGuess = [0, 0, 0, 0, 0];



/*----- cached elements  -----*/
const selEl = document.getElementById("selection");
const guessEL = document.getElementById("guess-row")

/*----- event listeners -----*/

const selection = selEl.addEventListener("click", colourSelect)
const place = guessEL.addEventListener("click", placeToken)

/*----- functions -----*/
function setSecretCode() {
    for (i=0; i<5; i++) {
        let random = Math.floor(Math.random() * 7)
        codeToGuess[i] = random;
    }
    console.log(codeToGuess);
}

setSecretCode();

function colourSelect(evt) {
    if (evt.target.id === 'selection') {
        colourInHand = ''
    } else {
        colourInHand = evt.target.id;   
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
        document.getElementById("guess-btn").style.visibility = 'visible';
    }
}