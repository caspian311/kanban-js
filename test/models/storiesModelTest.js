var should = require('should');
var util = require('util');

var Data = require('../../lib/data');

var _data = new Data();

var StoriesModel = require('../../lib/models/storiesModel');
var testObject = new StoriesModel(_data);

describe('StoriesModel', function() {
   beforeEach(function(done) {
      _data.Story.find(function(err, docs){
         docs.forEach(function(doc) {
            doc.remove();
         });
         _data.Release.find(function(err, docs){
            docs.forEach(function(doc) {
               doc.remove();
            });
         })
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

   describe('#deleteStory', function() {
      it('should delete the specified story', function(done) {
         var story1 = new _data.Story();
         story1.name = 'test1';
         story1.save();
         var idOfStoryToDelete = story1.id
         
         var story2 = new _data.Story();
         story2.name = 'test2';
         story2.save();

         testObject.deleteStory(idOfStoryToDelete, function() {
            _data.Story.find(function(err, stories) {
               stories.should.have.property('length');
               stories.length.should.equal(1);
               stories[0].name.should.equal('test2');

               done();
            });
         });
      });
   });

   describe('#save', function() {
      it('should save the given story', function(done) {
         var story1 = new _data.Story();
         story1.name = 'test123';
         
         testObject.save(story1, function() {
            _data.Story.find(function(err, stories) {
               stories.should.have.property('length');
               stories.length.should.equal(1);
               stories[0].name.should.equal('test123');

               done();
            });
         });
      });
   });

   describe('#update', function() {
      it('should update the given story', function(done) {
         var story1 = new _data.Story();
         story1.name = 'test123';
         story1.save();
         var idOfStory = story1.id;
         
         story1.name = 'test345';

         testObject.update(story1, function() {
            _data.Story.findById(idOfStory, function(err, story) {
               story.should.have.property('name');
               story.name.should.equal('test345');

               done();
            });
         });
      });
   });

   describe('#findById', function() {
      it('should return the story with the specified id', function(done) {
         var story1 = new _data.Story();
         story1.name = 'test1';
         story1.save();
         
         var story2 = new _data.Story();
         story2.name = 'test2';
         story2.save();
         var idOfStoryToFind = story2.id;

         testObject.findById(idOfStoryToFind, function(story) {
            story.should.have.property("name");
            story.name.should.equal("test2");
            done();
         });
      });
   });
});

