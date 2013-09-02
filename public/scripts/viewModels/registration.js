require([], function() {
   var RegistrationViewModel = function() {
      var self = this;
      self.name = ko.observable();
      self.email = ko.observable();
      self.password = ko.observable();
      self.passwordConfirmation = ko.observable();

      self.isValid = ko.computed(function() {
         return self.name() && self.email() && self.password() && (self.password() === self.passwordConfirmation());
      });
   };

   ko.applyBindings(new RegistrationViewModel());
});
