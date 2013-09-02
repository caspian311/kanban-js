(function() {
   var users = require('../db/users')
      , encryptionUtils = require('./encryption_utils');

   var LoginValidation = function() {
      this.validate_login = function(username, password, done) {
         var encryptedPassword = encryptionUtils.encrypt(password);
         users.findUserByCredentials(username, encryptedPassword, function(results) {
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
