userSerialization = require('../../app/authentication/user_serialization')

describe 'UserSerialization', () ->
   describe '#serialize', () ->
      it 'should pass the user to the callback', () ->
         user = 
            name: 'foo'
         callback = sinon.spy()

         userSerialization.serialize user, callback

         callback.calledWithExactly null, user

   describe '#deserialize', () ->
      it 'should pass the user to the callback', () ->
         user = 
            name: 'foo'
         callback = sinon.spy()

         userSerialization.deserialize user, callback

         callback.calledWithExactly null, user
