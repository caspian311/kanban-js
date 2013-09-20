queuesDb = require '../db/queuesDb'

class Cards
   post: (request, response) ->
      newCard = {
         name: request.body.name,
         description: request.body.description
      }
      queuesDb.addCard request.body.stateId, newCard, () ->
         response.json { message: 'worky!' }

module.exports = new Cards()

