(function() {
   var UserSerialization = function() {
      this.serialize = function(user, done) {
         done(null, user.id);
      };

      this.deserialize = function(id, done) {
         done(null, { id: id, name: 'Matt Todd' });
      };
   };

   module.exports = new UserSerialization();
})()
