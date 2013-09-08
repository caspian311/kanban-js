(function() {
   var usersDb = require('../../app/db/users')
      , queuesDb = require('../../app/db/queuesDb');

   var DataSetup = function() {
      var removeAllUsers = function(callback) {
         usersDb.removeAll(callback);
      };
      var removeAllUsers = function(callback) {
         queuesDb.removeAll(callback);
      };

      this.Before = function(callback) {
         removeAllUsers(function() {
            removeAllQueues(callback);
         });
      };
   };

   exports.DataSetup = DataSetup;
})();
