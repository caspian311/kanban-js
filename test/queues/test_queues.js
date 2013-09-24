(function() {
   var queues = require('../../app/queues/queues')
      , queuesDb = require('../../app/db/queuesDb')
      , ObjectID = require('mongodb').ObjectID;

   describe('queues', function() {
      beforeEach(function() {
         this.queuesForUserStub = sinon.stub(queuesDb, 'queuesForUser');
         sinon.stub(queuesDb, 'addQueue');
         sinon.stub(queuesDb, 'updateQueue');
         sinon.stub(queuesDb, 'deleteQueue');
      });

      afterEach(function() {
         queuesDb.queuesForUser.restore();
         queuesDb.addQueue.restore();
         queuesDb.updateQueue.restore();
         queuesDb.deleteQueue.restore();
      });

      describe('#get', function() {
         it('should get all queues in json format', function() {
            var request = { user: { _id: new ObjectID() } };
            var response = { json: sinon.spy() };

            queues.get(request, response);

            var allQueues = [{foo: 'bar'}, {fuzz: 'bucket'}];
            this.queuesForUserStub.args[0][1](allQueues);

            response.json.args[0][0].should.deep.equal(allQueues);
         });

         it('should pass in userid as parameter', function() {
            var request = { user: { _id: new ObjectID() } };

            queues.get(request, {});

            this.queuesForUserStub.args[0][0].should.equal(request.user._id);
         });
      });

      describe('#post', function() {
         it('should create new queue', function() {
            var request = { 
               user: {
                  _id: new ObjectID()
               },
               body: { 
                  id: null,
                  name: 'name',
                  description: 'desc',
                  states: [{ name: 'abc' }]
               } 
            };
            var expectedQueue = {
               name: 'name',
               userId: request.user._id,
               description: 'desc',
               states: [{ name: 'abc', cards: [] }]
            };

            queues.post(request, { redirect: function() {} });

            var receivedQueue = queuesDb.addQueue.args[0][0];
            receivedQueue.userId.should.equal(expectedQueue.userId);
            receivedQueue.name.should.equal(expectedQueue.name);
            receivedQueue.description.should.equal(expectedQueue.description);
            receivedQueue.states.length.should.equal(1);
            receivedQueue.states[0].name.should.equal('abc');
            receivedQueue.states[0].cards.length.should.equal(0);
            assert((new Date().getTime() - receivedQueue.creationDate.getTime()) < 1000)
         });

         it('should respond with positive message', function() {
            var request = { user: {}, body: { states: [] } };
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
               user: {
                  _id: new ObjectID()
               },
               body: { 
                  id: id,
                  name: 'name',
                  description: 'desc',
                  states: [{ _id: '123', name: 'abc' }],
                  creationDate: 'foo'
               } 
            };
            var expectedQueue = {
               _id: new ObjectID(id),
               userId: request.user._id,
               name: 'name',
               description: 'desc',
               states: [{ _id: '123', name: 'abc', cards: [] }],
               creationDate: 'foo'
            };

            queues.put(request, { json: function() {} });

            queuesDb.updateQueue.args[0][0].should.deep.equal(expectedQueue);
         });

         it('should response with positive message', function() {
            var request = { user: {}, body: { states: [] } };
            var response = { json: sinon.spy() };

            queues.put(request, response);
            queuesDb.updateQueue.args[0][1]();

            var responseMessage = response.json.args[0][0];
            responseMessage.message.should.equal('worky!');
         });
      });

      describe('#del', function() {
         it('should delete an existing queue by id', function() {
            var id = '4e4e1638c85e808431000003';
            var request = { 
               params: { id: id }
            };

            queues.del(request, { json: function() {} });

            queuesDb.deleteQueue.args[0][0].should.equal(id);
         });

         it('should response with positive message', function() {
            var request = { 
               params: {
                  id: {}
               }
            };
            var response = { json: sinon.spy() };

            queues.del(request, response);
            queuesDb.deleteQueue.args[0][1]();

            var responseMessage = response.json.args[0][0];
            responseMessage.message.should.equal('worky!');
         });
      });
   });
})();

