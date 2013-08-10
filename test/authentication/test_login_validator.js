(function() {
   var loginValidator = require('../../app/authentication/login_validator');

   describe('LoginValidator', function() {
      describe('#validate_login', function() {
         it('should not populate an error message', function() {
            var username = 'test', password = 'test';
            var done = sinon.spy();

            loginValidator.validate_login(username, password, done);

            assert(done.args[0][0] === null, 'no error message given');
         });

         it('should populate user if correct username and password are given', function() {
            var username = 'test', password = 'test';
            var done = sinon.spy();

            loginValidator.validate_login(username, password, done);

            assert(done.args[0][1].id === 123, 'should populate a user with id 123');
         });

         it('should populate only the error message if credentials are bad', function() {
            var done = sinon.spy();

            loginValidator.validate_login('asdf', 'asdfasdfasdf', done);

            assert(done.args[0].length == 3);
            assert(done.args[0][0] === null);
            assert(done.args[0][1] === false);
            assert(done.args[0][2].message === 'Unauthenticated user', 'error message is populated');
         });
      });
   });
})();
