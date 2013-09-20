class UserSerialization
   serialize: (user, done) ->
      done null, user

   deserialize: (user, done) ->
      done null, user

module.exports = new UserSerialization

