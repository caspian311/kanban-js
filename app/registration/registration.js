(function() {
   var Registration = function() {
      this.form = function(request, response) {
         response.render('form');
      };
   };

   module.exports = new Registration();
})();
