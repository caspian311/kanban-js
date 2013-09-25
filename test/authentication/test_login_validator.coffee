loginValidator = require('../../app/authentication/login_validator')
encryptionUtils = require('../../app/authentication/encryption_utils')
users = require('../../app/db/users')

describe 'LoginValidator', () ->
   beforeEach () ->
      this.findUserByCredentialsStub = sinon.stub(users, 'findUserByCredentials')
      this.encryptStub = sinon.stub(encryptionUtils, 'encrypt')

   afterEach () ->
      this.findUserByCredentialsStub.restore()
      encryptionUtils.encrypt.restore()

   describe '#validate_login', () ->
      describe 'when credentials are correct exists', () ->
         it 'should find user with given username and password', () ->
            username = 'user' 
            password = 'pass'
            callback = sinon.spy()

            encryptedPassword = 'this is an encrypted password'
            this.encryptStub.withArgs(password).returns(encryptedPassword)

            loginValidator.validate_login(username, password, callback)

            assert(this.findUserByCredentialsStub.calledWith(username, encryptedPassword))

         it 'should not populate an error message', () ->
            callback = sinon.spy()

            loginValidator.validate_login('test', 'test', callback)
            this.findUserByCredentialsStub.args[0][2]([{}])

            expect(callback.args[0][1]).to.be.ok

         it 'should populate user', () ->
            callback = sinon.spy()

            loginValidator.validate_login('test', 'test', callback)

            expectedUser =
               id: 123
            this.findUserByCredentialsStub.args[0][2]([expectedUser])

            expect(callback.args[0][1]).to.deep.equal(expectedUser)

      describe 'when no user matches the credentials given', () ->
         it 'should populate only the error message if credentials are bad', () ->
            callback = sinon.spy()

            loginValidator.validate_login('test', 'test', callback)

            this.findUserByCredentialsStub.args[0][2]([])

            expect(callback.args[0]).to.have.length(3)
            expect(callback.args[0][0]).to.not.be.ok
            expect(callback.args[0][1]).to.not.be.ok
            expect(callback.args[0][2].message).to.equal('Unauthenticated user')

