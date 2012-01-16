var ReleasesController = function(releasesModel){
   var _releasesModel = releasesModel;

   function index(req, res){
      _releasesModel.listAll(function(releases) {
         res.render('releases/index', {releases: releases});
      });
   }

   function createView(req, res){
      res.render('releases/create');
   }

   function edit(req, res){
      var id = req.params.release;
      _releasesModel.findById(id, function(release) {
         res.render('releases/edit', { release: release });
      });
   }

   function create(req, res){
      _releasesModel.save(req.body.release, function(err) {
         res.redirect('/releases');
      });
   }

   function update(req, res){
      _releasesModel.update(req.body.release, function() {
            res.redirect('/releases');
      });
   }

   function destroy(req, res){
      var id = req.params.release;
      _releasesModel.deleteRelease(id, function() {
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

module.exports = ReleasesController

