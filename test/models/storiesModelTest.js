var should = require('should');
var util = require('util');

var Data = require('../../lib/data');

var _data = new Data(),
    Release = _data.Release,
    Story = _data.Story;

var StoriesModel = require('../../lib/models/storiesModel');
var testObject = new StoriesModel(_data);

describe('StoriesModel', function() {
   beforeEach(function(done) {
      Story.find(function(err, docs){
         docs.forEach(function(doc) {
            doc.remove();
         });

         Release.find(function(err, docs){
            docs.forEach(function(doc) {
               doc.remove();
            });

            done();
         });
      });
   });

   describe('#listAll', function() {
      it('should return all stories', function(done) {
         var story1 = new Story();
         story1.name = 'test1';
         story1.save();
         
         var story2 = new Story();
         story2.name = 'test2';
         story2.save();
         
         var release1 = new Release();
         release1.name = "release 1";
         release1.stories = [story1];
         release1.save();

         var release2 = new Release();
         release2.name = "release 2";
         release2.stories = [story2];
         release2.save();

         testObject.listAll(function(model) {
            model.should.have.property('stories');
            model.stories.should.have.property('length');
            model.stories.length.should.equal(2);
            model.stories[0].should.have.property('name');
            model.stories[0].name.should.equal('test1');
            model.stories[0].should.have.property('release_name');
            model.stories[0].release_name.should.equal('release 1');
            model.stories[1].should.have.property('name');
            model.stories[1].name.should.equal('test2');
            model.stories[1].should.have.property('release_name');
            model.stories[1].release_name.should.equal('release 2');

            done();
         });
      });
   });

   describe('#deleteStory', function() {
      it('should delete the specified story', function(done) {
         var story1 = new Story();
         story1.name = 'test1';
         story1.save();
         var idOfStoryToDelete = story1.id
         
         var story2 = new Story();
         story2.name = 'test2';
         story2.save();

         testObject.deleteStory(idOfStoryToDelete, function() {
            Story.find(function(err, stories) {
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
         var release = new Release();
         release.save(function(err) {
            var story1 = {
               name: 'story name',
               description: 'story description',
               release: release._id
            }
         
            testObject.save(story1, function() {
               Story.find(function(err, stories) {
                  should.not.exist(err);
                  stories.should.have.property('length');
                  stories.length.should.equal(1);
                  stories[0].should.have.property('name');
                  stories[0].name.should.equal('story name');
                  stories[0].should.have.property('description');
                  stories[0].description.should.equal('story description');

                  Release.findById(release._id, function(err, doc) {
                     doc.stories.should.have.property('length');
                     doc.stories.length.should.equal(1);
                     doc.stories[0].should.have.property('name');
                     doc.stories[0].name.should.equal('story name');
                     doc.stories[0].should.have.property('description');
                     doc.stories[0].description.should.equal('story description');

                     done();
                  });
               });
            });
         });
      });
   });

   describe('#update', function() {
      it('should update the given story', function(done) {
         var story1 = new Story();
         story1.name = 'test123';
         story1.save();
         var idOfStory = story1.id;
         
         story1.name = 'test345';

         testObject.update(story1, function() {
            Story.findById(idOfStory, function(err, story) {
               story.should.have.property('name');
               story.name.should.equal('test345');

               done();
            });
         });
      });
   });

   describe('#findById', function() {
      it('should return the story with the specified id', function(done) {
         var story1 = new Story();
         story1.name = 'test1';
         story1.save();
         
         var story2 = new Story();
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

   describe('#getCreateViewModel', function() {
      it('should return a view model with all releases', function(done) {
         var release1 = new Release();
         release1.name = 'test1';
         release1.save();
         
         var release2 = new Release();
         release2.name = 'test2';
         release2.save();

         testObject.getCreateViewModel(function(model) {
            model.should.have.property('releases');
            model.releases.should.have.property('length');
            model.releases.length.should.equal(2);
            model.releases[0].should.have.property('name');
            model.releases[0].name.should.equal('test1');
            model.releases[1].should.have.property('name');
            model.releases[1].name.should.equal('test2');
            done();
         });
      });
   });
});

