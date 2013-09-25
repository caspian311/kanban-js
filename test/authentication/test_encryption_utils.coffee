encryptionUtils = require '../../app/authentication/encryption_utils'

describe 'encryption_utils', () ->
   describe '#encrypt', () ->
      it 'should not return plain text', () ->
         plainText = 'this is plain text';

         crypto = encryptionUtils.encrypt plainText

         plainText.should.not.equal crypto

      it 'should consistently return the same cipher text for a given plain text', () ->
         plainText = 'this is plain text';

         crypto1 = encryptionUtils.encrypt plainText
         crypto2 = encryptionUtils.encrypt plainText

         crypto1.should.equal crypto2

      it 'should not return the same cipher text for differing plaint texts', () ->
         crypto1 = encryptionUtils.encrypt 'text1'
         crypto2 = encryptionUtils.encrypt 'text2'
         crypto3 = encryptionUtils.encrypt 'text3'

         crypto1.should.not.equal crypto2
         crypto2.should.not.equal crypto3
         crypto3.should.not.equal crypto1
