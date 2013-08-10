(function() {
   var base = require('./base');
   var Users = function() {
   };
   Users.prototype = base.prototype;
   Users.prototype.all = function(callback) {
      this.inConnection(function(db) {
         db.collection('users').find().toArray(function(err, docs) {
            if (err) {
               throw err;
            }

            callback(docs);
         });
      });
   };
   Users.prototype.add = function(user, callback) {
      this.inConnection(function(db) {
         db.collection('users').insert(user, function(err, users) {
            if (err) {
               throw err;
            }
            callback(users[0]);
         });
      });
   };


   module.exports = new Users();
})();
