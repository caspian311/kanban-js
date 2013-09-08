(function() {
   var UrlHelper = require('./url_helper')
      , url = new UrlHelper('http://localhost:3000');

   var Browser = require('zombie');
   var chai = require('chai');
   chai.should();
   var assert = chai.assert;

   var World = function World(callback) {
      this.browser = new Browser();

      this.visit = function(pageName, callback) {
         this.browser.visit(url.forPage(pageName), callback);
      };

      this.find_text = function(text, callback) {
         assert(this.browser.html().indexOf(text) > -1, '**************************\nCould not find ' + text + ' on page: \n' + this.browser.html());
         callback();
      };

      this.testUser = {
         name: 'Test User',
         email: 'test@user.com',
         password: 'test'
      };

      this.newUser = {
         name: 'New User',
         email: 'new@user.com',
         password: 'new'
      };

      callback();
   };

   exports.World = World;
})()
