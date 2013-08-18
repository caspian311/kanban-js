define(function() {
   var Navigation = function() {
      var self = this;
      self.currentPage = ko.observable('#home');
      self.parameters = ko.observable();

      self.goTo = function(loc, data) {
         self.parameters(data);
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
