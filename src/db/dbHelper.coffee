class DbHelper
   db = () ->
      dbName = 'kanbanjs'

      if process.env.NODE_ENV
         dbName = dbName + '-' + process.env.NODE_ENV

      return dbName

   getConnectionString: () ->
      return 'mongodb://localhost:27017/' + db()

module.exports = new DbHelper

