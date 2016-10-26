/*jshint esversion: 6 */
const browserify = require('browserify-middleware');
const babelify = require('babelify');
const express = require('express');
const Path = require('path');
const helpers = require('./serverHelpers.js');

const routes = express.Router();

const db = require('firebaseinitialize.js');
const usersRef = db.child('users');
const tourneysRef = db.child('tournaments');
const gamesRef = db.child('games');

routes.use( require('body-parser').json() );

// var knex = require('knex')({
//   client: 'postgresql',
//   connection: {
//     filename: '../knexfile.js'
//   }
// });

//
// Provide a browserified file at a specified path
//
routes.get('/app-bundle.js',
  browserify('./client/app.js', {
    transform: [ require('reactify') ]
  }));


// Home page
routes.get('/', function(req, res) {
  res.sendFile(Path.resolve('client/public/index.html'));
});


// **************************************************

  // NOTE: Routes for players

routes.get('/api/player', function(req, res) {
  helpers.getAllPlayers(req.query.tournament_players)
    .then(players => {
      res.status(200).send(players);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


routes.post('/api/player', function(req, res) {
  //Prevent server from posting blank usernames with this if statement
  if (req.body.username === '') {
    res.status(404).send('Cannot Insert Empty String Into Database');
  } else {
    helpers.makePlayer(req)
      .then(function(result) {
        res.status(201).send('Posted new user to the database');
      }).catch(function(err) {
        res.status(400).send('User already exists');
      });
  }
});


// **************************************************

  // NOTE: Routes for tournaments

routes.post('/api/tournaments', function(req, res) {
  var tourneyName = req.body.tournament_name;
  // To do validation on the name, and the amount of players in the tournament,
    // we need to check if the name is an empty string.
  if (tourneyName === '') {
    // If it is, send back a message to show the user the error.
    res.status(400).json({'message': 'IT\'S GOTTA HAVE A NAME!'});
  } else if (!req.body.enough) {
    // If we have passed the 'enough' boolean from the app as false,
      // then there are not enough players to make a tournament. Send back the message.
    res.status(400).json({'message': 'YOU CAN\'T JUST PLAY ALONE!'});
  } else {
    // Otherwise make the call for the query!
    helpers.makeTourney(tourneyName)//refactor to send tourney ID
      .then(function(response) {
        res.status(201).send(response);
      }).catch(function(err) {
        res.status(500).send(err);
      });
  }
});

routes.put('/api/tournaments', function(req, res) {

  helpers.setTournamentWinner(req.body.id, req.body.winner_id)
    .then(function(response) {
      res.sendStatus(202);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });

});

//NOTE: should be handled on the front end now with FIREBASE
//NOTE: REFACTOR, the below will only fetch ONGOING tournaments
routes.get('/api/tournaments', function(req, res) {

  // knex('tournaments').where('winner_id', null)
  // .orderBy('id', 'desc')
  // .then(function(data) {
    // res.send(data);
  // });
});


// **************************************************

  // NOTE: Routes for the games

routes.post('/api/games', function(req, res) {

  helpers.createGamesForTourney(req)
    .then(function(response) {//now getting the path to the data
      res.status(201).send(response);
    })
    .catch(function(err) {
      res.status(500).send('Error inserting games into database');
    });
});

//NOTE: should be handled on the front end now with FIREBASE
  // If a tournament_id is passed in as a query, just send the games in that tournament
  // If not, we send ALL the games in the DB
routes.get('/api/games', function(req, res) {
  // this will use the id from the query as the tournament id.
    // then fetch all games from the Database that have that tourneyId
  var tourneyId = req.query.tournament_id;

  // if the route was queried with a tournament_id, return the games of that tournament_id
  if (tourneyId) {
    console.log('tourney id in games get request:', tourneyId);
    // query the db here with the tourneyId
    // knex('games').where('tournament_id', tourneyId).then(function(response) {
    //   res.status(200).send(response);
    // }).catch(function(err) {
    //   res.status(500).send(err);
    // });
  } else {
    // query the db here for all games
    // knex.select().from('games').then(function(response) {
    //   res.status(200).send(response);
    // }).catch(function(err) {
    //   res.status(500).send(err);
    // });
  }
});

routes.put('/api/games', function(req, res) {

  helpers.updateGames(req)
    .then(function(response) {
      res.status(202).send('Successfully Updated Game Score');
    }).catch(function(err) {
      res.status(500).send('Failed to update scores in databse', err);
    });
});


// *******************************************

  // NOTE: Route for the table

routes.get('/api/table/', function(req, res) {

  helpers.getTable(req.query.id)
  .then(function(response) {
    res.status(200).send(response);
  }).catch(function(err) {
    res.status(500).send(err);
  });
});
// *******************************************
//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, '../client/public');
routes.use(express.static(assetFolder));


if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res) {
    res.sendFile( assetFolder + '/index.html' );
  });

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express();

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() );

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log('Listening on port', port);
}
else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
