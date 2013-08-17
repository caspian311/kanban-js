(function() {
   var base = require('./base');
   var Users = function() {
   };
   Users.prototype = base.prototype;
   Users.prototype.allUsers = function(callback) {
      this.inConnection(function(db) {
         db.collection('users').find().toArray(function(err, docs) {
            if (err) {
               throw err;
            }

            callback(docs);
         });
      });
   };
   Users.prototype.addUser = function(user, callback) {
      this.inConnection(function(db) {
         db.collection('users').insert(user, function(err, users) {
            if (err) {
               throw err;
            }
            callback(users[0]);
         });
      });
   };
   Users.prototype.findUserByCredentials = function(email, password, callback) {
      this.inConnection(function(db) {
         var query = { email: email, password: password };
         db.collection('users').find(query).toArray(function(err, results) {
            if (err) {
               throw err;
            }
            callback(results);
         });
      });
   };


   module.exports = new Users();
})();
