(function() {
   var userSerialization = require('../../app/authentication/user_serialization');

   describe('UserSerialization', function() {
      describe('#serialize', function() {
         it('should pass the user to the callback', function() {
            var user = { name: 'foo' }
               , callback = sinon.spy();

            userSerialization.serialize(user, callback);

            callback.calledWithExactly(null, user);
         });
      });

      describe('#deserialize', function() {
         it('should pass the user to the callback', function() {
            var user = { name: 'foo' }
               , callback = sinon.spy();

            userSerialization.deserialize(user, callback);

            callback.calledWithExactly(null, user);
         });
      });
   });
})();
