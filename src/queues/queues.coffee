ObjectID = require('mongodb').ObjectID
queuesDb = require '../db/queuesDb'

class Queues
   get: (request, response) ->
      queuesDb.allQueues (queues) ->
         response.json queues

   post: (request, response) ->
      queuesDb.addQueue parseQueue(request), () ->
         data =
            message: 'worky!'
         response.json data

   parseQueue = (request) ->
      queue =
         userId: request.user._id,
         name: request.body.name
         description: request.body.description
         states: request.body.states.map mapState
         creationDate: new Date()

   mapState = (state) ->
      if  !state._id
         state._id = new ObjectID()
      if !state.cards
         state.cards = []
      return state

   put: (request, response) ->
      queue =
         _id: new ObjectID(request.body.id)
         name: request.body.name
         description: request.body.description
         states: request.body.states.map mapState
         creationDate: request.body.creationDate

      queuesDb.updateQueue queue, () ->
         data =
           message: 'worky!'
         response.json data

   del: (request, response) ->
      queuesDb.deleteQueue request.params['id'], () ->
         data =
            message: 'worky!'
         response.json data

module.exports = new Queues

