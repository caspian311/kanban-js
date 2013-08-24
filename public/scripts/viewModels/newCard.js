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
               queueId: navigation.parameters().queueId,
               name: self.name(),
               description: self.description() 
            };
      };

      self.save = function() {
         cardService.saveCard(getData());
      };

      self.cancel = function() {
         console.log('canceling...');
      };
   };

   return new NewCard();
});
