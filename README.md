# Connect Four Game

This is a Connect Four game implemented in JavaScript using the Model-View-Controller (MVC) design pattern. The game allows two players to take turns dropping colored discs into a grid, with the objective of forming a horizontal, vertical, or diagonal line of four discs.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Testing](#testing)
## Features

- Two-player gameplay
- Dynamic grid rendering
- Detects and announces the winner
- Allows resetting the game

## Testing

**Unit Tests (Jest)**

Unit tests are written for the models and controller to ensure the game logic is correctly implemented. The tests cover the following functionalities:

- Game configuration initialisation
- Game board setup and cell manipulation
- Player actions and state management
- Win condition detection


**Component Tests (Testing Library)**

Component tests are written for the game view to ensure the DOM updates correctly reflect the game state. These tests cover:

- Rendering the game board
- Updating the board with player moves
- Displaying game status messages
- Announcing the winner

**End-to-End Tests (Playwright)**
End-to-end tests are written to ensure the entire application works correctly from the user's perspective. These tests cover:

- Starting a new game
- Playing a complete game
- Resetting the game