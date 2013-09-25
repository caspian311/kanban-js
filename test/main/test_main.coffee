main = require '../../app/main/main'

describe 'main', () ->
   describe '#main', () ->
      it 'should render main page', () ->
         request = {}
         response = 
            render: sinon.spy()

         main.main request, response

         response.render.args[0][0].should.equal('main')

