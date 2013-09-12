define(function() {
   var QueueService = function() {
      this.getAllQueues = function(callback, errorHandler) {
         return $.ajax({
            url: '/queues',
            success: callback,
            error: errorHandler
         });
      };

      this.saveQueue = function(queue, callback, errorHandler) {
         return $.ajax({
            url: '/queues',
            data: queue,
            type: 'POST',
            success: callback,
            error: errorHandler
         });
      };

      this.updateQueue = function(queue, callback, errorHandler) {
         return $.ajax({
            url: '/queues',
            data: queue,
            type: 'PUT',
            success: callback,
            error: errorHandler
         });
      };

      this.deleteQueue = function(id, callback, errorHandler) {
         return $.ajax({
            url: '/queues/' + id,
            type: 'DELETE',
            success: callback,
            error: errorHandler
         });
      };
   };
   return new QueueService();
});
