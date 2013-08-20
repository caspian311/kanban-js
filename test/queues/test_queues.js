(function() {
   var queues = require('../../app/queues/queues')
      , queuesDb = require('../../app/db/queues')
      , ObjectID = require('mongodb').ObjectID;

   describe('queues', function() {
      beforeEach(function() {
         this.allQueuesStub = sinon.stub(queuesDb, 'allQueues');
         sinon.stub(queuesDb, 'addQueue');
         sinon.stub(queuesDb, 'updateQueue');
      });

      afterEach(function() {
         queuesDb.allQueues.restore();
         queuesDb.addQueue.restore();
         queuesDb.updateQueue.restore();
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
                  id: null,
                  name: 'name',
                  description: 'desc'
               } 
            };
            var expectedQueue = {
               name: 'name',
               description: 'desc'
            };

            queues.post(request, { redirect: function() {} });

            queuesDb.addQueue.args[0][0].should.deep.equal(expectedQueue);
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

      describe('#put', function() {
         it('should update an existing queue', function() {
            var id = '4e4e1638c85e808431000003';
            var request = { 
               body: { 
                  id: id,
                  name: 'name',
                  description: 'desc',
                  states: [{ name: 'abc' }]
               } 
            };
            var expectedQueue = {
               _id: new ObjectID(id),
               name: 'name',
               description: 'desc',
               states: [{ name: 'abc' }]
            };

            queues.put(request, { json: function() {} });

            queuesDb.updateQueue.args[0][0].should.deep.equal(expectedQueue);
         });

         it('should response with positive message', function() {
            var request = { body: {} };
            var response = { json: sinon.spy() };

            queues.put(request, response);
            queuesDb.updateQueue.args[0][1]();

            var responseMessage = response.json.args[0][0];
            responseMessage.message.should.equal('worky!');
         });
      });
   });
})();

