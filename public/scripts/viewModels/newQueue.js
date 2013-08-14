define(['services/queueService', 'navigation'], function(queueService, navigation) {
   var NewQueue = function() {
      var self = this;

      self.name = ko.observable();
      self.description = ko.observable();

      var getNewQueue = function() {
         return {
               name: self.name(),
               description: self.description()
            };
      };

      var sucessfulSave = function() {
         navigation.goTo('#queueManagement');
      };

      self.save = function() {
         queueService.saveQueue(getNewQueue(), sucessfulSave);
      };

      self.cancel = function() {
         console.log('cancelling.');
      };
   };
   return new NewQueue();
});
