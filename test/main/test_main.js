(function() {
   var main = require('../../app/main/main');

   describe('main', function() {
      describe('#main', function() {
         it('should render main page', function() {
            var request = {};
            var response = { render: sinon.spy() };

            main.main(request, response);

            response.render.args[0][0].should.equal('main');
         });
      });
   });
})();

