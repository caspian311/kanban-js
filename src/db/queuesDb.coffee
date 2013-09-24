base = require './base'
ObjectID = require('mongodb').ObjectID

class Queues
   queuesForUser: () ->

   allQueues: (callback) ->
      base.inConnection (db, done) ->
         db.collection('queues').find().toArray (err, docs) ->
            if err
               throw err

            callback docs
            done()

   addQueue: (queue, callback) ->
      base.inConnection (db, done) ->
         db.collection('queues').insert queue, (err, queues) ->
            if err
               throw err

            callback queues[0]
            done()

   addCard: (stateId, newCard, callback) ->
      base.inConnection (db, done) ->
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

               done()

   updateQueue: (queue, callback) ->
      if queue.states && queue.states.length > 0
         queue.states = queue.states.map (state) ->
            if !state._id.toHexString
               state._id = new ObjectID state._id
            return state

      base.inConnection (db, done) ->
         db.collection('queues').update {'_id': queue._id}, queue, (err, numberOfUpdates) ->
            if err
               throw err

            callback numberOfUpdates
            done()

   removeAllQueues: (callback) ->
      base.inConnection (db, done) ->
         db.collection('queues').remove {}, () ->
            callback()
            done()

   deleteQueue: (id, callback) ->
      base.inConnection (db, done) ->
         db.collection('queues').remove { _id: new ObjectID(id) }, () ->
            callback()

module.exports = new Queues

