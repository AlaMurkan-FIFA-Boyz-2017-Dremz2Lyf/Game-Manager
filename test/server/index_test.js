require(TEST_HELPER); // <--- This must be at the top of every test file.

var helpers = require(__server + '/serverHelpers.js');
var request = require('supertest-as-promised');
var routes = require(__server + '/index.js');

describe('The Server', function() {

  var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite3'
    }
  });

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();
  // Notice how these are generator functions (indicated by the the *)
  // See test/test-helper.js for details of why this works.
  // I (Scott) have no clue, but it seems to be working right now.......

  describe('Helper functions', function() {

    it_('Helper functions should be available', function * () {
      expect(helpers).to.exist;
    });

    describe('createGamesForTourney', function() {

      it_('helper should have a "createGamesForTourney" function', function * () {
        expect(helpers.createGamesForTourney).to.be.a('function');
      });

      it_('When called with a tournament id and array of player objects it should return an array of game objects', function * () {
        var tournamentId = 1;
        var playersList = Mock_Data.players;

        var result = helpers.createGamesForTourney(tournamentId, playersList);

        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('object');
        expect(result[0]).to.have.all.keys('player1_id', 'player2_id', 'tournament_id');
      });

    });
    describe('getTable', function() {

      it_('serverHelpers should have a getTable function', function * () {
        expect(helpers.getPlayer).to.be.a('function');
      });

      it_('When called with a list of player objects it should return the player object from the database', function * () {
        expect(helpers.getPlayer());
      });
    });


  });

  describe('Routes', function() {

    beforeEach(function() {
      knex.select().table('games').then(function(res) {
        console.log(res);
      });
      // knex.migrate.rollback();
      // knex.migrate.latest();

      var playerNames = Mock_Data.players.map(function(playerObj) {
        return {username: playerObj.username};
      });
      knex('players').insert(playerNames)
        .then(function(res) {
        })
        .catch(function(err) {
          // console.log('Error adding players to db', err);
        });

      var tourneyNames = Mock_Data.tournaments.map(function(tourney) {
        return {tournament_name: tourney.tournament_name};
      });
      knex('tournaments').insert(tourneyNames)
        .then(function(res) {
        })
        .catch(function(err) {
          // console.log('Error adding tournaments to db', err);
        });

      var games = Mock_Data.games.map(function(game) {
        return {player1_id: game.player1_id, player2_id: game.player2_id, tournament_id: game.tournament_id};
      });
      knex('games').insert(games)
        .then(function(res) {

        })
        .catch(function(err) {
          // console.log('Error adding games to db', err);
        });

    });

    describe('/api/games', function() {

      it_('Should be a route in the server', function * () {
        console.log('NOTE: The get all games route will be made when we want to make a player stats page');
        yield request(app)
        .get('/api/games')
        .expect(200);
      });

      it_('Should return an Array of objects when queried with a tournament_id', function * () {

        yield request(app)
        .get('/api/games?tournament_id=1')
        .expect(200)
        .expect(function(response) {
          expect(response.body).to.be.an('array');
          expect(response.body[0]).to.be.an('object');
        });
      });

    });

    describe('/api/games/table', function() {

      it_('Should be a route in the server', function * () {

        yield request(app)
        .get('/api/games/table')
        .expect(200);
      });

      it_('the response body should be an array of objects', function * () {

        yield request(app)
        .get('/api/games/table')
        .expect(200)
        .expect(function(response) {
          expect(response.body).to.be.an('array');
          expect(response.body[0]).to.be.an('object');
        });
      });

      it_('the objects in the return array should be properly formatted', function * () {

        yield request(app)
        .get('/api/games/table')
        .expect(200)
        .expect(function(response) {
          expect(response.body[0]).to.have.all.keys('playerId', 'gp', 'won', 'loss', 'draw', 'gd', 'points');
        });
      });

    });
  });



});
