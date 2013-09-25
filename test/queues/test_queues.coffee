   queues = require('../../app/queues/queues')
   queuesDb = require('../../app/db/queuesDb')
   ObjectID = require('mongodb').ObjectID

   describe 'queues', () ->
      beforeEach () ->
         this.queuesForUserStub = sinon.stub(queuesDb, 'queuesForUser')
         sinon.stub(queuesDb, 'addQueue')
         sinon.stub(queuesDb, 'updateQueue')
         sinon.stub(queuesDb, 'deleteQueue')

      afterEach () ->
         queuesDb.queuesForUser.restore()
         queuesDb.addQueue.restore()
         queuesDb.updateQueue.restore()
         queuesDb.deleteQueue.restore()

      describe '#get', () ->
         it 'should get all queues in json format', () ->
            request = 
               user: 
                  _id: new ObjectID() 
            response = 
                  json: sinon.spy()

            queues.get(request, response)

            allQueues = [ {foo: 'bar'}, {fuzz: 'bucket'} ]
            this.queuesForUserStub.args[0][1](allQueues)

            response.json.args[0][0].should.deep.equal(allQueues)

         it 'should pass in userid as parameter', () ->
            request = 
               user: 
                  _id: new ObjectID()

            queues.get(request, {})

            this.queuesForUserStub.args[0][0].should.equal(request.user._id)

      describe '#post', () ->
         it 'should create new queue', () ->
            request = 
               user: 
                  _id: new ObjectID()
               body: 
                  id: null
                  name: 'name'
                  description: 'desc'
                  states: [{ name: 'abc' }]
            expectedQueue = 
               name: 'name'
               userId: request.user._id
               description: 'desc'
               states: [{ name: 'abc', cards: [] }]

            response = 
               redirect: () ->
            queues.post(request, response)

            receivedQueue = queuesDb.addQueue.args[0][0]
            receivedQueue.userId.should.equal(expectedQueue.userId)
            receivedQueue.name.should.equal(expectedQueue.name)
            receivedQueue.description.should.equal(expectedQueue.description)
            receivedQueue.states.length.should.equal(1)
            receivedQueue.states[0].name.should.equal('abc')
            receivedQueue.states[0].cards.length.should.equal(0)
            assert((new Date().getTime() - receivedQueue.creationDate.getTime()) < 1000)

         it 'should respond with positive message', () ->
            request = 
               user: {}
               body: 
                  states: []
            response = 
               json: sinon.spy()

            queues.post(request, response)
            queuesDb.addQueue.args[0][1]()
            responseMessage = response.json.args[0][0]

            responseMessage.message.should.equal('worky!')

      describe '#put', () ->
         it 'should update an existing queue', () ->
            id = '4e4e1638c85e808431000003'
            request = 
               user: 
                  _id: new ObjectID()
               body: 
                  id: id
                  name: 'name'
                  description: 'desc'
                  states: [{ _id: '123', name: 'abc' }]
                  creationDate: 'foo'
            expectedQueue = 
               _id: new ObjectID(id)
               userId: request.user._id
               name: 'name'
               description: 'desc'
               states: [{ _id: '123', name: 'abc', cards: [] }]
               creationDate: 'foo'

            response = 
               json: () ->
            queues.put(request, response)

            queuesDb.updateQueue.args[0][0].should.deep.equal(expectedQueue)

         it 'should response with positive message', () ->
            request = 
               user: {}
               body: 
                  states: []
            response = 
               json: sinon.spy()

            queues.put(request, response)
            queuesDb.updateQueue.args[0][1]()

            responseMessage = response.json.args[0][0]
            responseMessage.message.should.equal('worky!')

      describe '#del', () ->
         it 'should delete an existing queue by id', () ->
            id = '4e4e1638c85e808431000003'
            request = 
               params: 
                  id: id

            response =
               json: () ->
            queues.del(request, response)

            queuesDb.deleteQueue.args[0][0].should.equal(id)

         it 'should response with positive message', () ->
            request = 
               params: 
                  id: {}
            response = 
               json: sinon.spy()

            queues.del(request, response)
            queuesDb.deleteQueue.args[0][1]()

            responseMessage = response.json.args[0][0]
            responseMessage.message.should.equal('worky!')

