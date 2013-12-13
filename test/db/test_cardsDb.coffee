MongoClient = require('mongodb').MongoClient
ObjectID = require('mongodb').ObjectID
queuesDb = require('../../app/db/queuesDb')
cardsDb = require('../../app/db/cardsDb')

describe "cardsDb", () ->
   cleanUp = (done) ->
      queuesDb.removeAllQueues done

   beforeEach cleanUp
   afterEach cleanUp

   describe '#addCard', () ->
      it 'should add a card to the queue', (done) ->
         stateId = new ObjectID()
         initialQueue = 
            name: 'queue name'
            states: [
               { 
                  _id: new ObjectID(), 
                  name: 'state 1', 
                  cards: [] 
               }, 
               { 
                  _id: stateId, 
                  name: 'state 2', 
                  cards: [] 
               }
            ]


         queuesDb.addQueue initialQueue, () ->
            cardName = 'this is a new card'

            queuesDb.addCard stateId.toHexString(), { name: cardName }, () ->

               theOnesFromThisState = (state) ->
                     return state._id.equals(stateId)

               queuesDb.allQueues (allQueues) ->
                  updatedStates = allQueues[0].states.filter theOnesFromThisState
                  updatedState = updatedStates[0]

                  assert(updatedState.cards.length is 1, 'should have one card, but had ' + updatedState.cards.length)
                  updatedState.cards[0].name.should.equal cardName
                  assert updatedState.cards[0]._id, 'should have set an id'

                  done()

   describe '#getCard', () ->
      it 'pass back the specified card', (done) ->
         queue = 
               states: [
                  cards: [
                     {
                        _id: new ObjectID(),
                        name: 'first'
                     },
                     {
                        _id: new ObjectID(),
                        name: 'second'
                     },
                     {
                        _id: new ObjectID(),
                        name: 'third'
                     }
                  ]
               ]
         cardId = queue.states[0].cards[1]._id

         queuesDb.addQueue queue, () ->
            queuesDb.getCard cardId, (foundCard) ->
               foundCard.name.should.equal 'second'
               done()

