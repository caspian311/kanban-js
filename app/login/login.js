(function() {
   var passport = require('passport');

   var Login = function() {
      this.form = function(request, response) {
         var model = {
            bad_login: request.query.bad_login
         };
         response.render('form', model);
      };

      this.submit = function(request, response, next) {
         passport.authenticate('local', function(authError, user, info) {
            if (authError || !user) {
               console.log('authentication error: ' + authError);
               return response.redirect('/login?bad_login=true');
            }

            request.login(user, function(loginError) {
               if (loginError) {
                  console.log('login error: ' + loginError);
                  return response.redirect('/login?bad_login=true');
               }

               return response.redirect('/');
            });
         })(request, response, next);
      };
   };

   module.exports = new Login();
})();
