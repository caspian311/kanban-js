(function() {
   var encryptionUtils = require('../../app/authentication/encryption_utils');

   describe('encryption_utils', function() {
      describe('#encrypt', function() {
         it('should not return plain text', function() {
            var plainText = 'this is plain text';

            var crypto = encryptionUtils.encrypt(plainText);

            plainText.should.not.equal(crypto);
         });

         it('should consistently return the same cipher text for a given plain text', function() {
            var plainText = 'this is plain text';

            var crypto1 = encryptionUtils.encrypt(plainText);
            var crypto2 = encryptionUtils.encrypt(plainText);

            crypto1.should.equal(crypto2);
         });

         it('should not return the same cipher text for differing plaint texts', function() {
            var crypto1 = encryptionUtils.encrypt('text1');
            var crypto2 = encryptionUtils.encrypt('text2');
            var crypto3 = encryptionUtils.encrypt('text3');

            crypto1.should.not.equal(crypto2);
            crypto2.should.not.equal(crypto3);
            crypto3.should.not.equal(crypto1);
         });
      });
   });
})();
