(function() {
   var DbHelper = function() {
      var db = function() {
         var dbName = 'kanbanjs';

         if (process.env.NODE_ENV) {
            dbName = dbName + '-' + process.env.NODE_ENV;
         }

         return dbName;
      };

      this.getConnectionString = function() {
         return 'mongodb://localhost:27017/' + db();
      };
   };

   module.exports = new DbHelper();
})();
