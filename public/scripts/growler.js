define([], function() {
   var Growler = function() {
      this.showMessage = function(message) {
         $.bootstrapGrowl(message, {
            type: 'success',
            offset: { from: 'bottom', amount: 20 },
            delay: 1000
         });
      };
   };
   return new Growler();
});
