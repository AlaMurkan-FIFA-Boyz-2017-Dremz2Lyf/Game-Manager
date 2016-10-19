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
| Component            	| Function                                                                                                                                                                                      	| "Parent View"                                                       	|
|----------------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|---------------------------------------------------------------------	|
| Main.jsx             	| Main is the overall app this is rendered from app.js.                                                                                                                                         	| I am your Father, luke.                                             	|
| AddPlayerForm        	| Add player form takes the input and adds it to the database. It makes a call to get all the players in the database and update the state with them on successful insertion into the database. 	| Main, Will only show if there is not a tournament running currently 	|
| AllPlayersList       	| This component renders all the existing players as they stand in state, it also passes the function to move between this list and the NewTournamentPlayers list down to the player components 	| Main, Will only show if there is not a tournament running currently 	|
| CurrentTournament    	| CurrentTournament renders the list of games for the current tournament                                                                                                                        	| Main, Will only show if in a tournament                             	|
| Game                 	| Game component represents a single game, has all the player info and score in them                                                                                                            	| CurrentTournament                                                   	|
| GameStatsForm        	| This will take the information for entering a finished game, and post it to the db.                                                                                                           	| CurrentTournament                                                   	|
| NewTournamentPlayers 	| NewTournamentPlayers shows the players that will be in the new tournament. Who knew!?                                                                                                         	| Main, Will only show if there is not a tournament running           	|
| Player               	| Player components have the click handler and player data tied to them.                                                                                                                        	| NewTournamentPlayers, or AllPlayerList                              	|
| StartTournament      	| This form takes the tournament name and creates a new tournament with that name. It also runs the match up algorithm to generate the games                                                    	| Main, Will only show if there is not a tournament running           	|

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
