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
   };
   return new QueueService();
});
