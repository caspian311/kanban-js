define(['services/queueService'], function(queueService) {
   var Card = function(name, description) {
      this.name = ko.observable(name);
      this.description = ko.observable(description);
   }

   var transformCards = function(cardsJson) {
      var cards = [];
      if (cardsJson) {
         cards = $.map(cardsJson, function(card) {
            return new Card(card.name, card.description);
         });
      }
      return cards;
   };

   var State = function(name, cards) {
      this.name = ko.observable(name);
      this.cards = ko.observableArray(transformCards(cards));
   }

   var transformStates = function(statesJson) {
      var states = [];
      if (statesJson) {
         states = $.map(statesJson, function(state) {
            return new State(state.name, state.cards);
         });
      }
      return states;
   };

   var Queue = function(name, description, states) {
      this.name = ko.observable(name);
      this.description = ko.observable(description);
      this.states = ko.observableArray(transformStates(states));

      this.isSelected = ko.observable(false);
   };

   var Home = function() {
      var self = this;
      self.queues = ko.observableArray([]);
      self.selectedQueue = ko.observable();

      var transformQueues = function(queuesJson) {
         return $.map(queuesJson, function(queueJson) {
            return new Queue(queueJson.name, queueJson.description, queueJson.states);
         });
      };

      self.viewAttached = function() {
         queueService.getAllQueues(function(queues) {
            self.queues(transformQueues(queues));

            if (self.queues().length > 0) {
               self.selectQueue(self.queues()[0]);
            }
         });
      };

      self.selectQueue = function(chosen) {
         $.each(self.queues(), function(index, queue) {
            queue.isSelected(queue == chosen);
         });
         self.selectedQueue(chosen);
      };
   };

   return new Home();
});
