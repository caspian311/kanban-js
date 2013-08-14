(function() {
   var registration = require('../../app/registration/registration')
      , users = require('../../app/db/users');

   describe('registration', function() {
      beforeEach(function() {
         sinon.stub(users, 'addUser');
      });

      afterEach(function() {
         users.addUser.restore();
      });

      describe('#create', function() {
         it('should create new user', function() {
            var request = { 
               body: { 
                  name: 'name',
                  email: 'email',
                  password: 'password',
                  password2: 'other password'
               } 
            };
            var expectedUser = {
               name: 'name',
               email: 'email',
               password: 'password'
            };


            registration.create(request, { redirect: function() {} });

            users.addUser.calledWith(expectedUser);
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
