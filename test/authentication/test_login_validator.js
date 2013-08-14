(function() {
   var loginValidator = require('../../app/authentication/login_validator')
      , users = require('../../app/db/users')
      , findUserByCredentialsStub;

   describe('LoginValidator', function() {
      beforeEach(function() {
         findUserByCredentialsStub = sinon.stub(users, 'findUserByCredentials');
      });

      afterEach(function() {
         findUserByCredentialsStub.restore();
      });

      describe('#validate_login', function() {
         describe('when credentials are correct exists', function() {
            it('should find user with given username and password', function() {
               var username = 'user', password = 'pass'
                  , callback = sinon.spy();

               loginValidator.validate_login(username, password, callback);

               assert(findUserByCredentialsStub.calledWith(username, password));
            });

            it('should not populate an error message', function() {
               var callback = sinon.spy();

               loginValidator.validate_login('test', 'test', callback);
               findUserByCredentialsStub.args[0][2]([{}]);

               expect(callback.args[0][1]).to.be.ok;
            });

            it('should populate user', function() {
               var callback = sinon.spy();

               loginValidator.validate_login('test', 'test', callback);

               var expectedUser = {
                  id: 123
               };
               findUserByCredentialsStub.args[0][2]([expectedUser]);

               expect(callback.args[0][1]).to.deep.equal(expectedUser);
            });
         });

         describe('when no user matches the credentials given', function() {
            it('should populate only the error message if credentials are bad', function() {
               var callback = sinon.spy();

               loginValidator.validate_login('test', 'test', callback);

               findUserByCredentialsStub.args[0][2]([]);

               expect(callback.args[0]).to.have.length(3);
               expect(callback.args[0][0]).to.not.be.ok;
               expect(callback.args[0][1]).to.not.be.ok;
               expect(callback.args[0][2].message).to.equal('Unauthenticated user');
            });
         });
      });
   });
})();
