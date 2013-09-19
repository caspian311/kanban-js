MongoClient = require('mongodb').MongoClient
dbHelper = require './dbHelper'

class DbBase
   inConnection: (task) ->
      MongoClient.connect dbHelper.getConnectionString(), (err, db) ->
         if err
            throw err

         task db, () ->
            db.close()

module.exports = new DbBase
