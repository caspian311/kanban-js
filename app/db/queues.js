(function() {
   var base = require('./base');

   var Queues = function() {
      var self = this;

      self.allQueues = function(callback) {
         base.inConnection(function(db, done) {
            db.collection('queues').find().toArray(function(err, docs) {
               if (err) {
                  throw err;
               }

               callback(docs);
               done();
            });
         });
      };

      self.addQueue = function(queue, callback) {
         base.inConnection(function(db, done) {
            db.collection('queues').insert(queue, function(err, queues) {
               if (err) {
                  throw err;
               }
               callback(queues[0]);
               done();
            });
         });
      };

      self.updateQueue = function(queue, callback) {
         base.inConnection(function(db, done) {
            db.collection('queues').update({'_id': queue._id}, queue, function(err, numberOfUpdates) {
               if (err) {
                  throw err;
               }
               callback(numberOfUpdates);
               done();
            });
         });
      };
   };

   module.exports = new Queues();
})();

