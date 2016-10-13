# Game-Manager

Game Manager is an app for managing a local (offline) competition. Currently designed around FIFA (the video game, not the corrupt worldwide body responsible for managing the beautiful game known as, and rightfully called, football) with the intent of keeping records of players and handling the planning and organizing of round robin style tournaments between friends.

## Stack
  - database
    - sqlite
    - knex
  - node with express
  - deploy with heroku
  - react

# MVP Product backlog
  **_Always consider the scope_**
  - [ ] Landing Page
    - [ ] Create Tournament
      - [ ] Tournament Name Field
      - [ ] Existing players 'drop down', or other component to select people for the tournament.
      - [ ] Add person, field if not existing
      - [ ] "Added Players to tournament" Component
    - [ ] Current Tournament View
      - [ ] Current Table component
        - [ ] Player components (sorted by points, with Goal Differential as a tie breaker)
          - has all the players standing for current tournament
      - [ ] Games component
        - [ ] Game components
          - has player name, and game score
        - [ ] Current game component ?????
          - not sure how to fully implement the filling out the form to enter the game

## Stretch Goals

  - [ ] Player Stats Page
  - [ ] Make it pretty
  - [ ] Possible to create multiple tournaments without logins?
    - [ ] home page shows every tournament and expand on selection?
  - [ ] Login
    - [ ] Facebook?
      - [ ] Use person's facebook picture to create an avatar
    - [ ] Player portal
      - [ ] shows open tournaments, and past ones
      - [ ] shows personal stats
  - [ ] Brag on social
    - [ ] Facebook
    - [ ] Twitter
    - [ ] others?



### TODO
  - [ ] Define GET/POST paths and actions.
    - What is actually needed for each action.
    - [ ] Write tests for those paths and actions.
  - [ ] Create Database Schemas.
