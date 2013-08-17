(function() {
   var Main = function() {
      this.main = function(request, response) {
         response.render('main', { user: request.user });
      };
   };

   module.exports = new Main();
})();
