define(function() {
   var NewQueue = function() {
      var self = this;

      self.name = ko.observable();
      self.description = ko.observable();

      self.save = function() {
         console.log('saving: ' + self.name() + ' ' + self.description());
      };

      self.cancel = function() {
         console.log('cancelling.');
      };
   };
   return new NewQueue();
});
