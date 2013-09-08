(function() {
   var usersDb = require('../../app/db/users')
      , encryptionUtils = require('../../app/authentication/encryption_utils');

   var login_steps = function() {
      this.World = require('../support/world').World;

      this.Given(/^I am an unregistered user$/, function(callback) {
         // do nothing
         callback();
      });

      var loginWithCredentials = function(username, password, callback) {
         this.browser.fill('#username', username);
         this.browser.fill('#password', password);
         this.browser.pressButton('#login-button', callback);
      };

      this.When(/^I login with incorrect credentials$/, function(callback) {
         loginWithCredentials.call(this, 'badusername', 'badpassword', callback);
      });

      this.When(/^I go to the (.*) page$/, function(page_name, callback) {
         this.visit(page_name, callback);
      });

      this.Then(/^I should see "(.*)"$/, function(text, callback) {
         this.find_text(text, callback);
      });

      this.Given(/^I am a registered user$/, function(callback) {
         var encryptedPassword = encryptionUtils.encrypt(this.testUser.password);
         usersDb.addUser({ 
            name: this.testUser.name, 
            email: this.testUser.email, 
            password: encryptedPassword
         }, function() {
            callback();
         });
      });

      this.When(/^I login with correct credentials$/, function(callback) {
         loginWithCredentials.call(this, this.testUser.email, this.testUser.password, callback);
      });

      this.Then(/^I should see a welcome message$/, function(callback) {
         this.find_text('Welcome, ' + this.testUser.name, callback);
      });

      this.When(/^I fill in my registration information$/, function(callback) {
         this.browser.fill('#name', this.newUser.name);
         this.browser.fill('#email', this.newUser.email);
         this.browser.fill('#password', this.newUser.password);
         this.browser.fill('#confirm-password', this.newUser.password);
         this.browser.pressButton('#register-button', callback);
      });

      this.When(/^I login with the newly created user$/, function(callback) {
         var self = this;
         this.visit('login', function() {
            loginWithCredentials.call(self, self.newUser.email, self.newUser.password, callback);
         });
      });

      this.Then(/^I should see a new user welcome message$/, function(callback) {
         this.find_text('Welcome, ' + this.newUser.name, callback);
      });
   }
   module.exports = login_steps;
})();
