passport = require 'passport'
callbackGenerator = require './callback_generator.js'

class Login
   form:  (request, response) ->
      data =
         bad_login: request.query.bad_login
         created_user_successfully: request.query.created_user_successfully
      response.render 'form', data

   submit: (request, response, next) ->
      callback = callbackGenerator.generateCallback request, response
      auth = passport.authenticate 'local', callback
      auth request, response, next

module.exports = new Login

