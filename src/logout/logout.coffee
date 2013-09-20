class Logout
   logout: (request, response) ->
      request.logout()
      response.redirect '/login'

module.exports = new Logout
