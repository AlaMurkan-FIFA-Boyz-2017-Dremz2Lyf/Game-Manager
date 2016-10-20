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
        var playersList = Mock_Data.playerObjs;

        var result = helpers.createGamesForTourney(tournamentId, playersList);

        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('object');
        expect(result[0]).to.have.all.keys('player1_id', 'player2_id', 'tournament_id');
      });

    });

    describe('getTable', function() {

      it_('Should be a function', function * () {
        expect(helpers.getTable).to.be.a('function');
      });

      it_('Should query the database for games with the passed in tournament_id', function* () {
        expect('I have no idea how ').to.equal('test this, but you should make it happen ;)');
      });

      it_('When called with a tournament_id, should return an array of playerStats objects', function * () {

        var tournament_id = 1;

        var playersStats = helpers.getTable(tournament_id);

        expect(playersStats).to.be.an('array');
        expect(playersStats[0]).to.be.an('object');
        expect(playersStats[0]).to.have.all.keys('playerId', 'gp', 'won', 'loss', 'draw', 'gd', 'points');
      });

    });

  });

  describe('Routes', function() {

    beforeEach(function(done) {
      knex.migrate.rollback()
        .then(function() {
          knex.migrate.latest()
          .then(function() {
            return knex.seed.run()
            .then(function() {
              done();
            });
          });
        });
    });

    describe('/api/games', function() {

      it_('Should be a route in the server', function * () {
        console.log('NOTE: The get all games route will be made when we want to make a player stats page');
        yield request(app)
        .get('/api/games')
        .expect(200);
      });

      it_('Should respond with an array of objects when queried with a tournament_id', function * () {

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

      it_('Should respond with an array of objects when queried with a tournament_id', function * () {

        yield request(app)
        .get('/api/games/table?tournament_id=1')
        .expect(200)
        .expect(function(response) {
          expect(response.body).to.be.an('array');
          expect(response.body[0]).to.be.an('object');
        });
      });

      it_('The objects in the return array should be properly formatted', function * () {

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
