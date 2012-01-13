mongoose = require('mongoose');

var PeopleModel = function() {
   var StorySchema = new mongoose.Schema({
         name: String,
         description: String,
         createdOn: Date,
         modifiedOn: Date
      });
   var Story = mongoose.model('Story', StorySchema);

   var save = function(story_from_view, callback) {
      var story = new Story();
      story.name = story_from_view.name;
      story.description = story_from_view.description;
      story.createdOn = new Date();
      story.modifiedOn = new Date();
      story.save(function(err) {
         callback();
      });
   }

   return {
      save: save
   };
};

module.exports = new PeopleModel();
