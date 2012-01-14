var mongoose = require('mongoose');
var storiesModel = require('./storiesModel');

var StoriesController = function(){
   var StorySchema = new mongoose.Schema({
         name: String,
         description: String,
         createdOn: Date,
         modifiedOn: Date
      });
   var Story = mongoose.model('Story', StorySchema);

   function index(req, res){
      storiesModel.listAll(function(stories) {
         res.render('stories/index', {stories: stories});
      });
   }

   function createView(req, res){
      res.render('stories/create');
   }

   function edit(req, res){
      var id = req.params.storie;
      storiesModel.findById(id, function(story) {
         res.render('stories/edit', { story: story });
      });
   }

   function create(req, res){
      storiesModel.save(req.body.story, function(err) {
         res.redirect('/stories');
      });
   }

   function update(req, res){
      storiesModel.update(req.body.story, function() {
            res.redirect('/stories');
      });
   }

   function destroy(req, res){
      var id = req.params.storie;
      storiesModel.deleteStory(id, function() {
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

