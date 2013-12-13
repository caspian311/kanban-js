base = require './base'
inspect = require('util').inspect
ObjectID = require('mongodb').ObjectID

class Cards
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

   getCard: (cardId, callback) ->
      base.inConnection (db, done) ->
         query = { 'states.cards._id': cardId }
         projection = { 'states.cards.$': 1 }

         db.collection('queues').find(query, projection).toArray (err, docs) ->
            card = (docs[0].states[0].cards.filter (c) -> c._id.equals cardId)[0]
            callback card
            done()

module.exports = new Cards

