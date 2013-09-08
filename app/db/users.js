(function() {
   var base = require('./base');
   var Users = function() {
      var self = this;

      self.allUsers = function(callback) {
         base.inConnection(function(db, done) {
            db.collection('users').find().toArray(function(err, docs) {
               if (err) {
                  throw err;
               }

               callback(docs);
               done();
            });
         });
      };

      self.addUser = function(user, callback) {
         base.inConnection(function(db, done) {
            db.collection('users').insert(user, function(err, users) {
               if (err) {
                  throw err;
               }
               callback(users[0]);
               done();
            });
         });
      };

      self.findUserByCredentials = function(email, password, callback) {
         base.inConnection(function(db, done) {
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

      self.removeAllUsers = function(callback) {
         base.inConnection(function(db, done) {
            db.collection('users').remove({}, function() {
               callback();
               done();
            });
         });
      };
   };


   module.exports = new Users();
})();
