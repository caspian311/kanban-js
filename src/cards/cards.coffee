cardsDb = require '../db/cardsDb'

class Cards
   post: (request, response) ->
      newCard = {
         name: request.body.name,
         description: request.body.description
      }
      cardsDb.addCard request.body.stateId, newCard, () ->
         response.json { message: 'worky!' }

   get: (request, response) =>
      cardsDb.getCard request.params['id'], (data) ->
         response.json data

module.exports = new Cards()

