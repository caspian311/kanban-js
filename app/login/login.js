(function() {
   var passport = require('passport')
      , callbackGenerator = require('./callback_generator.js');

   var Login = function() {
      this.form = function(request, response) {
         response.render('form', { bad_login: request.query.bad_login });
      };

      this.submit = function(request, response, next) {
         passport.authenticate('local', callbackGenerator.generateCallback(request, response))(request, response, next);
      };
   };

   module.exports = new Login();
})();
