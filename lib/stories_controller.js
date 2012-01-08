var mongoose = require('mongoose');

var StoriesController = function(){
   var StorySchema = new mongoose.Schema({
         name: String,
         description: String,
         createdOn: Date,
         modifiedOn: Date
      });
   var Story = mongoose.model('Story', StorySchema);

   function index(req, res){
      showAllStories(req, res);
   }

   function createView(req, res){
      res.render('stories/create');
   }

   function edit(req, res){
      var id = req.params.storie;
      Story.findById(id, function(err, doc) {
         if (err || !doc) {
            throw new Error("Could not find a story with id: " + id);
         }
         res.render('stories/edit', { story: doc });
      });
   }

   function create(req, res){
      var story = new Story();
      story.name = req.body.story.name;
      story.description = req.body.story.description;
      story.createdOn = new Date();
      story.modifiedOn = new Date();
      story.save(function(err) {
         showAllStories(req, res);
      });
   }

   function update(req, res){
      var id = req.body.story.id;
      Story.findById(id, function(err, doc) {
         doc.name = req.body.story.name;
         doc.description = req.body.story.description;
         doc.modifiedOn = new Date();
         doc.save(function(err) {
            showAllStories(req, res);
         });
      });
   }

   function destroy(req, res){
      var id = req.params.storie;
      Story.findById(id, function(err, doc) {
            if (err || !doc) {
               throw "Could not find story to delete: " + id;
            }
            doc.remove(function(err) {
               if (err) {
                  throw "Could not delete story: " + id;
               }
               res.send({});
         });
      });
   }

   function showAllStories(req, res) {
      Story.find(function(err, stories) {
         res.render('stories/index', {stories: stories});
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

