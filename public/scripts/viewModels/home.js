define(['services/queueService'], function(queueService) {
   var Card = function(json) {
      this.name = ko.observable();
      this.description = ko.observable();

      this.name(json.name);
      this.description(json.description);
   }

   var State = function(json) {
      this.name = ko.observable();
      this.cards = ko.observableArray([]);

      this.name(json.name);
      if (json.cards) {
         this.cards($.map(json.cards, function(card) { return new Card(card); }));
      }
   }

   var Queue = function(json) {
      this.name = ko.observable();
      this.description = ko.observable();
      this.states = ko.observableArray([]);
      this.isSelected = ko.observable();

      this.name(json.name);
      this.description(json.description);
      this.isSelected(false);
      if (json.states) {
         this.states($.map(json.states, function(state) { return new State(state); }));
      }
   };

   var Home = function() {
      var self = this;
      self.queues = ko.observableArray([]);
      self.selectedQueue = ko.observable();

      self.viewAttached = function() {
         queueService.getAllQueues(populateQueues);
      };

      var populateQueues = function(queues) {
         self.queues($.map(queues, function(queue) { return new Queue(queue); }));

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

      self.newCard = function() {
         self.selectedQueue().states()[0].cards.push(new Card({ name: 'test', description: 'this is the description' }));
      };
   };

   return new Home();
});
