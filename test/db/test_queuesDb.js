(function() {
   var MongoClient = require('mongodb').MongoClient
      , ObjectID = require('mongodb').ObjectID
      , queuesDb = require('../../app/db/queuesDb');

   describe("queuesDb", function() {
      var cleanUp = function(done) {
         queuesDb.removeAllQueues(done);
      };

      beforeEach(cleanUp);
      afterEach(cleanUp);

      describe('#allQueues', function() {
         it('initially should be empty', function(done) {
            queuesDb.allQueues(function(docs) {
               assert(docs.length === 0, 'should be empty, but was ' + docs.length);

               done();
            });
         });
      });

      describe('#addQueue', function() {
         it('should add a queue', function(done) {
            queuesDb.addQueue({name: 'foo'}, function(newQueue) {
               assert(newQueue, 'should have created the new Queue');
               assert(newQueue.name === 'foo', 'name should be correct, but was ' + newQueue.name);
               queuesDb.allQueues(function(allQueues) {
                  assert(allQueues.length === 1, 'should have one queue, but had ' + allQueues.length);

                  done();
               });
            });
         });
      });

      describe('#updateQueue', function() {
         it('should update a queue', function(done) {
            var initialQueue = {name: 'foo'};

            queuesDb.addQueue(initialQueue, function(existingQueue) {
               existingQueue.name = 'bar';

               queuesDb.updateQueue(existingQueue, function(updatedItems) {

                  updatedItems.should.equal(1);

                  queuesDb.allQueues(function(allQueues) {
                     assert(allQueues.length === 1, 'should still only have one queue, but had ' + allQueues.length);
                     allQueues[0].name.should.equal('bar');

                     done();
                  });
               });
            });
         });

         it('should make all state ids objectids', function(done) {
            var initialQueue = {name: 'foo', states: [ { _id: new ObjectID() , name: 'footoo' } ]};

            queuesDb.addQueue(initialQueue, function(existingQueue) {
               var stateId = new ObjectID().toHexString();
               existingQueue.states = [ { _id: stateId } ]

               queuesDb.updateQueue(existingQueue, function() {

                  queuesDb.allQueues(function(allQueues) {
                     allQueues[0].states[0]._id.toHexString().should.equal(stateId);

                     done();
                  });
               });
            });
         });
      });

      describe('#addCard', function() {
         it('should add a card to the queue', function(done) {
            var stateId = new ObjectID();
            var initialQueue = {
               name: 'queue name', 
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
            };

            queuesDb.addQueue(initialQueue, function() {
               var cardName = 'this is a new card';

               queuesDb.addCard(stateId.toHexString(), { name: cardName }, function() {

                  queuesDb.allQueues(function(allQueues) {
                     var updatedState = allQueues[0].states.filter(function(state) { 
                        return state._id.equals(stateId);
                     })[0];

                     assert(updatedState.cards.length === 1, 'should have one card, but had ' + updatedState.cards.length);
                     updatedState.cards[0].name.should.equal(cardName);

                     done();
                  });
               });
            });
         });
      });

      describe('#deleteQueue', function() {
         it('should remove specified queue', function(done) {
            var queue1 = { _id: new ObjectID(), name: 'to be deleted' };
            var queue2 = { _id: new ObjectID(), name: 'to be kept' };

            queuesDb.addQueue(queue1, function() {
               queuesDb.addQueue(queue2, function() {
                  queuesDb.deleteQueue(queue1._id.toString(), function() {
                     queuesDb.allQueues(function(remainingQueues) {
                        remainingQueues.should.have.length(1);
                        done();
                     });
                  });
               });
            });
         });
      });

   });
})();
