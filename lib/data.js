var mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   ObjectId = Schema.ObjectId;

var Data = function() {
   mongoose.connect('mongodb://localhost/kanban-js');

   var StorySchema = new Schema({
      name: String,
      description: String,
      createdOn: Date,
      modifiedOn: Date
   });

   var ReleaseSchema = new Schema({
      name: String,
      createdOn: Date,
      modifiedOn: Date,
      stories: [StorySchema]
   });

   var Story = mongoose.model('Story', StorySchema);
   var Release = mongoose.model('Release', ReleaseSchema);

   return {
      Story: Story,
      Release: Release
   };
};

module.exports = Data;

