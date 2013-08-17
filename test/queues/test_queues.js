(function() {
   var queues = require('../../app/queues/queues')
      , queuesDb = require('../../app/db/queues');

   describe('queues', function() {
      beforeEach(function() {
         this.allQueuesStub = sinon.stub(queuesDb, 'allQueues');
         sinon.stub(queuesDb, 'addQueue');
      });

      afterEach(function() {
         queuesDb.allQueues.restore();
         queuesDb.addQueue.restore();
      });

      describe('#get', function() {
         it('should get all queues in json format', function() {
            var response = { 
               json: sinon.spy()
            };

            queues.get({}, response);

            var allQueues = [{foo: 'bar'}, {fuzz: 'bucket'}];
            this.allQueuesStub.args[0][0](allQueues);

            response.json.args[0][0].should.deep.equal(allQueues);
         });
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

