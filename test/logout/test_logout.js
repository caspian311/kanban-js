(function() {
   var logout = require('../../app/logout/logout');

   describe('Logout', function() {
      var request = { logout: sinon.spy() }
         , response = { redirect: sinon.spy() };

      describe('#logout', function() {
         it('should call logout on request', function() {
            logout.logout(request, response);

            assert(request.logout.called);
         });

         it('should redirect to login screen', function() {
            logout.logout(request, response);

            assert(response.redirect.calledWith('/login'));
         });
      });
   });
})();
