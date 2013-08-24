define(function() {
   var CardService = function() {
      var self = this;

      self.saveCard = function(card) {
         console.log('saving...');
         console.dir(card);
      };
   };

   return new CardService();
});
