(function() {
   var base = require('./base');
   var Users = function() {
   };
   Users.prototype = base.prototype;
   Users.prototype.allUsers = function(callback) {
      this.inConnection(function(db, done) {
         db.collection('users').find().toArray(function(err, docs) {
            if (err) {
               throw err;
            }

            callback(docs);
            done();
         });
      });
   };
   Users.prototype.addUser = function(user, callback) {
      this.inConnection(function(db, done) {
         db.collection('users').insert(user, function(err, users) {
            if (err) {
               throw err;
            }
            callback(users[0]);
            done();
         });
      });
   };
   Users.prototype.findUserByCredentials = function(email, password, callback) {
      this.inConnection(function(db, done) {
         var query = { email: email, password: password };
         db.collection('users').find(query).toArray(function(err, results) {
            if (err) {
               throw err;
            }
            callback(results);
            done();
         });
      });
   };


   module.exports = new Users();
})();
