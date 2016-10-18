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
  knex('players')
  .orderBy('id', 'desc')
  .then(function(data) {
    res.send(data);
  });
});

// POST request handler
routes.post('/api/player', function(req, res) {
  knex('players').insert({
    username: req.body.username
  }).then(function(result) {
    console.log(result);
    res.status(201).send('Posted new user to the database');
  }).catch(function(err) {
    res.status(400).send('User already exists');
  });
});


// **************************************************

// /api/tournaments
// TODO: GET, POST, PUT (update with winner)
  // NOTE: POST request handling should have access the new row created

// **************************************************

// /api/games
// TODO: GET, POST, PUT (update with score)
routes.post('/api/games', function(req, res) {

  // get the tourneyId from the request body
  var id = req.body.tourneyId;

  // get the players list from the request body
  var list = req.body.players;

  // run those through the createGamesForTourney function
  var games = helpers.createGamesForTourney(id, list);

  // insert the games array into the db
  knex('games').insert(games)
    .then(function(response) {
      res.status(201).send(response);
    })
    .catch(function(err) {
      res.status(400).send('Error inserting games into database');
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
