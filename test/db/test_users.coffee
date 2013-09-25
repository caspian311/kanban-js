MongoClient = require('mongodb').MongoClient
users = require('../../app/db/users')

describe "users", () ->
   cleanUp = (done) ->
      users.removeAllUsers done

   beforeEach cleanUp
   afterEach cleanUp

   describe '#allUsers', () ->
      it 'initially should be empty', (done) ->
         users.allUsers (docs) ->
            assert docs.length is 0, 'should be empty, but was ' + docs.length

            done()

   describe '#add', () ->
      it 'should add a user', (done) ->
         user =
            name: 'foo'
         users.addUser user, (newUser) ->
            assert newUser, 'should have created the new user'
            assert newUser.name is 'foo', 'name should be correct, but was ' + newUser.name
            users.allUsers (allUsers) ->
               assert allUsers.length is 1, 'should have one user, but had ' + allUsers.length

               done()

   describe '#findByCredentials', () ->
      it 'should find user with matching credentials', (done) ->
         user1 = 
            id: 1
            email: 'email1'
            password: 'pass1'
         user2 = 
            id: 2
            email: 'email2'
            password: 'pass1'
         user3 = 
            id: 3
            email: 'email1'
            password: 'pass2'
         users.addUser [user1, user2, user3], () ->
            users.findUserByCredentials 'email2', 'pass1', (results) ->
               results.should.have.length(1)
               results[0].id.should.equal(2)

               done()

      it 'should return empty list if no users match the results', (done) ->
         users.findUserByCredentials 'email', 'pass', (results) ->
            results.should.have.length(0)

            done()

