define(['navigation', 'services/queueService'], function(navigation, queueService) {
   var QueueManagement = function() {
      var self = this;
      self.queues = ko.observableArray();

      self.viewAttached = function() {
         queueService.getAllQueues(function(data) {
            self.queues(data);
         });
      };

      self.createQueue = function() {
         navigation.goTo('#editQueue');
      };

      self.openQueue = function(data, event) {
         navigation.goTo('#editQueue', data);
      };

      self.deleteQueue = function(queueToBeDeleted) {
         queueService.deleteQueue(queueToBeDeleted._id, self.viewAttached);
      };
   };
   return new QueueManagement();
});
