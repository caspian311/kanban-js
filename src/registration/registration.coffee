users = require '../db/users'
encryptionUtils = require '../../app/authentication/encryption_utils'

class Registration
   form: (request, response) ->
      response.render 'form'

   create: (request, response) ->
      user =
         name: request.body.name
         email: request.body.email
         password: encryptionUtils.encrypt request.body.password
      users.addUser user, () ->
         response.redirect '/login?created_user_successfully=true'

module.exports = new Registration
