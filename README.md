# Game-Manager

Game Manager is an app for managing a local (offline) competition. Currently designed around FIFA (the video game, not the corrupt worldwide body responsible for managing the beautiful game known as, and rightfully called, football) with the intent of keeping records of players and handling the planning and organizing of round robin style tournaments between friends.

## Stack
  - Database
    - We used knex with sqlite3 to build our database
    - The database has three tables currently
      - Games
        - Holds every game ever played!
        - Every game has a Foreign Key to each player, and the the tournament it is in
      - Players
        - Basic username and ID table
      - Tournaments
        - Holds the Tournament name, ID, and the winner of that tournament
  - Express on Node
    - Our server is running express for easy route handling because.. what else would you do?
  - React
    - The front end is handled with React and a list of components and what they do in the app is below
  - Deploy with Heroku


## React Components

# MVP Product backlog
  **_Always consider the scope_**
  - [x] Landing Page
    - [x] Create Tournament
      - [x] Tournament Name Field
      - [x] Existing players 'drop down', or other component to select people for the tournament.
      - [x] Add person, field if not existing
      - [x] "Added Players to tournament" Component
    - [ ] Current Tournament View
      - [] Current Table component
        - [ ] Player components (sorted by points, with Goal Differential as a tie breaker)
          - has all the players standing for current tournament
      - [x] Games component
        - [x] Game components
          - [x] has player name, and game score
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
