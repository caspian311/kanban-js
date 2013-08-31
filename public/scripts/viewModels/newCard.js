define(['navigation', 'services/cardService'], function(navigation, cardService) {
   var NewCard = function() {
      var self = this;
      self.name = ko.observable();
      self.description = ko.observable();

      self.viewAttached = function() {
         self.name('');
         self.description('');
      };

      var getData = function() {
         return {
               stateId: navigation.parameters().stateId,
               name: self.name(),
               description: self.description() 
            };
      };

      self.save = function() {
         cardService.saveCard(getData(), function() {
            navigation.goTo('#home');
         });
      };

      self.cancel = function() {
         navigation.goTo('#home');
      };
   };

   return new NewCard();
});
