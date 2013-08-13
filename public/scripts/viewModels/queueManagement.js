define(['queueService'], function(queueService) {
   var QueueManagement = function() {
      var self = this;
      self.queues = ko.observableArray();

      self.viewAttached = function() {
         queueService.getAllQueues(function(data) {
            self.queues(data);
         });
      };
   };
   return new QueueManagement();
});
