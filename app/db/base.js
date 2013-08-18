(function() {
   var MongoClient = require('mongodb').MongoClient;

   var base = function() {
   };
   base.prototype.inConnection = function(task) {
      MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
         if (err) {
            throw err;
         }
         task(db, function() {
            db.close();
         });
      });
   };

   module.exports = base;
})();

