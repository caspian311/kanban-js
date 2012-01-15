var mongoose = require('mongoose');

var Data = function() {
   mongoose.connect('mongodb://localhost/kanban-js');

   var StorySchema = new mongoose.Schema({
      name: String,
      description: String,
      createdOn: Date,
      modifiedOn: Date
   });

   var Story = mongoose.model('Story', StorySchema);

   return {
      Story: Story
   };
};

module.exports = Data;

