define(['services/queueService', 'navigation'], function(queueService, navigation) {
   var EditQueue = function() {
      var self = this;

      self.id = ko.observable();
      self.name = ko.observable();
      self.description = ko.observable();
      self.isEditing = ko.observable(false);
      self.newStateName = ko.observable();
      self.states = ko.observableArray([]);
      self.creationDate = ko.observable();

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

      var sortByOrderBy = function(s1, s2) {
         return s1.orderBy < s2.orderBy ? -1 : s1.orderBy > s2.orderBy ? 1 : 0;
      };

      self.viewAttached = function() {
         self.states([]);
         if (navigation.parameters()) {
            self.isEditing(true);
            self.id(navigation.parameters()._id);
            self.name(navigation.parameters().name);
            self.description(navigation.parameters().description);
            if (navigation.parameters().states) {
               self.states(navigation.parameters().states.sort(sortByOrderBy));
            }
            self.creationDate(navigation.parameters().creationDate);
         } else {
            self.isEditing(false);
            self.id(null);
            self.name('');
            self.description('');
            self.creationDate('');
         }
         self.newStateName('');
      };

      self.removeState = function() {
      };

      var getData = function() {
         var data = {
               id: self.id(),
               name: self.name(),
               description: self.description(),
               creationDate: self.creationDate()
            };
         data.states = $.map(self.states(), function(state, index) {
            state.orderBy = index;
            return state;
         });
         return data;
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
