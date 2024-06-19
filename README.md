# Connect Four Game

This is a Connect Four game implemented in JavaScript using the Model-View-Controller (MVC) design pattern. The game allows two players to take turns dropping colored discs into a grid, with the objective of forming a horizontal, vertical, or diagonal line of four discs.

[![image.png](https://i.postimg.cc/Mp8z5XYs/image.png)](https://postimg.cc/w70KTqZJ)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)

## Features

- Two-player gameplay
- Dynamic grid rendering
- Detects and announces the winner
- Allows resetting the game
- Accessibility features for keyboard navigation and interactions:
  - Navigate the grid using arrow keys
  - Drop discs using the Enter key
  - Visual highlighting of the current column during navigation

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/connect-four.git
    cd connect-four
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:1234`.



## Testing


1. To run the unit tests, use the following command:
    ```bash
    npm test
    ```


2. To run end-to-end tests, use the following command:
    ```bash
    npm test
    ```

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


## Project Structure

```plaintext
src/
|-- controllers/
|   |-- controller.js
|   |-- test/
|       |-- controller.test.js
|
|-- models/
|   |-- connectfour-model.js
|   |-- game-board.js
|   |-- game-config.js
|   |-- player.js
|   |-- test/
|       |-- connectfour-model.test.js
|       |-- game-board.test.js
|       |-- game-config.test.js
|
|-- views/
|   |-- game-view.js
|   |-- test/
|       |-- game-view.test.js
|-- connectFour.js
|-- connectFour.test.js
|-- index.html
|-- styles.css
