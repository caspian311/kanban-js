authenticateRequest = require '../../app/authentication/authenticate_request'

describe 'authenticateRequest', () ->
   describe 'already authenticated user', () ->
      it 'should call the next callback', () ->
         request = 
            user: {}
         next = sinon.spy()

         authenticateRequest request, {}, next

         assert next.called

   describe 'unauthenticated user', () ->
      it 'should redirect to the /login path', () ->
         response = {}
         response.redirect = sinon.spy()

         authenticateRequest {}, response, sinon.spy()

         assert(response.redirect.calledWithExactly '/login')

   describe 'unauthenticated user trying to login', () ->
      it 'should be allowed to try to login in ', () ->
         request = 
            path: '/login'

         next = sinon.spy()

         authenticateRequest request, {}, next

         assert next.called
