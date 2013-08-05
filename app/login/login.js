(function() {
   var passport = require('passport');

   var Login = function() {
      this.form = function(request, response) {
         response.render('form');
      };

      this.submit = passport.authenticate('local', {
         failureRedirect: '/login',
         successRedirect: '/'
         });
   };

   module.exports = new Login();
})();
