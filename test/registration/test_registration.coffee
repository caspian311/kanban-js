registration = require('../../app/registration/registration')
users = require('../../app/db/users')
encryptionUtils = require('../../app/authentication/encryption_utils')

describe 'registration', () ->
   beforeEach () ->
      sinon.stub(users, 'addUser')
      this.encryptStub = sinon.stub(encryptionUtils, 'encrypt')

   afterEach () ->
      users.addUser.restore()
      encryptionUtils.encrypt.restore()

   describe '#create', () ->
      it 'should create new user with encrypted password', () ->
         request = 
            body: 
               name: 'name',
               email: 'email',
               password: 'password',
               password2: 'other password'

         encryptedPassword = 'enc'
         this.encryptStub.withArgs(request.body.password).returns(encryptedPassword)

         expectedUser = 
            name: 'name',
            email: 'email',
            password: encryptedPassword

         response = 
            redirect: () ->

         registration.create(request, response)

         users.addUser.args[0][0].should.deep.equal(expectedUser)

      it 'should redirect to login page', () ->
         request = 
            body: {} 
         response = 
            redirect: sinon.spy()

         registration.create(request, response)
         users.addUser.args[0][1]()

         assert(response.redirect.calledWithExactly('/login?created_user_successfully=true'))

