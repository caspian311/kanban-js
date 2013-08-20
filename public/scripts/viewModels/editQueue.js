define(['services/queueService', 'navigation'], function(queueService, navigation) {
   var EditQueue = function() {
      var self = this;

      self.id = ko.observable();
      self.name = ko.observable();
      self.description = ko.observable();
      self.isEditing = ko.observable(false);
      self.newStateName = ko.observable();
      self.states = ko.observableArray([]);

      self.title = ko.computed(function() {
         var prefix;
         if (self.isEditing()) {
            prefix = 'Update'
         } else {
            prefix = 'Create'
         }

         return prefix + ' Queue';
      });

      self.saveActionText = ko.computed(function() {
         if (self.isEditing()) {
            return 'Update'
         } else {
            return 'Create'
         }
      });

      self.viewAttached = function() {
         if (navigation.parameters()) {
            self.isEditing(true);
            self.id(navigation.parameters()._id);
            self.name(navigation.parameters().name);
            self.description(navigation.parameters().description);
            if (navigation.parameters().states) {
               self.states(navigation.parameters().states);
            }
         } else {
            self.isEditing(false);
            self.id(null);
            self.name('');
            self.description('');
            self.states.length = 0;
         }
         self.newStateName('');
      };

      var getData = function() {
         return {
               id: self.id(),
               name: self.name(),
               description: self.description(),
               states: self.states()
            };
      };

      var sucessfulSave = function() {
         redirectBackToQueueManagement();
      };

      self.save = function() {
         if (self.isEditing()) {
            queueService.updateQueue(getData(), sucessfulSave);
         } else {
            queueService.saveQueue(getData(), sucessfulSave);
         }
      };

      self.cancel = function() {
         redirectBackToQueueManagement();
      };

      var redirectBackToQueueManagement = function() {
         navigation.goTo('#queueManagement');
      };

      self.addState = function() {
         self.states.push({ name: ko.observable(self.newStateName())});
         self.newStateName('');
      };

   };
   return new EditQueue();
});
