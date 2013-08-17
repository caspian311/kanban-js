(function() {
   var MongoClient = require('mongodb').MongoClient
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

               done();
            });
         });
      };

      before(cleanUp);
      after(cleanUp);

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
   });
})();
