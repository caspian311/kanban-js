(function() {
   var UserSerialization = function() {
      this.serialize = function(user, done) {
         done(null, user);
      };

      this.deserialize = function(user, done) {
         done(null, user);
      };
   };

   module.exports = new UserSerialization();
})()
