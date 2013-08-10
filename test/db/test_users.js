(function() {
   var MongoClient = require('mongodb').MongoClient
      , users = require('../../app/db/users');

   describe("users", function() {
      var cleanUp = function(done) {
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
      };

      before(cleanUp);
      after(cleanUp);

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

      describe('#findByCredentials', function() {
         it('should find user with matching credentials', function(done) {
            var user1 = {
               id: 1,
               email: 'email1',
               password: 'pass1'
            };
            var user2 = {
               id: 2,
               email: 'email2',
               password: 'pass1'
            };
            var user3 = {
               id: 3,
               email: 'email1',
               password: 'pass2'
            };
            users.add([user1, user2, user3], function() {
               users.findByCredentials('email2', 'pass1', function(results) {
                  results.should.have.length(1);
                  results[0].id.should.equal(2);

                  done();
               });
            });
         });

         it('should return empty list if no users match the results', function(done) {
            users.findByCredentials('email', 'pass', function(results) {
               results.should.have.length(0);

               done();
            });
         });

      });
   });
})();
