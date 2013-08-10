(function() {
   var users = require('../db/users');

   var LoginValidation = function() {
      this.validate_login = function(username, password, done) {
         users.findByCredentials(username, password, function(results) {
            if (results.length > 0) {
               done(null, results[0]);
            } else {
               done(null, false, { message: 'Unauthenticated user' });
            }
         });
      }
   };

   module.exports = new LoginValidation();
})();
