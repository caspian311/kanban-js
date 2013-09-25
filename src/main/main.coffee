class Main
   main: (request, response) ->
      data =
         user: request.user
      response.render 'index', data

module.exports = new Main

