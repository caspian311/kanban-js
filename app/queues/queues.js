(function() {
   var queues = require('../db/queues');

   var Queues = function() {
      this.get = function(request, response) {
         queues.allQueues(function(queues) {
            response.json(queues);
         });
      };

      this.post = function(request, response) {
         queues.addQueue(request.body, function() {
            response.json({ message: 'worky!' });
         });
      };

      this.put = function(request, response) {
         queues.updateQueue(request.body, function() {
            response.json({ message: 'worky!' });
         });
      };
   };

   module.exports = new Queues();
})();
