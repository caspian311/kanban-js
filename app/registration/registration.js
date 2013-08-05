(function() {
   var Registration = function() {
      this.form = function(request, response) {
         response.render('form');
      };

      this.create = function(request, response) {
         response.redirect('/login?created_user_successfully=true');
      };
   };

   module.exports = new Registration();
})();
