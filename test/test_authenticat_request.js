(function() {
   var authenticateRequest = require('../app/authentication/authenticate_request');

   describe('authenticateRequest', function() {
      describe('already authenticated user', function() {
         it('should call the next callback', function() {
            var request = { user: {} };
            var next = sinon.spy();

            authenticateRequest(request, {}, next);

            assert(next.called);
         });
      });

      describe('unauthenticated user', function() {
         it('should redirect to the /login path', function() {
            var response = {};
            response.redirect = sinon.spy();

            authenticateRequest({}, response, sinon.spy());

            assert(response.redirect.calledWithExactly('/login'));
         });
      });

      describe('unauthenticated user trying to login', function() {
         it('should be allowed to try to login in ', function() {
            var request = {};
            request.path = '/login';

            var next = sinon.spy();

            authenticateRequest(request, {}, next);

            assert(next.called);
         });
      });
   });
})();
