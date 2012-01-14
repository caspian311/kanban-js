var mongoose = require('mongoose');
var storyModel = require('./storyModel');

var StoriesController = function(){
   var StorySchema = new mongoose.Schema({
         name: String,
         description: String,
         createdOn: Date,
         modifiedOn: Date
      });
   var Story = mongoose.model('Story', StorySchema);

   function index(req, res){
      storyModel.listAll(function(stories) {
         res.render('stories/index', {stories: stories});
      });
   }

   function createView(req, res){
      res.render('stories/create');
   }

   function edit(req, res){
      var id = req.params.storie;
      storyModel.findById(id, function(story) {
         res.render('stories/edit', { story: story });
      });
   }

   function create(req, res){
      storyModel.save(req.body.story, function(err) {
         res.redirect('/stories');
      });
   }

   function update(req, res){
      storyModel.update(req.body.story, function() {
            res.redirect('/stories');
      });
   }

   function destroy(req, res){
      var id = req.params.storie;
      storyModel.deleteStory(id, function() {
         res.send({});
      });
   }

   return {
      index: index,
      new: createView,
      destroy: destroy,
      edit: edit,
      create: create,
      update: update
   };
};

module.exports = new StoriesController();

