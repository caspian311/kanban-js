var StoriesController = function(storiesModel){
   var _storiesModel = storiesModel;

   function index(req, res){
      _storiesModel.listAll(function(stories) {
         res.render('stories/index', {stories: stories});
      });
   }

   function createView(req, res){
      _storiesModel.getCreateViewModel(function(model) {
         res.render('stories/create', {model: model});
      });
   }

   function edit(req, res){
      var id = req.params.storie;
      _storiesModel.findById(id, function(story) {
         res.render('stories/edit', { story: story });
      });
   }

   function create(req, res){
      _storiesModel.save(req.body.story, function(err) {
         res.redirect('/stories');
      });
   }

   function update(req, res){
      _storiesModel.update(req.body.story, function() {
            res.redirect('/stories');
      });
   }

   function destroy(req, res){
      var id = req.params.storie;
      _storiesModel.deleteStory(id, function() {
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

module.exports = StoriesController

