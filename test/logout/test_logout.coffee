logout = require '../../app/logout/logout'

describe 'Logout', () ->
   request = 
      logout: sinon.spy()
   response = 
      redirect: sinon.spy()

   describe '#logout', () ->
      it 'should call logout on request', () ->
         logout.logout request, response

         assert request.logout.called

      it 'should redirect to login screen', () ->
         logout.logout request, response

         assert response.redirect.calledWith('/login')

