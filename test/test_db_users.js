(function() {
   var users = require('../app/db/users');

   describe('#all', function() {
      it('initially should be empty', function(done) {
         users.all(function(err, docs) {
            assert(!err, 'errored out!');
            assert(docs.length === 0, 'should be empty, but was ' + docs.length);
         });
      });
   });

   describe('#add', function() {
      it('should add a user', function() {
      });
   });
})();
