define(function() {
   var Navigation = function() {
      this.goTo = function(loc) {
         window.location.href = loc;
      };
   };
   
   return new Navigation();
});
