(function() {
   var LoginValidation = function() {
      this.validate_login = function(username, password, done) {
         if (username === 'test' && password === 'test') {
            done(null, {id: 123});
         } else {
            done(null, false, { message: 'Unauthenticated user' });
         }
      }
   };

   module.exports = new LoginValidation();
})();
