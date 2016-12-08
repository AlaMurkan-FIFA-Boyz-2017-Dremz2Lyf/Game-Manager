require(TEST_HELPER); // <--- This must be at the top of every test file.

const driver = require(__client + '/models/lib/axios_driver.js');

describe('axios driver', function() {

  it('should have a create method', function() {
    expect(typeof driver.create).to.equal('function');
  })

  describe('new models', function() {

    let testModel = driver.create('test', 'http://localhost:4000/')

    it('should create a new front end model', function() {
      expect(testModel).to.have.property('methods');
    })

    it('should have an "all" method', function () {
      expect(typeof testModel.all).to.equal('function');
    })

    it('should have a "create" method', function() {
      expect(typeof testModel.create).to.equal('function')
    })

    it('should have a "findBy" method', function() {
      expect(typeof testModel.findBy).to.equal('function')
    })

    it('should have a "updateOne" method', function() {
      expect(typeof testModel.updateOne).to.equal('function')
    })

  })

})

describe('game model', function() {

  describe('all method', function() {

    let games = driver.create('games', 'http://localhost:4000/')

    it('should return all games in the database', function() {
      games.all().then(res => {
        res
      }).catch(err => {
        throw err
      })
    })

  })

})
