var mongoose = require('mongoose');

var Data = function() {
   mongoose.connect('mongodb://localhost/kanban-js');

   var StorySchema = new mongoose.Schema({
      name: String,
      description: String,
      createdOn: Date,
      modifiedOn: Date
   });

   var ReleaseSchema = new mongoose.Schema({
      name: String,
      createdOn: Date,
      modifiedOn: Date
   });

   var Story = mongoose.model('Story', StorySchema);
   var Release = mongoose.model('Release', ReleaseSchema);

   return {
      Story: Story,
      Release: Release
   };
};

module.exports = Data;

