define(function() {
   var Navigation = function() {
      var self = this;
      self.currentPage = ko.observable('#home');

      self.goTo = function(loc) {
         window.location = loc;
      };

      self.menuNav = function(loc) {
         return function(event, data) {
            self.currentPage(loc);
            self.goTo(loc);
         };
      };
   };
   
   return new Navigation();
});
