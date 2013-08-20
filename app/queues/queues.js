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
         var user = {
            name: request.body.name,
            description: request.body.description,
            states: request.body.states
         };
         queues.addQueue(user, function() {
            response.json({ message: 'worky!' });
         });
      };

      this.put = function(request, response) {
         var user = {
            _id: new ObjectID(request.body.id),
            name: request.body.name,
            description: request.body.description,
            states: request.body.states
         };
         queues.updateQueue(user, function() {
            response.json({ message: 'worky!' });
         });
      };
   };

   module.exports = new Queues();
})();
