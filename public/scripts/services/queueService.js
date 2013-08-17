define(function() {
   var QueueService = function() {
      this.getAllQueues = function(callback, errorHandler) {
         return $.ajax({
            url: '/queues',
            success: callback,
            failure: errorHandler
         });
      };

      this.saveQueue = function(queue, callback, errorHandler) {
         return $.ajax({
            url: '/queues',
            data: queue,
            type: 'POST',
            success: callback,
            failure: errorHandler
         });
      };

      this.updateQueue = function(queue, callback, errorHandler) {
         return $.ajax({
            url: '/queues',
            data: queue,
            type: 'PUT',
            success: callback,
            failure: errorHandler
         });
      };
   };
   return new QueueService();
});
