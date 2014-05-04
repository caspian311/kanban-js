   dbHelper = require '../../app/db/dbHelper'
   prefix = 'mongodb://localhost:27017/'

   describe "dbHelper", () ->
      before () ->
         this.origEnv = process.env.NODE_ENV
         process.env.MONGODB_URL = ''

      after () ->
         process.env.NODE_ENV = this.origEnv
         process.env.MONGODB_URL = ''

      describe '#getConnectionString', () ->
         it 'should use kanbanjs if no env is set', () ->
            process.env.NODE_ENV = ''

            connectionString = dbHelper.getConnectionString()

            connectionString.should.be.equal(prefix + 'kanbanjs')

         it 'should use test if set to test', () ->
            process.env.NODE_ENV = 'test'

            connectionString = dbHelper.getConnectionString()

            connectionString.should.be.equal(prefix + 'kanbanjs-test')

         it 'should use anything if set to anything', () ->
            process.env.NODE_ENV = 'foo bar baz'

            connectionString = dbHelper.getConnectionString()

            connectionString.should.be.equal(prefix + 'kanbanjs-foo bar baz')

         it 'should use complete env var if available', () ->
            url = 'mongo://user:pass@hostname:port/dbname'
            process.env.MONGODB_URL = url

            connectionString = dbHelper.getConnectionString()

            url.should.be.equal connectionString
