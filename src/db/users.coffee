base = require('./base');
class Users
   allUsers: (callback) ->
      base.inConnection (db, done) ->
         db.collection('users').find().toArray (err, docs) ->
            if err
               throw err

            callback docs
            done()

   addUser: (user, callback) ->
      base.inConnection (db, done) ->
         db.collection('users').insert user, (err, users) ->
            if err
               throw err

            callback users[0]
            done()

   findUserByCredentials: (email, password, callback) ->
      base.inConnection (db, done) ->
         query = 
            email: email
            password: password
         db.collection('users').find(query).toArray (err, results) ->
            if err
               throw err

            callback results
            done()

   removeAllUsers: (callback) ->
      base.inConnection (db, done) ->
         db.collection('users').remove {}, () ->
            callback()
            done()

module.exports = new Users

