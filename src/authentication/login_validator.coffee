
users = require '../db/users'
encryptionUtils = require './encryption_utils'

class LoginValidation
   validate_login: (username, password, done) ->
      encryptedPassword = encryptionUtils.encrypt password
      users.findUserByCredentials username, encryptedPassword, (results) ->
         if results.length > 0
            done null, results[0];
         else
            done null, false, { message: 'Unauthenticated user' }

module.exports = new LoginValidation
