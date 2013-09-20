class CallbackGenerator
   generateCallback: (request, response) ->
      callback = (authError, user, info) ->
         if  authError || !user
            console.log 'authentication error: ' + authError
            return response.redirect '/login?bad_login=true'

         request.login user, (loginError) ->
            if loginError
               console.log 'login error: ' + loginError
               return response.redirect '/login?bad_login=true'

            return response.redirect '/'

      return callback

module.exports = new CallbackGenerator

