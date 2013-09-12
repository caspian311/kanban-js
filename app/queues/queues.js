(function() {
   var queuesDb = require('../db/queuesDb')
      , ObjectID = require('mongodb').ObjectID;

   var Queues = function() {
      this.get = function(request, response) {
         queuesDb.allQueues(function(queues) {
            response.json(queues);
         });
      };

      this.post = function(request, response) {
         queuesDb.addQueue(parseQueue(request), function() {
            response.json({ message: 'worky!' });
         });
      };

      var parseQueue = function(request) {
         var queue = {
            name: request.body.name,
            description: request.body.description,
            states: request.body.states.map(mapState),
            creationDate: new Date()
         };
         return queue;
      ;}

      var mapState = function(state) {
         if (!state._id) {
            state._id = new ObjectID();
         }
         if (!state.cards) {
            state.cards = [];
         }
         return state;
      };

      this.put = function(request, response) {
         var queue = {
            _id: new ObjectID(request.body.id),
            name: request.body.name,
            description: request.body.description,
            states: request.body.states.map(mapState),
            creationDate: request.body.creationDate
         };
         queuesDb.updateQueue(queue, function() {
            response.json({ message: 'worky!' });
         });
      };

      this.del = function(request, response) {
         queuesDb.deleteQueue(request.params['id'], function() {
            response.json({ message: 'worky!' });
         });
      };
   };

   module.exports = new Queues();
})();
