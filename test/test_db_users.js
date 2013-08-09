(function() {
   var MongoClient = require('mongodb').MongoClient
      , users = require('../app/db/users');

   before(function(done) {
      MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
         if (err) {
            throw err;
         }
         db.collection('users').remove({}, function(err, numberRemoved) {
            if (err) {
               throw err;
            }

            done();
         });
      });
   });

   describe('#all', function() {
      it('initially should be empty', function(done) {
         users.all(function(docs) {
            assert(docs.length === 0, 'should be empty, but was ' + docs.length);

            done();
         });
      });
   });

   describe('#add', function() {
      it('should add a user', function(done) {
         users.add({name: 'foo'}, function(newUser) {
            assert(newUser, 'should have created the new user');
            assert(newUser.name === 'foo', 'name should be correct, but was ' + newUser.name);
            users.all(function(allUsers) {
               assert(allUsers.length === 1, 'should have one user, but had ' + allUsers.length);

               done();
            });
         });
      });
   });
})();
