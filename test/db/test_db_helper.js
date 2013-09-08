(function() {
   var dbHelper = require('../../app/db/dbHelper');

   var prefix = 'mongodb://localhost:27017/';

   describe("dbHelper", function() {
      before(function() {
         this.origEnv = process.env.NODE_ENV;
      });

      after(function() {
         process.env.NODE_ENV = this.origEnv;
      });

      describe('#getConnectionString', function() {
         it('should use kanbanjs if no env is set', function() {
            process.env.NODE_ENV = '';

            var connectionString = dbHelper.getConnectionString();

            connectionString.should.be.equal(prefix + 'kanbanjs');
         });

         it('should use test if set to test', function() {
            process.env.NODE_ENV = 'test';

            var connectionString = dbHelper.getConnectionString();

            connectionString.should.be.equal(prefix + 'kanbanjs-test');
         });

         it('should use anything if set to anything', function() {
            process.env.NODE_ENV = 'foo bar baz';

            var connectionString = dbHelper.getConnectionString();

            connectionString.should.be.equal(prefix + 'kanbanjs-foo bar baz');
         });
      });
   });
})();
