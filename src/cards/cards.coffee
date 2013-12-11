queuesDb = require '../db/queuesDb'

class Cards
   post: (request, response) ->
      newCard = {
         name: request.body.name,
         description: request.body.description
      }
      queuesDb.addCard request.body.stateId, newCard, () ->
         response.json { message: 'worky!' }

   get: (request, response) =>
      queuesDb.getCard request.params['id'], (data) ->
         response.json data

module.exports = new Cards()

