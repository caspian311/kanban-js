base = require './base'
ObjectID = require('mongodb').ObjectID

class Queues
   queuesForUser: (userId, callback) ->
      base.inConnection (db) ->
         db.collection('queues').find({ userId: userId }).toArray (err, docs) ->
            callback docs

   allQueues: (callback) ->
      base.inConnection (db) ->
         db.collection('queues').find().toArray (err, docs) ->
            if err
               throw err

            callback docs

   addQueue: (queue, callback) ->
      base.inConnection (db) ->
         db.collection('queues').insert queue, (err, queues) ->
            if err
               throw err

            callback queues[0]

   addCard: (stateId, newCard, callback) ->
      base.inConnection (db) ->
         queryObj =
            'states._id': new ObjectID stateId
         db.collection('queues').findOne queryObj, (err, queue) ->
               if err
                  throw err

               matchingStates = queue.states.filter (state) ->
                  return state._id.equals stateId
               state = matchingStates[0]

               state.cards.push newCard

               db.collection('queues').update { '_id': queue._id }, queue, { w: 0 }, callback

   updateQueue: (queue, callback) ->
      if queue.states && queue.states.length > 0
         queue.states = queue.states.map (state) ->
            if !state._id.toHexString
               state._id = new ObjectID state._id
            return state

      base.inConnection (db) ->
         db.collection('queues').update {'_id': queue._id}, queue, (err, numberOfUpdates) ->
            if err
               throw err

            callback numberOfUpdates

   removeAllQueues: (callback) ->
      base.inConnection (db) ->
         db.collection('queues').remove {}, () ->
            callback()

   deleteQueue: (id, callback) ->
      base.inConnection (db) ->
         db.collection('queues').remove { _id: new ObjectID(id) }, () ->
            callback()

module.exports = new Queues

