var ReleaseModel = function(data) {
   var _data = data,
       Release = _data.Release;

   function save(release_from_view, callback) {
      var release = new Release();
      release.name = release_from_view.name;
      release.createdOn = new Date();
      release.modifiedOn = new Date();
      release.save(function(err) {
         callback();
      });
   }

   function update(release_from_view, callback) {
      Release.findById(release_from_view.id, function(err, doc) {
         if (err || !doc) {
            throw "Could not find release by id(" + id + "): " + err;
         }
         doc.name = release_from_view.name;
         doc.modifiedOn = new Date();
         doc.save(function(err) {
            callback();
         });
      });
   }

   function findById (id, callback) {
      Release.findById(id, function(err, doc) {
         if (err || !doc) {
            throw new Error("Could not find a release with id: " + id);
         }
         callback(doc);
      });
   }

   function deleteRelease(id, callback) {
      Release.findById(id, function(err, doc) {
            if (err || !doc) {
               throw "Could not find release to delete: " + id;
            }
            doc.remove(function(err) {
               if (err) {
                  throw "Could not delete release: " + id;
               }
               callback();
         });
      });
   }
   
   function listAll(callback) {
      Release.where({}).asc('name').run(function(err, releases) {
         if (err || !releases) {
            throw "Could not find releases: " + err;
         }
         callback(releases);
      });
   }

   return {
      save: save,
      update: update,
      findById: findById,
      deleteRelease: deleteRelease,
      listAll: listAll
   };
};

module.exports = ReleaseModel;
