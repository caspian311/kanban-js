(function() {
   var users = require('../db/users')
      , encryptionUtils = require('../../app/authentication/encryption_utils');

   var Registration = function() {
      this.form = function(request, response) {
         response.render('form');
      };

      this.create = function(request, response) {
         var user = {
            name: request.body.name,
            email: request.body.email,
            password: encryptionUtils.encrypt(request.body.password)
         };
         users.addUser(user, function() {
            response.redirect('/login?created_user_successfully=true');
         });
      };
   };

   module.exports = new Registration();
})();
