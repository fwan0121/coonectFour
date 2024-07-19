# Connect Four Game

This is a Connect Four game implemented in JavaScript using the Model-View-Controller (MVC) design pattern. The game allows two players to take turns dropping colored discs into a grid, with the objective of forming a horizontal, vertical, or diagonal line of four discs.

[Link](https://my-connectfour-production-861f880b6b83.herokuapp.com/)

[![image.png](https://i.postimg.cc/Mp8z5XYs/image.png)](https://postimg.cc/w70KTqZJ)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
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

2. Open your browser and navigate to `http://localhost:3000`.



## Testing


1. To run the unit tests, use the following command:
    ```bash
    npm test
    ```


2. To run end-to-end tests, use the following command:
    ```bash
    npm start

    // open separate terminal 
    npm run test:e2e
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

## Deployment

To deploy this application, we use Heroku and GitHub Actions for a CI/CD pipeline. The deployment process includes the following steps:

1. **Build** - Build the project

2. **Run Unit Tests** - Execute unit tests using Jest

3. **Deploy to Staging** - Deploy the built application to a staging environment on Heroku. The `ci.yml` GitHub Actions workflow handles this step.
[Staging](https://my-connectfour-staging-fb1eec8bb235.herokuapp.com/)

4. **Run End-to-End Tests** - Execute end-to-end tests using Playwright on the staging environment

5. **Deploy to Production** - If all tests pass, deploy the application to the production environment on Heroku.
[Production](https://my-connectfour-production-861f880b6b83.herokuapp.com/)


## Project Structure

```plaintext
public/
|-- css/
|-- src/
|   |-- connectFour.js
|   |--tests/e2e
|       |-- connectFour.test.js
|
|   |-- controllers/
|       |-- controller.js
|       |-- test/
|           |-- controller.test.js
|
|   |-- models/
|       |-- connectfour-model.js
|       |-- game-board.js
|       |-- game-config.js
|       |-- player.js
|       |-- test/
|           |-- connectfour-model.test.js
|           |-- game-board.test.js
|           |-- game-config.test.js
|
|   |-- views/
|       |-- game-view.js
|       |-- test/
|           |-- game-view.test.js
|
|-- index.html
|
|-- index.js

