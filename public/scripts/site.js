(function() {
   var kanbanjs = {};
   kanbanjs.logout = function() {
      window.location.href = '/logout';
   };

   window.kanbanjs = kanbanjs;
})();
