# Game Manager notes

  - Order priorities for the MVP
    - server
    - database
    - front end framework
    - API??

  - Team roles
    - Product Owner
      - Brett
    - Scrum Master
      - Calvin
  - Brett, Calvin, Christian, Zach.

----------------------------------------------------------------------

## Bracket Manager

  - Home page
    - create tourny
      - Tournament Name
      - existing players drop down
        - show players in the database
        - select to enter into tourny
        - any player can only be in the tourny once
        - way to delete from tourny
    - current tourny
      - Highlighted current game
      - shows all games
        - Pull with the current tourny id
        - shows games played with score
      - shows table with live standings
      -
    -

---------------------------------------------------------------------

## Stack
    - database
      - sqlite
      - knex
    - node with express
    - deploy with heroku
    - react

------------------------------------------------------------------

## Color Palate

### Option 1

  light blue: #02AAE9
  dark blue: #1A356C
  red: #F44B1A
  beige: #E5C39E
  bluegrey: #C3CED0

### Option 2

  Green #8ab056
  beige #f3ddc0
  brown #705a3a
  dark #201a03

### Option knock off fifa

  yellow #FAD817
  Grey #1E2329
  gold #D6BC6F


---------------------------------------------------------------------

## Project Management Tools

  github:issues
  pivotalTracker
  waffle.io
    ties into github:issues
    to do | doing | done

____________________________________________________________________

## Routes

  - /api/player
    - GET
    - POST
  - /api/tournament
    - GET
    - POST
    - PUT (update with winner)
  - /api/games
    - GET
    - POST
    - PUT (update with score);

______________________________________________________________________

## Features

### Landing/Create Page
  - Add Player
    - Form for text input
    - player name should be unique in DB
    - on submit make post request to server
      - query DB to add
      - should return error if already in DB
  - Players list in create page (in DB)
    - on load GET request to server
      - queries the DB for all Players
      - map array of players (objects) into array of PlayerListItem Component
      - Click on PlayerListItem to add to tournament list
  - Players in tournament
    - Click on TournamentPlayersListItem to remove and add to Players list
  - Start tournament
    - click the button
      - POST request to server
        - runs the matchup builder algorithm
        - then inserts the games into the DB with 0-0 score
      - then mounts the Current tournament Component

### Current tournament
  - Current Game
    - Highlighted
    - shows input forms and submit button
    - click submit button
      - PUT request to the server
        - updates the game scores in the DB
        - and updates the Standings Table
  - Display Games
    - on mounting of the Current Tournament Component
      - GET request to server for games of tournament
      - and mounts all games to Games list
      - clicking on game set to be current game
  - Display table/standings
    - on mount,
      - show list of players in tournament
      - on current game submit
        - update the table
  - End tournament
    - click to end
      - set winner_ID
      - Congrats to winner!


#### Tournament Table
  - what happens
    - setCurrentTournament function makes an api call for the table data
      - The api call it takes a tourneyId as an argument
      - and returns a tableStats array with an object for each player
        - having the proper keys for all the data we want
      - then we set the currentTournamentTable to that array
