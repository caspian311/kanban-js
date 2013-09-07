(function() {
   var UrlHelper = function(urlPrefix) {
      var pageMappings = {}
      pageMappings['main'] = '/'
      pageMappings['login'] = '/login'
      pageMappings['register'] = '/register'

      this.forPage = function(pageName) {
         return urlPrefix + pageMappings[pageName]
      };
   };

   module.exports = UrlHelper
})()
