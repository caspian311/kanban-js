var util = require('util');
require('../helper');

var StoryModel = function(data) {
   var _data = data,
       Story = _data.Story,
       Release = _data.Release;

   function save(story_from_view, callback) {
      Release.findById(story_from_view.release, function(err, release) {
         var story = new Story();
         story.name = story_from_view.name;
         story.description = story_from_view.description;
         story.createdOn = new Date();
         story.modifiedOn = new Date();
         release.stories.push(story);
         release.save(function(err) {
            if (err) {
               throw err;
            }
            callback();
         });
      });
   }

   function update(story_from_view, callback) {
      Release.findOne({"stories._id": story_from_view.id}, function(err, originalRelease) {
         var story = originalRelease.stories.id(story_from_view.id);
         story.name = story_from_view.name;
         story.description = story_from_view.description;
         story.modifiedOn = new Date();

         if (originalRelease.id == story_from_view.release) {
            originalRelease.save(function() {
               callback();
            });
         } else {
            Release.findById(story_from_view.release, function(err, newRelease) {
               originalRelease.stories.id(story_from_view.id).remove();
               originalRelease.save(function() {
                  newRelease.stories.push(story);

                  newRelease.save(function(err) {
                     callback();
                  });
               });
            });
         }
      });
   }

   function getEditStoryViewModel(id, callback) {
      Release.findOne({"stories._id": id}, function(err, release) {
         if (err || !release) {
            throw new Error("Could not find a story with id: " + id);
         }

         var story = release.stories.id(id)
         story.release = release._id
         Release.find(function(err, releases) {
            callback({ 
               story : story,
               releases: releases
            });
         });
      });
   }

   function deleteStory(id, callback) {
      Release.findOne({"stories._id": id}, function(err, release) {
         release.stories.id(id).remove();
         release.save(function() {
            callback();
         });
      });
   }
   
   function listAll(callback) {
      Release.find(function(err, releases) {
         var storiesForView = [];
         releases.each(function(release) {
            release.stories.each(function(story) {
               storiesForView.push({
                  id: story.id,
                  name: story.name,
                  description: story.description,
                  createdOn: story.createdOn,
                  modifiedOn: story.modifiedOn,
                  release_name: release.name
               });
            });
         });
         callback({ stories: storiesForView });
      });
   }

   function getCreateViewModel(callback) {
      Release.find({}, { name: 1 }, function(err, releases) {
         callback({ releases: releases });
      });
   }

   return {
      save: save,
      update: update,
      getEditStoryViewModel: getEditStoryViewModel,
      deleteStory: deleteStory,
      listAll: listAll,
      getCreateViewModel: getCreateViewModel
   };
};

module.exports = StoryModel;
