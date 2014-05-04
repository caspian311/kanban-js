class DbHelper
   db = () ->
      dbName = 'kanbanjs'

      if process.env.NODE_ENV
         dbName = dbName + '-' + process.env.NODE_ENV

      return dbName

   getConnectionString: () ->
      if process.env.MONGODB_URL
         return process.env.MONGODB_URL
      else
         return 'mongodb://localhost:27017/' + db()

module.exports = new DbHelper

