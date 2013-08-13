define(function() {
   var QueueService = function() {
      this.getAllQueues = function(callback) {
         return $.ajax({
            url: '/queues',
            success: function(data) {
               callback(data);
            },
            failure: function() {
               alert('bad');
            }
         });
      };

      this.saveQueue = function(queue, callback) {
         return $.ajax({
            url: '/queues',
            data: queue,
            type: 'POST',
            success: callback,
            failure: function() {
               alert('bad');
            }
         });
      };
   };
   return new QueueService();
});
