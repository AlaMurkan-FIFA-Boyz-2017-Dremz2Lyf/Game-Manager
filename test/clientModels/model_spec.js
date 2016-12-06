require(TEST_HELPER); // <--- This must be at the top of every test file.

const driver = require(__client + '/models/lib/axios_driver.js');

describe('axios driver', function() {

  it('should have a create method', function() {
    expect(typeof driver.create).to.equal('function');
  })

  describe('new models', function() {

    let testModel = driver.create('test')

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

describe('player model', function() {

})
