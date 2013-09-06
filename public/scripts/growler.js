define([], function() {
   var Growler = function() {
      this.showMessage = function(message) {
         $.bootstrapGrowl(message, {
            type: 'success',
            offset: { from: 'bottom', amount: 20 },
            delay: 1000
         });
      };

      this.showError = function(message) {
         $.bootstrapGrowl(message, {
            type: 'danger',
            offset: { from: 'bottom', amount: 20 },
            delay: 2000
         });
      };
   };
   return new Growler();
});
