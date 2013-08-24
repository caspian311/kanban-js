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
         var queue = {
            name: request.body.name,
            description: request.body.description,
            states: request.body.states
         };
         queues.addQueue(queue, function() {
            response.json({ message: 'worky!' });
         });
      };

      this.put = function(request, response) {
         var queue = {
            _id: new ObjectID(request.body.id),
            name: request.body.name,
            description: request.body.description,
            states: request.body.states
         };
         queues.updateQueue(queue, function() {
            response.json({ message: 'worky!' });
         });
      };
   };

   module.exports = new Queues();
})();
