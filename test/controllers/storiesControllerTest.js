var should = require('should');

var StoriesController = require('../../lib/controllers/storiesController');

var storiesModelStub = {};
var testObject = new StoriesController(storiesModelStub);

describe('StoriesController', function() {
   describe('#index', function() {
      it('should show all stories', function() {
         var viewModel = { key: 'value' };

         storiesModelStub.listAll = function(callback) {
            callback(viewModel);
         };

         var _obj;
         var res = {
            render: function(view, obj) {
               _obj = obj;
            }
         };

         testObject.index({}, res);

         _obj.should.have.property('model');
         _obj.model.should.have.property('key');
         _obj.model.key.should.equal('value');
      });

      it('should display the stories/index view', function() {
         storiesModelStub.listAll = function(callback) {
            callback();
         };

         var _view;
         var res = {
            render: function(view, obj) {
               _view = view;
            }
         };

         testObject.index({}, res);

         _view.should.equal('stories/index');
      });
   });

   describe('#createView', function() {
      it('should show the create view', function() {
         storiesModelStub.getCreateViewModel = function(callback) {
            callback({});
         }

         var _view;
         var res = {
            render: function(view, obj) {
               _view = view;
            }
         };

         testObject.new({}, res);

         _view.should.equal('stories/create');
      });
   });

   describe('#createView', function() {
      it('should fetch the create view model from the stories model', function() {
         var model = {
            woot: "monkey"
         };
         storiesModelStub.getCreateViewModel = function(callback) {
            callback(model);
         }

         var _obj;
         var res = {
            render: function(view, obj) {
               _obj = obj;
            }
         };

         testObject.new({}, res);

         _obj.should.have.property('model');
         _obj.model.should.have.property('woot');
         _obj.model.woot.should.equal('monkey');
      });
   });

   describe('#edit', function() {
      it('should show the edit view', function() {
         storiesModelStub.getEditStoryViewModel = function(id, callback) {
            callback({});
         };

         var _view;
         var res = {
            render: function(view, obj) {
               _view = view;
            }
         };

         testObject.edit({params: {storie: 1}}, res);

         _view.should.equal('stories/edit');
      });

      it('should have the object that\'s being edited', function() {
         var expectedObject = { name: 'expected object to edit'};
         storiesModelStub.getEditStoryViewModel = function(id, callback) {
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

         testObject.edit({params: {storie: 123}}, res);

         _obj.should.have.property('model');
         _obj.model.should.have.property('name', 'expected object to edit');
      });
   });

   describe('#destroy', function() {
      it('should delete the object with the id given', function() {
         var _id = 0;
         storiesModelStub.deleteStory = function(id, callback) {
            _id = id;
            callback();
         };

         testObject.destroy({params: {storie: 234}}, {send: function() {}});

         _id.should.equal(234);
      });
   });

   describe('#create', function() {
      it('should redirect back', function() {
         storiesModelStub.save = function(obj, callback) {
            callback();
         }
         var _destination = null;
         var res = {
            redirect: function(destination) {
               _destination = destination;
            }
         };

         testObject.create({body: { story: {}}}, res);

         _destination.should.equal('/stories');
      });

      it('should save object to model', function() {
         var actual_object = null;
         storiesModelStub.save = function(obj, callback) {
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
         testObject.create({body: { story: expected_object}}, res);

         actual_object.should.have.property('name');
         actual_object.name.should.equal('something');
      });
   });

   describe('#update', function() {
      it('should redirect back', function() {
         storiesModelStub.update = function(obj, callback) {
            callback();
         }
         var _destination = null;
         var res = {
            redirect: function(destination) {
               _destination = destination;
            }
         };

         testObject.update({body: { story: {}}}, res);

         _destination.should.equal('/stories');
      });

      it('should update object to model', function() {
         var actual_object = null;
         storiesModelStub.update = function(obj, callback) {
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
         testObject.update({body: { story: expected_object}}, res);

         actual_object.should.have.property('name');
         actual_object.name.should.equal('something');
      });
   });
});

