define(function() {
   var Card = function(name) {
      var description = "blah blah blah blah blah blah blah blah blah blah blah";
      this.name = ko.observable(name);
      this.description = ko.observable(description);
   }

   var State = function(name, cards) {
      this.name = ko.observable(name);
      this.cards = ko.observableArray(cards);
   }

   var ViewModel = function() {
      var allStates = [
         new State('To do', 
            [new Card('card1'), new Card('card2'), new Card('card3'), new Card('card4')]),
         new State('Doing', 
            [new Card('card5'), new Card('card6')]),
         new State('Done', 
            [new Card('card7'), new Card('card8'), new Card('card9'), new Card('card10')])
      ];

      this.states = ko.observableArray(allStates);
   };

   return new ViewModel();
});
