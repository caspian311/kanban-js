class Main
   main: (request, response) ->
      data =
         user: request.user
      response.render 'main', data

module.exports = new Main

