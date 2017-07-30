# FloScoreBoard

<img src="./images/flosports-logo.png" alt="FloSports" style="width: 200px;"/>
-----
<br />
<br />

In the **Edit Scores** tab, FloScoreBoard allows you to create matchups between two teams, assigning a name and color to each. Once you start the match clock, you can increment each team's score while the clock is running (the clock can be paused). Once the clock hits zero, the match is final and scores may no longer be updated.

The **Scoreboard** Tab displays all matchups in a non-editable board.

### Technologies:

- AngularJS 1.6.5
- Firebase 3.9.0

### Usage:

- _npm start_ to run the application locally
- _npm test_ to run the Karma+Jasmine test suite

### ToDo:

- [] Fix refresh loop when coming back to the app
- [] create registration component
- [] add title to login form 
- [] complete 'Final' label logic
- [] filter scoreboard on final/active matches
- [] set team color to bg color on scoreboard
- [] make sure to destroy $watches