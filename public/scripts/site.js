(function() {
   var kanbanjs = {};
   kanbanjs.logout = function() {
      window.location.href = '/logout';
   };

   kanbanjs.getWidthOfParent = function(domElement) {
      return $(domElement).parent().width();
   };

   kanbanjs.setWidth = function(domElement, individualWidth) {
      $(domElement).width(individualWidth);
   };

   window.kanbanjs = kanbanjs;
})();
