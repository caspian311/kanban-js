var mongoose = require('mongoose');
var util = require('util');

var StoryModel = function() {
   var StorySchema = new mongoose.Schema({
         name: String,
         description: String,
         createdOn: Date,
         modifiedOn: Date
      });
   var Story = mongoose.model('Story', StorySchema);

   function save(story_from_view, callback) {
      var story = new Story();
      story.name = story_from_view.name;
      story.description = story_from_view.description;
      story.createdOn = new Date();
      story.modifiedOn = new Date();
      story.save(function(err) {
         callback();
      });
   }

   function update(story_from_view, callback) {
      Story.findById(story_from_view.id, function(err, doc) {
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
      Story.findById(id, function(err, doc) {
         if (err || !doc) {
            throw new Error("Could not find a story with id: " + id);
         }
         callback(doc);
      });
   }

   function deleteStory(id, callback) {
      Story.findById(id, function(err, doc) {
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
      Story.find(function(err, stories) {
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

module.exports = new StoryModel();
