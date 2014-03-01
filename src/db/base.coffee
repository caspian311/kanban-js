MongoClient = require('mongodb').MongoClient
dbHelper = require './dbHelper'

class DbBase
   CONNECTION = undefined

   inConnection: (task) ->
      if CONNECTION == undefined
         MongoClient.connect dbHelper.getConnectionString(), (err, db) ->
            if err
               throw err
            CONNECTION = db
            task CONNECTION
      else
         task CONNECTION

module.exports = new DbBase
