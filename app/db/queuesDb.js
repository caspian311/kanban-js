(function() {
   var base = require('./base')
      , ObjectID = require('mongodb').ObjectID;

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

      self.addCard = function(stateId, newCard, callback) {
         base.inConnection(function(db, done) {
            db.collection('queues').findOne({ 'states._id': new ObjectID(stateId) }, 
               function(err, queue) {
                  if (err) {
                     throw err;
                  }

                  var state = queue.states.filter(function(state) {
                     return state._id.equals(stateId);
                  })[0];

                  state.cards.push(newCard);

                  db.collection('queues').update({ '_id': queue._id }, queue, { w: 0 }, callback);

                  done();
            });
         });
      };

      self.updateQueue = function(queue, callback) {
         if (queue.states && queue.states.length > 0) {
            queue.states = queue.states.map(function(state) {
               if (!state._id.toHexString) {
                  state._id = new ObjectID(state._id);
               }
               return state;
            });
         }

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

      self.removeAllQueues = function(callback) {
         base.inConnection(function(db, done) {
            db.collection('queues').remove({}, function() {
               callback();
               done();
            });
         });
      };

      self.deleteQueue = function(id, callback) { 
         base.inConnection(function(db, done) {
            db.collection('queues').remove({ _id: new ObjectID(id) }, function() {
               callback(); 
            });
         });
      };
   };

   module.exports = new Queues();
})();

