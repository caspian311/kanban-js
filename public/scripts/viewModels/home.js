define(['services/queueService', 'navigation'], function(queueService, navigation) {
   var Card = function(json) {
      this.id = ko.observable();
      this.name = ko.observable();
      this.description = ko.observable();

      this.id(json._id);
      this.name(json.name);
      this.description(json.description);

      this.getData = function() {
         return { 
            id: this.id(),
            name: this.name(),
            description: this.description()
         };
      };
   }

   var State = function(json) {
      this.id = ko.observable();
      this.name = ko.observable();
      this.cards = ko.observableArray([]);

      this.id(json._id);
      this.name(json.name);
      if (json.cards) {
         this.cards($.map(json.cards, function(card) { return new Card(card); }));
      }

      this.getData = function() {
         return { 
            id: this.id(),
            name: this.name(),
            cards: $.map(this.cards(), function(card, index) {
               var transformedCard = card.getData();
               transformedCard.orderBy = index;
               return transformedCard;
            })
         };
      };
   }

   var Queue = function(json) {
      this.id = ko.observable();
      this.name = ko.observable();
      this.description = ko.observable();
      this.states = ko.observableArray([]);
      this.isSelected = ko.observable();

      this.id(json._id);
      this.name(json.name);
      this.description(json.description);
      this.isSelected(false);

      var sortByOrderBy = function(s1, s2) {
         return s1.orderBy < s2.orderBy ? -1 : s1.orderBy > s2.orderBy ? 1 : 0;
      };

      if (json.states) {
         this.states($.map(json.states.sort(sortByOrderBy), function(state) { return new State(state); }));
      }

      this.getData = function() {
         return {
            id: this.id(),
            name: this.name(),
            description: this.description(),
            states: $.map(this.states(), function(state, index) {
               var transformedState = state.getData();
               transformedState.orderBy = index;
               return transformedState;
            })
         };
      };
   };

   var Home = function() {
      var self = this;
      self.queues = ko.observableArray([]);
      self.selectedQueue = ko.observable();

      self.viewAttached = function() {
         queueService.getAllQueues(populateQueues);
      };

      var sortByCreationDate = function(queues) {
         return queues.sort(function(q1, q2) {
            return q1.creationDate < q2.creationDate ? -1 : q1.creationDate > q2.creationDate ? 1 : 0;
         });
      };

      var populateQueues = function(queues) {
         self.queues($.map(sortByCreationDate(queues), function(queue) { return new Queue(queue); }));

         if (self.queues().length > 0) {
            self.selectQueue(self.queues()[0]);
         }
      };

      self.selectQueue = function(chosen) {
         $.each(self.queues(), function(index, queue) {
            queue.isSelected(queue == chosen);
         });
         self.selectedQueue(chosen);
      };

      this.cardMoved = function() {
         console.dir(self.selectedQueue().getData());
      };

      self.newCard = function() {
         navigation.goTo('#newCard', { stateId: self.selectedQueue().states()[0].id() });
      };
   };

   return new Home();
});
