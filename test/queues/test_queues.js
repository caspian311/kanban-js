(function() {
   var queues = require('../../app/queues/queues')
      , queuesDb = require('../../app/db/queues');

   describe('queues', function() {
      beforeEach(function() {
         sinon.stub(queuesDb, 'addQueue');
      });

      afterEach(function() {
         queuesDb.addQueue.restore();
      });

      describe('#post', function() {
         it('should create new queue', function() {
            var request = { 
               body: { 
                  name: 'name',
                  description: 'desc'
               } 
            };
            var expectedQueue = {
               name: 'name',
               description: 'desc'
            };

            queues.post(request, { redirect: function() {} });

            queuesDb.addQueue.calledWith(expectedQueue);
         });

         it('should response with positive message', function() {
            var request = { body: {} };
            var response = { json: sinon.spy() };

            queues.post(request, response);
            queuesDb.addQueue.args[0][1]();
            var responseMessage = response.json.args[0][0];

            responseMessage.message.should.equal('worky!');
         });
      });
   });
})();

