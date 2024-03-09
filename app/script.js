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

/*----- cached elements  -----*/
const selEl = document.getElementById("selection");
const guessEL = document.getElementById("guess-row")

/*----- event listeners -----*/

const selection = selEl.addEventListener("click", colourSelect)
const place = guessEL.addEventListener("click", placeToken)

/*----- functions -----*/

function colourSelect(evt) {
    if (evt.target.id === 'selection') {
        let colourInHand = ''
    } else {
        let colourInHand = evt.target.id;
    
    console.log(colourInHand);
}}

function placeToken(evt) {
    console.log(evt.target);
}