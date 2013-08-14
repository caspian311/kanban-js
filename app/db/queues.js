(function() {
   var base = require('./base');
   var Queues = function() {
   };
   Queues.prototype = base.prototype;
   Queues.prototype.allQueues = function(callback) {
      this.inConnection(function(db) {
         db.collection('queues').find().toArray(function(err, docs) {
            if (err) {
               throw err;
            }

            callback(docs);
         });
      });
   };

   Queues.prototype.addQueue = function(user, callback) {
      this.inConnection(function(db) {
         db.collection('queues').insert(user, function(err, users) {
            if (err) {
               throw err;
            }
            callback(users[0]);
         });
      });
   };

   module.exports = new Queues();
})();

