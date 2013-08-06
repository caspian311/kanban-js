(function() {
   var MongoClient = require('mongodb').MongoClient;

   var base = function() {
   };
   base.prototype.inConnection = function(task) {
      MongoClient.connect('mongodb://localhost:27017/test', task);
   };

   module.exports = base;
})();

