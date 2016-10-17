var browserify = require('browserify-middleware');
var babelify = require('babelify');
var express = require('express');
var Path = require('path');

var routes = express.Router();

var knex = require('knex')({
 client: 'sqlite3',
 connection: {
   filename: '../database.sqlite3'
 }
});

//
// Provide a browserified file at a specified path
//
routes.get('/app-bundle.js',
  browserify('./client/app.js', {
    transform: [ require('reactify') ]
  }));

// //
// // Example endpoint (also tested in test/server/index_test.js)
// //
// routes.get('/api/tags-example', function(req, res) {
//   res.send(['node', 'express', 'browserify', 'mithril']);
// });


// Home page
routes.get('/', function(req, res) {
  res.sendFile(path.resolve('client/public/index.html'));
});

// /api/player
// **************************************************
// GET request
routes.get('/api/player', function(req, res) {
  knex('players')
  .select()
  .table('players')
  .orderBy('id', 'desc')
  .then(function(data) {
    res.send(data);
  })
});

routes.post('/api/player', function(req, res) {
  knex('players').insert({
    username: req.body.username
  }).then(function(result) {
    console.log(result);
  })
})

// POST request 
routes.post('/api/player', function(req, res) {
  req.body.forEach(function(item) {
    knex('players').insert({
      username: item.username
    }).then(function(result) {
      console.log(result);
    });
  })

  res.sendStatus(200);
  console.log("Successful POST request");
});

// **************************************************

// /api/tournaments
// TODO: GET, POST, PUT (update with winner)

// /api/games
// TODO: GET, POST, PUT (update with score)



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
