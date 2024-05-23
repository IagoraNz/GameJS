# 📄 JavaScript running: snake game
This JavaScript script is a snake game implemented in a <canvas> element, where the user controls a snake to eat food and earn points. The game includes features such as score, high score, menu screen and sound effects, while challenging the player to avoid collisions with the walls of the canvas and their own body.

## :link: Development environment
1. JavaScript
```
v18.18.0
```
2. Visual Studio Code
```
1.89.1
```

## :link: Purpose and description
The JavaScript script presents the structure and functionalities of a snake game implemented in a <canvas> element, providing an interactive experience for the user. It starts with configuring the canvas and 2D context for graphic design, in addition to selecting relevant HTML elements, such as the score, the maximum score, the final score, the menu screen and the play button. Sound effects are also included through a new audio element.

The game is configured with parameters such as the size of the square and the initial position of the snake, represented by an array that stores the X and Y coordinates. The increase in score is managed by the incrementScore() function, while the updateHighScore() function updates the maximum record achieved. The gameOver() function is triggered when a collision occurs, updating the record and displaying the menu screen.

The script uses helper functions to generate random numbers for the position and color of the food, as well as to check for collisions and move the snake. A grid is drawn on the canvas to improve game visualization. The main loop (gameLoop()) controls scene updates and snake movements, while keyboard events allow the player to control the snake's direction.

When you click the play button, the game restarts, resetting the score and hiding the menu screen. These elements combined create an immersive and interactive gaming experience within the browser.
