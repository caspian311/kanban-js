(function() {
   var DbHelper = function() {
      this.getConnectionString = function() {
         return 'mongodb://localhost:27017/test'
      };
   };

   module.exports = new DbHelper();
})();
