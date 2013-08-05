(function() {
   var login = function() {
      this.index = function(request, response) {
         response.render('form');
      };
   };

   module.exports = new login();
})();
