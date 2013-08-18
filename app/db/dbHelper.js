(function() {
   var DbHelper = function() {
      var db = function() {
         if (process.env.NODE_ENV === 'test') {
            return 'test';
         } else {
            return 'kanbanjs';
         }
      };

      this.getConnectionString = function() {
         return 'mongodb://localhost:27017/' + db();
      };
   };

   module.exports = new DbHelper();
})();
