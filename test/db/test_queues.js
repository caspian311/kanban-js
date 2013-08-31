(function() {
   var MongoClient = require('mongodb').MongoClient
      , ObjectID = require('mongodb').ObjectID
      , queues = require('../../app/db/queues');

   describe("queues", function() {
      var cleanUp = function(done) {
         MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
            if (err) {
               throw err;
            }
            db.collection('queues').remove({}, function(err, numberRemoved) {
               if (err) {
                  throw err;
               }

               db.close();
               done();
            });
         });
      };

      beforeEach(cleanUp);
      afterEach(cleanUp);

      describe('#allQueues', function() {
         it('initially should be empty', function(done) {
            queues.allQueues(function(docs) {
               assert(docs.length === 0, 'should be empty, but was ' + docs.length);

               done();
            });
         });
      });

      describe('#addQueue', function() {
         it('should add a queue', function(done) {
            queues.addQueue({name: 'foo'}, function(newQueue) {
               assert(newQueue, 'should have created the new Queue');
               assert(newQueue.name === 'foo', 'name should be correct, but was ' + newQueue.name);
               queues.allQueues(function(allQueues) {
                  assert(allQueues.length === 1, 'should have one queue, but had ' + allQueues.length);

                  done();
               });
            });
         });
      });

      describe('#updateQueue', function() {
         it('should update a queue', function(done) {
            var initialQueue = {name: 'foo'};

            queues.addQueue(initialQueue, function(existingQueue) {
               existingQueue.name = 'bar';

               queues.updateQueue(existingQueue, function(updatedItems) {

                  updatedItems.should.equal(1);

                  queues.allQueues(function(allQueues) {
                     assert(allQueues.length === 1, 'should still only have one queue, but had ' + allQueues.length);
                     allQueues[0].name.should.equal('bar');

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

            queues.addQueue(initialQueue, function() {
               var cardName = 'this is a new card';

               queues.addCard(stateId.toHexString(), { name: cardName }, function() {

                  queues.allQueues(function(allQueues) {
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
   });
})();
