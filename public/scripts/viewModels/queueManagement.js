define(['queueService'], function(queueService) {
   var QueueManagement = function() {
      var self = this;
      self.queues = ko.observableArray();

      queueService.getAllQueues(function(data) {
         self.queues(data);
      });
   };
   return new QueueManagement();
});
