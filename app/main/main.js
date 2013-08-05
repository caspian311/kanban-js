(function() {
   var Main = function() {
      this.home = function(request, response) {
         response.render('home', { user: request.user });
      };
   };

   module.exports = new Main();
})();
