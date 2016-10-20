require(TEST_HELPER); // <--- This must be at the top of every test file.

var request = require('supertest-as-promised');
var routes = require(__server + '/index.js');

describe('The Server', function() {

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();
  // Notice how these are generator functions (indicated by the the *)
  // See test/test-helper.js for details of why this works.
  // I (Scott) have no clue, but it seems to be working right now.......
  describe('route /api/games', function() {
    it_('"get /api/games" should be a route in the server', function * () {

      yield request(app)
      .get('/api/games')
      .expect(200);
    });

    it_('Returns an Array when "get /api/games" is queried with a tournament_id', function * () {

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

  });


});
