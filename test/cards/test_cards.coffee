   cards = require('../../app/cards/cards')
   queuesDb = require('../../app/db/queuesDb')

   describe 'cards', () ->
      beforeEach () ->
         this.getCardStub = sinon.stub(queuesDb, 'getCard')

      afterEach () ->
         queuesDb.getCard.restore()

      describe '#get:id', () ->
         it 'should return the card in json format', () ->
            givenId = 'given card id'

            request = 
               params: 
                  id: givenId
            response = 
                  json: sinon.spy()

            cards.get request, response

            returnedCard = { foo: 'bar' }
            this.getCardStub.args[0][1] returnedCard

            response.json.args[0][0].should.deep.equal returnedCard

         it 'should get specified card', () ->
            givenId = 'given card id'

            request = 
               params: 
                  id: givenId
            response = 
                  json: sinon.spy()

            cards.get request, response

            this.getCardStub.args[0][0].should.equal givenId

