(function() {
   var authenticate_request = function(request, response, next) {
      if (request.user || request.path == '/login') {
         next();
      } else {
         response.redirect('/login');
      }
   }

   module.exports = authenticate_request;
})();
