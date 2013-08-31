(function() {
   var queues = require('../db/queues')
      , ObjectID = require('mongodb').ObjectID;

   var Queues = function() {
      this.get = function(request, response) {
         queues.allQueues(function(queues) {
            response.json(queues);
         });
      };

      this.post = function(request, response) {
         queues.addQueue(parseQueue(request), function() {
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
            states: request.body.states.map(mapState)
         };
         queues.updateQueue(queue, function() {
            response.json({ message: 'worky!' });
         });
      };
   };

   module.exports = new Queues();
})();
