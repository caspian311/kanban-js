base = require('./base')

class Users
   allUsers: (callback) ->
      base.inConnection (db) ->
         db.collection('users').find().toArray (err, docs) ->
            if err
               throw err

            callback docs

   addUser: (user, callback) ->
      base.inConnection (db) ->
         db.collection('users').insert user, (err, users) ->
            if err
               throw err

            callback users[0]

   findUserByCredentials: (email, password, callback) ->
      base.inConnection (db) ->
         query = 
            email: email
            password: password
         db.collection('users').find(query).toArray (err, results) ->
            if err
               throw err

            callback results

   removeAllUsers: (callback) ->
      base.inConnection (db) ->
         db.collection('users').remove {}, () ->
            callback()

module.exports = new Users

