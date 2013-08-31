define(function() {
   var CardService = function() {
      var self = this;

      this.saveCard = function(card, callback, errorHandler) {
         return $.ajax({
            url: '/cards',
            data: card,
            type: 'POST',
            success: callback,
            failure: errorHandler
         });
      };
   };

   return new CardService();
});
