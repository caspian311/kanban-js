MongoClient = require('mongodb').MongoClient
ObjectID = require('mongodb').ObjectID
queuesDb = require('../../app/db/queuesDb')

describe "queuesDb", () ->
   cleanUp = (done) ->
      queuesDb.removeAllQueues done

   beforeEach cleanUp
   afterEach cleanUp

   describe '#allQueues', () ->
      it 'initially should be empty', (done) ->
         queuesDb.allQueues (docs) ->
            assert(docs.length is 0, 'should be empty, but was ' + docs.length)

            done()

   describe '#addQueue', () ->
      it 'should add a queue', (done) ->
         queue = 
            name: 'foo'
         queuesDb.addQueue queue, (newQueue) ->
            assert(newQueue, 'should have created the new Queue')
            assert(newQueue.name is 'foo', 'name should be correct, but was ' + newQueue.name)
            queuesDb.allQueues (allQueues) ->
               assert(allQueues.length is 1, 'should have one queue, but had ' + allQueues.length)

               done()

   describe '#updateQueue', () ->
      it 'should update a queue', (done) ->
         initialQueue = 
            name: 'foo'

         queuesDb.addQueue initialQueue, (existingQueue) ->
            existingQueue.name = 'bar'

            queuesDb.updateQueue existingQueue, (updatedItems) ->

               updatedItems.should.equal(1)

               queuesDb.allQueues (allQueues) ->
                  assert(allQueues.length is 1, 'should still only have one queue, but had ' + allQueues.length)
                  allQueues[0].name.should.equal('bar')

                  done()

      it 'should make all state ids objectids', (done) ->
         initialQueue = 
            name: 'foo'
            states: [ { _id: new ObjectID() , name: 'footoo' } ]

         queuesDb.addQueue initialQueue, (existingQueue) ->
            stateId = new ObjectID().toHexString()
            existingQueue.states = [ { _id: stateId } ]

            queuesDb.updateQueue existingQueue, () ->

               queuesDb.allQueues (allQueues) ->
                  allQueues[0].states[0]._id.toHexString().should.equal(stateId)

                  done()

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

   describe '#deleteQueue', () ->
      it 'should remove specified queue', (done) ->
         queue1 = { _id: new ObjectID(), name: 'to be deleted' }
         queue2 = { _id: new ObjectID(), name: 'to be kept' }

         queuesDb.addQueue queue1, () ->
            queuesDb.addQueue queue2, () ->
               queuesDb.deleteQueue queue1._id.toString(), () ->
                  queuesDb.allQueues (remainingQueues) ->
                     remainingQueues.should.have.length(1)
                     done()

   describe '#queuesForUser', () ->
      it 'only find queues with same user id', (done) ->
         userId = new ObjectID()
         otherId = new ObjectID()

         queuesDb.addQueue { name: 'one', userId: otherId  }, () ->
            queuesDb.addQueue { name: 'two', userId: userId }, () ->
               queuesDb.addQueue { name: 'three', userId: otherId }, () ->
                  queuesDb.queuesForUser userId, (docs) ->
                     docs.should.have.length(1)
                     docs[0].name.should.equal('two')
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

