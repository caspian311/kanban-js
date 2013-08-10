(function() {
   var authenticateRequest = function(request, response, next) {
      if (request.user || request.path == '/login' || request.path == '/registration') {
         next();
      } else {
         response.redirect('/login');
      }
   }

   module.exports = authenticateRequest;
})();
