var StoriesController = function(storiesModel){
   var _storiesModel = storiesModel;

   function index(req, res){
      _storiesModel.listAll(function(model) {
         res.render('stories/index', { model: model});
      });
   }

   function createView(req, res){
      _storiesModel.getCreateViewModel(function(model) {
         res.render('stories/create', {model: model});
      });
   }

   function create(req, res){
      _storiesModel.save(req.body.story, function(err) {
         res.redirect('/stories');
      });
   }

   function edit(req, res){
      var id = req.params.story;
      _storiesModel.getEditStoryViewModel(id, function(model) {
         res.render('stories/edit', { model: model });
      });
   }

   function update(req, res){
      _storiesModel.update(req.body.story, function() {
            res.redirect('/stories');
      });
   }

   function destroy(req, res){
      var id = req.params.story;
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

