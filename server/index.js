var browserify = require('browserify-middleware');
var babelify = require('babelify');
var express = require('express');
var Path = require('path');
var helpers = require('./serverHelpers.js');

var routes = express.Router();

routes.use( require('body-parser').json() );

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite3'
  }
});

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

// /api/player
// **************************************************
// GET request
routes.get('/api/player', function(req, res) {
  playerIds = req.params.playerIds;
  
  knex('players')
  .orderBy('id', 'desc')
  .then(function(data) {
    res.send(data);
  });
});

// GET request for when you are looking for a specific set of players

// routes.get('/api/selectplayers', function(req, res) {
//   playerIds = req.query.playerIds;
//   res.send()
// })


// POST request handler
routes.post('/api/player', function(req, res) {
  knex('players').insert({
    username: req.body.username
  }).then(function(result) {
    res.status(201).send('Posted new user to the database');
  }).catch(function(err) {
    res.status(400).send('User already exists');
  });
});


// **************************************************

// /api/tournaments
// TODO: GET, PUT (update with winner)
routes.post('/api/tournaments', function(req, res) {
  var tourneyName = req.body.tournament_name;

  knex('tournaments').insert({
    tournament_name: tourneyName
  }).then(function(response) {
    res.status(201).send(response);
  }).catch(function(err) {
    res.status(500).send(err, 'failed to post tournament');
  });

});

routes.put('/api/tournaments', function(req, res) {
  var tourneyId = req.body.id;

  var winnerName = req.body.winnerName;

  knex('players')
    .where('username', winnerName)
    .select('id')
    .then(function(winnerId) {
      knex('tournaments')
      .where('id', tourneyId)
      .update('winner', winnerId)
      .then(function(response) {
        res.status(202).send(response);
      })
      .catch(function(err) {
        res.status(500).send('Failed to update tournament winner:', err);
      });
    })
    .catch(function(err) {
      res.status(500).send('Failed to find user id:', err);
    });

});

//Note, the below will only fetch ONGOING tournaments
routes.get('/api/tournaments', function(req, res) {
  knex('tournaments').where('winner_id', null)
  .orderBy('id', 'desc')
  .then(function(data) {
    res.send(data);
  });
});
// **************************************************

// /api/games
// TODO: GET, PUT (update with score)
routes.post('/api/games', function(req, res) {

  // get the tourneyId from the request body
  var tourneyId = req.body.tourneyId;

  // get the players list from the request body
  var list = req.body.players;

  // run those through the createGamesForTourney function
  var games = helpers.createGamesForTourney(tourneyId, list);

  // insert the games array into the db
  knex('games').insert(games)
    .then(function(response) {
      res.status(201).send(response);
    })
    .catch(function(err) {
      res.status(500).send('Error inserting games into database');
    });
});

// NOTE: We need to update this to OPTIONALLY take a tournament_id query.
  // If a tournament_id is passed in as a query, just send the games in that tournament
  // If not, we send ALL the games in the DB
routes.get('/api/games', function(req, res) {
  // this will use the id from the query as the tournament id.
    // then fetch all games from the Database that have that tourneyId
  var tourneyId = req.query.tournament_id;
  console.log(req.query.tournament_id)
  // if the route was queried with a tournament_id, return the games of that tournament_id
  if (tourneyId) {
    // query the db here with the tourneyId
    knex('games').where('tournament_id', tourneyId).then(function(response) {
      res.status(200).send(response);
    }).catch(function(err) {
      res.status(500).send(err);
    });
  } else {
    // query the db here for all games
    knex.select().from('games').then(function(response) {
      res.status(200).send(response);
    }).catch(function(err) {
      res.status(500).send(err);
    });
  }
});

routes.put('/api/games', function(req, res) {
  //this will use the game id from the query as gameId.
  //then use knex to insert the player scores in the database that has that gameId
  //it will also update the status of the game in the database to disabled.
  // console.log(req)
  var gameId = req.body.id;
  var player1Score = req.body.player1_score;
  var player2Score = req.body.player2_score;
  var status = req.body.status;
  knex('games').where('id', gameId)
    .update('player1_score', player1Score)
    .update('player2_score', player2Score)
    .update('status', status)
    .then(function(response) {
      res.status(202).send('Successfully Updated Game Score');
    }).catch(function(err) {
      res.status(500).send('Failed to update scores in databse', err);
    });
});







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
