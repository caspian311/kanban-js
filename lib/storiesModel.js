var Data = require('./data');
var util = require('util');

var StoryModel = function() {
   function save(story_from_view, callback) {
      var story = new Data.Story();
      story.name = story_from_view.name;
      story.description = story_from_view.description;
      story.createdOn = new Date();
      story.modifiedOn = new Date();
      story.save(function(err) {
         callback();
      });
   }

   function update(story_from_view, callback) {
      Data.Story.findById(story_from_view.id, function(err, doc) {
         if (err || !doc) {
            throw "Could not find story by id(" + id + "): " + err;
         }
         doc.name = story_from_view.name;
         doc.description = story_from_view.description;
         doc.modifiedOn = new Date();
         doc.save(function(err) {
            callback();
         });
      });
   }

   function findById (id, callback) {
      Data.Story.findById(id, function(err, doc) {
         if (err || !doc) {
            throw new Error("Could not find a story with id: " + id);
         }
         callback(doc);
      });
   }

   function deleteStory(id, callback) {
      Data.Story.findById(id, function(err, doc) {
            if (err || !doc) {
               throw "Could not find story to delete: " + id;
            }
            doc.remove(function(err) {
               if (err) {
                  throw "Could not delete story: " + id;
               }
               callback();
         });
      });
   }
   
   function listAll(callback) {
      Data.Story.find(function(err, stories) {
         if (err || !stories) {
            throw "Could not find stories: " + err;
         }
         callback(stories);
      });
   }
   return {
      save: save,
      update: update,
      findById: findById,
      deleteStory: deleteStory,
      listAll: listAll
   };
};

module.exports = StoryModel;
