(function() {
   var MongoClient = require('mongodb').MongoClient
      , dbHelper = require('./dbHelper');

   var DbBase = function() {
      this.inConnection = function(task) {
         MongoClient.connect(dbHelper.getConnectionString(), function(err, db) {
            if (err) {
               throw err;
            }
            task(db, function() {
               db.close();
            });
         });
      };
   };

   module.exports = new DbBase();
})();

