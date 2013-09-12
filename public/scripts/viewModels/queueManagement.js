define(['navigation', 'services/queueService', 'ui/queueManagementUI'], function(navigation, queueService, queueManagementUI) {
   var QueueManagement = function() {
      var self = this;
      self.queues = ko.observableArray();
      self.queueToBeDeleted = ko.observable();

      var repopulateQueues = function() {
         queueService.getAllQueues(function(data) {
            self.queues(data);
         });
      };

      self.viewAttached = function() {
         self.queueToBeDeleted(null);

         repopulateQueues();
      };

      self.createQueue = function() {
         navigation.goTo('#editQueue');
      };

      self.openQueue = function(data, event) {
         navigation.goTo('#editQueue', data);
      };

      self.deleteQueue = function(queueToBeDeleted) {
         self.queueToBeDeleted(queueToBeDeleted);
         queueManagementUI.showDeleteConfirmation();
      };

      self.confirmDeleteQueue = function() {
         queueService.deleteQueue(self.queueToBeDeleted()._id, function() { 
            repopulateQueues(); 
            queueManagementUI.hideDeleteConfirmation();
         });
      };
   };
   return new QueueManagement();
});
