require(TEST_HELPER); // <--- This must be at the top of every test file.

var helpers = require(__server + '/serverHelpers.js');
var request = require('supertest-as-promised');
var routes = require(__server + '/index.js');

describe('The Server', function() {

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
        expect(helpers.createGamesForTourney).to.be.an('function');
      });

      it_('When called with a tournament id and array of player objects it should return an array of game objects', function * () {
        var tournamentId = 1;
        var playersList = Mock_DataBase.players;

        var result = helpers.createGamesForTourney(tournamentId, playersList);

        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('object');
        expect(result[0]).to.have.all.keys('player1_id', 'player2_id', 'tournament_id');
      });

    });
    describe('getPlayer', function() {

      it_('helper should have a getPlayer function', function * () {
        expect(helpers.getPlayer).to.be.a('function');
      });

      it_('When called with a player id it should return the player object from the database', function * () {
        expect(helpers.getPlayer());
      });
    });


  });

  describe('route /api/games', function() {

    it_('"get /api/games" should be a route in the server', function * () {
      console.log('NOTE: The get all games route will be made when we want to make a player stats page');
      yield request(app)
      .get('/api/games')
      .expect(200);
    });

    it_('Should return an Array when "get /api/games" is queried with a tournament_id', function * () {

      yield request(app)
      .get('/api/games?tournament_id=3')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.be.a('array');
      });
    });

  });

  describe('route /api/games/stats', function() {

    it_('"get /api/games/stats" should be a route in the server', function * () {

      yield request(app)
      .get('/api/games/stats')
      .expect(200);
    });

    it_('Should return an Array when "get /api/games/stats" is queried with a tournament_id', function * () {

      yield request(app)
      .get('/api/games/stats')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.be.a('array');
      });
    });

    it_('the response body should be an array of objects', function * () {

      yield request(app)
      .get('/api/games/stats')
      .expect(200)
      .expect(function(response) {
        expect(response.body[0]).to.be.a('object');
      });
    });

    it_('the objects in the return array should be properly formatted', function * () {

      yield request(app)
      .get('/api/games/stats')
      .expect(200)
      .expect(function(response) {
        expect(response.body[0]).to.have.all.keys('name', 'gp', 'won', 'loss', 'draw', 'gd', 'points');
      });
    });


  });


});
