(function() {
   var base = require('./base');
   var Queues = function() {
   };
   Queues.prototype = base.prototype;
   Queues.prototype.allQueues = function(callback) {
      this.inConnection(function(db, done) {
         db.collection('queues').find().toArray(function(err, docs) {
            if (err) {
               throw err;
            }

            callback(docs);
            done();
         });
      });
   };

   Queues.prototype.addQueue = function(queue, callback) {
      this.inConnection(function(db, done) {
         db.collection('queues').insert(queue, function(err, queues) {
            if (err) {
               throw err;
            }
            callback(queues[0]);
            done();
         });
      });
   };

   Queues.prototype.updateQueue = function(queue, callback) {
      this.inConnection(function(db, done) {
         db.collection('queues').update({'_id': queue._id}, queue, function(err, numberOfUpdates) {
            if (err) {
               throw err;
            }
            callback(numberOfUpdates);
            done();
         });
      });
   };

   module.exports = new Queues();
})();

