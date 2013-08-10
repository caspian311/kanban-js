(function() {
   var Logout = function() {
      this.logout = function(request, response) {
         request.logout();
         response.redirect('/login');
      }; 
   };

   module.exports = new Logout();
})();
