var should = require('should');
var util = require('util');

var Data = require('../lib/data');

var _data = new Data();

var StoriesModel = require('../lib/storiesModel');
var testObject = new StoriesModel(_data);

describe('StoriesModel', function() {
   beforeEach(function(done) {
      _data.Story.find(function(err, docs){
         docs.forEach(function(doc) {
            doc.remove();
         });
         done();
      });
   });

   describe('#listAll', function() {
      it('should return all stories', function(done) {
         var story1 = new _data.Story();
         story1.name = 'test1';
         story1.save();
         
         var story2 = new _data.Story();
         story2.name = 'test2';
         story2.save();
         
         testObject.listAll(function(stories) {
            stories.should.have.property('length');
            stories.length.should.equal(2);
            stories[0].name.should.equal('test1');
            stories[1].name.should.equal('test2');

            done();
         });
      });
   });
});

