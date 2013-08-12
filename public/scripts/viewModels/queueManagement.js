define(['queueService'], function(queueService) {
   var QueueManagement = function() {
      this.queues = ko.observableArray();

      this.queues(queueService.getAllQueues());
   };
   return new QueueManagement();
});
