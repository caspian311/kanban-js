define(['queueService'], function(queueService) {
   var NewQueue = function() {
      var self = this;

      self.name = ko.observable();
      self.description = ko.observable();

      self.save = function() {
         queueService.saveQueue({
               name: self.name(),
               description: self.description()
            });
      };

      self.cancel = function() {
         console.log('cancelling.');
      };
   };
   return new NewQueue();
});
