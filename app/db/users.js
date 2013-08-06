(function() {
   var base = require('./base');
   var Users = function() {
   };
   Users.prototype = base.prototype;
   Users.prototype.all = function(callback) {
      this.inConnection(function(err, db) {
         var collection = db.collection('users');
         collection.find().toArray(callback);
      });
   };
   Users.prototype.add = function(user, callback) {
      this.inConnection(function(err, db) {
         var collection = db.collection('users');
         collection.insert(user, callback);
      });
   };


   module.exports = new Users();
})();
