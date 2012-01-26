var should = require('should');

var ReleasesController = require('../../lib/controllers/releasesController');

var releasesModelStub = {};
var testObject = new ReleasesController(releasesModelStub);

describe('ReleasesController', function() {
   describe('#index', function() {
      it('should show all releases', function() {
         var releases = [{}, {}];

         releasesModelStub.listAll = function(callback) {
            callback(releases);
         };

         var _obj;
         var res = {
            render: function(view, obj) {
               _obj = obj;
            }
         };

         testObject.index({}, res);

         _obj.should.have.property('releases');
         _obj.releases.length.should.equal(2);
      });

      it('should display the releases/index view', function() {
         releasesModelStub.listAll = function(callback) {
            callback();
         };

         var _view;
         var res = {
            render: function(view, obj) {
               _view = view;
            }
         };

         testObject.index({}, res);

         _view.should.equal('releases/index');
      });
   });

   describe('#createView', function() {
      it('should show the create view', function() {
         var _view;
         var res = {
            render: function(view, obj) {
               _view = view;
            }
         };

         testObject.new({}, res);

         _view.should.equal('releases/create');
      });
   });

   describe('#edit', function() {
      it('should show the edit view', function() {
         releasesModelStub.findById = function(id, callback) {
            callback({});
         };

         var _view;
         var res = {
            render: function(view, obj) {
               _view = view;
            }
         };

         testObject.edit({params: {release: 1}}, res);

         _view.should.equal('releases/edit');
      });

      it('should have the object that\'s being edited', function() {
         var expectedObject = { name: 'expected object to edit'};
         releasesModelStub.findById = function(id, callback) {
            if (id == 123) {
               callback(expectedObject);
            } else {
               callback();
            }
         };

         var _obj;
         var res = {
            render: function(view, obj) {
               _obj = obj;
            }
         };

         testObject.edit({params: {release: 123}}, res);

         _obj.should.have.property('release');
         _obj.release.should.have.property('name', 'expected object to edit');
      });
   });

   describe('#destroy', function() {
      it('should delete the object with the id given', function() {
         var _id = 0;
         releasesModelStub.deleteRelease = function(id, callback) {
            _id = id;
            callback();
         };

         testObject.destroy({params: {release: 234}}, {send: function() {}});

         _id.should.equal(234);
      });
   });

   describe('#create', function() {
      it('should redirect back', function() {
         releasesModelStub.save = function(obj, callback) {
            callback();
         }
         var _destination = null;
         var res = {
            redirect: function(destination) {
               _destination = destination;
            }
         };

         testObject.create({body: { release: {}}}, res);

         _destination.should.equal('/releases');
      });

      it('should save object to model', function() {
         var actual_object = null;
         releasesModelStub.save = function(obj, callback) {
            actual_object = obj
            callback();
         }
         var _destination = null;
         var res = {
            redirect: function(destination) {
               _destination = destination;
            }
         };

         var expected_object = {
            name: 'something'
         };
         testObject.create({body: { release: expected_object}}, res);

         actual_object.should.have.property('name');
         actual_object.name.should.equal('something');
      });
   });

   describe('#update', function() {
      it('should redirect back', function() {
         releasesModelStub.update = function(obj, callback) {
            callback();
         }
         var _destination = null;
         var res = {
            redirect: function(destination) {
               _destination = destination;
            }
         };

         testObject.update({body: { release: {}}}, res);

         _destination.should.equal('/releases');
      });

      it('should update object to model', function() {
         var actual_object = null;
         releasesModelStub.update = function(obj, callback) {
            actual_object = obj
            callback();
         }
         var _destination = null;
         var res = {
            redirect: function(destination) {
               _destination = destination;
            }
         };

         var expected_object = {
            name: 'something'
         };
         testObject.update({body: { release: expected_object}}, res);

         actual_object.should.have.property('name');
         actual_object.name.should.equal('something');
      });
   });
});

