# Mastermind Pseudocode
- When the game is loaded, the landing page will appear with a _play button_ linked to the game page

- When the play button is tapped, the game page will load _ready for a new game_ (empty board, clear first row, set new random sequence [init function])

- The coloured tokens along the bottom are selectable (_event listener_)

- Once a coloured token has been tapped, the four spaces on the guess row will become _clickable_, so that the player can place a _token of that colour_ in one of the four spots.

- Once a token has been placed on the guess row, two things will happen:
    1. The colour in hand will reset to no colour
    2. That colour of token will no longer be selectable in the selection row (this will avoid doubles being played)

- Players will be able to override tokens they have placed in the guess row

- _If_ all spaces are filled, the ‘guess’ button will appear

- When the player taps 'guess', the current guess will move above the guess row, and a marker will appear underneath each token, letting the player see if that token is the correct colour and in the right position (black), a correct colour but in the wrong position (red), or a wrong colour altogether (white)

- Each subsequent guess will push the previous guesses further up the screen (appendChild)

- Once the player has guessed the correct sequence, a banner will appear congratulating them.

- Different messages will appear depending on how many guesses it takes the player to guess the sequence (counter)




