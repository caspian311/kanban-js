(function() {
   var Main = function() {
      this.home = function(request, response) {
         response.render('main', {username: 'Matt Todd'});
      };
   };

   module.exports = new Main();
})();
