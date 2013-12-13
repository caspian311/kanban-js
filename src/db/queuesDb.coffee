base = require './base'
inspect = require('util').inspect
ObjectID = require('mongodb').ObjectID

class Queues
   queuesForUser: (userId, callback) ->
      base.inConnection (db, done) ->
         db.collection('queues').find({ userId: userId }).toArray (err, docs) ->
            callback docs
            done()

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

               newCard._id = new ObjectID()
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

   getCard: (cardId, callback) ->
      base.inConnection (db, done) ->
         query = { 'states.cards._id': cardId }
         projection = { 'states.cards.$': 1 }

         db.collection('queues').find(query, projection).toArray (err, docs) ->
            console.log 'docs: ' + inspect docs[0].states[0].cards
            card = docs[0]['states'][0]['cards'][0]
            console.log 'card: ' + inspect card
            callback card
            done()

module.exports = new Queues

