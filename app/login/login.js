(function() {
   var passport = require('passport');

   var Login = function() {
      this.form = function(request, response) {
         response.render('form');
      };

      this.submit = function(request, response, next) {
         passport.authenticate('local', function(authError, user, info) {
            if (authError || !user) {
               console.log('authentication error: ' + authError);
               return response.status(401).redirect('/login');
            }

            request.login(user, function(loginError) {
               if (loginError) {
                  console.log('login error: ' + loginError);
                  return response.status(401).redirect('/login');
               }

               return response.redirect('/');
            });
         })(request, response, next);
      };
   };

   module.exports = new Login();
})();
