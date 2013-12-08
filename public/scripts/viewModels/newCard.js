define(['navigation', 'services/cardService'], function(navigation, cardService) {
   var NewCard = function() {
      var self = this;
      self.name = ko.observable();
      self.description = ko.observable();
      self.stateId = ko.observable();

      self.viewAttached = function() {
         if (navigation.parameters().cardId) {
            cardService.loadCard(navigation.parameters().cardId, populateCardForm);
         } else {
            populateCardForm({
                  name: '',
                  description: '',
                  stateId: navigation.parameters().stateId,
               });
         }
      };

      var populateCardForm = function(card) {
         console.log('populate card: ' +  card);
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

      self.isValid = ko.computed(function() {
         return self.name();
      });

      self.validationErrors = ko.computed(function() {
         var errors = [];
         if (!self.name()) {
            errors.push('Invalid card name');
         }
         return errors;
      });
   };

   return new NewCard();
});
