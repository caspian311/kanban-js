(function() {
   var registration = require('../../app/registration/registration')
      , users = require('../../app/db/users')
      , encryptionUtils = require('../../app/authentication/encryption_utils');

   describe('registration', function() {
      beforeEach(function() {
         sinon.stub(users, 'addUser');
         this.encryptStub = sinon.stub(encryptionUtils, 'encrypt');
      });

      afterEach(function() {
         users.addUser.restore();
         encryptionUtils.encrypt.restore();
      });

      describe('#create', function() {
         it('should create new user with encrypted password', function() {
            var request = { 
               body: { 
                  name: 'name',
                  email: 'email',
                  password: 'password',
                  password2: 'other password'
               } 
            };

            var encryptedPassword = 'enc';
            this.encryptStub.withArgs(request.body.password).returns(encryptedPassword);

            var expectedUser = {
               name: 'name',
               email: 'email',
               password: encryptedPassword
            };

            registration.create(request, { redirect: function() {} });

            users.addUser.args[0][0].should.deep.equal(expectedUser);
         });

         it('should redirect to login page', function() {
            var request = { body: {} };
            var response = { redirect: sinon.spy() };

            registration.create(request, response);
            users.addUser.args[0][1]();

            assert(response.redirect.calledWithExactly('/login?created_user_successfully=true'));
         });
      });
   });
})();
