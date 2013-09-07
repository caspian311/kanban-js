(function() {
   var login_steps = function() {
      this.World = require('../support/world').World;

      this.Given(/^I am an unregistered user$/, function(callback) {
         // do nothing
         callback();
      });

      this.When(/^I login with incorrect credentials$/, function(callback) {
         this.browser.fill('#username', 'badusername');
         this.browser.fill('#password', 'badpassword');
         this.browser.pressButton('#login-button', callback);
      });

      this.When(/^I go to the (.*) page$/, function(page_name, callback) {
         this.visit(page_name, callback);
      });

      this.Then(/^I should see "(.*)"$/, function(text, callback) {
         this.find_text(text, callback);
      });
   }
   module.exports = login_steps;
})();
