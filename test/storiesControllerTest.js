var should = require('should');

var testObject = require('../lib/storiesController');
var storyModel = require('../lib/storyModel');

describe('StoriesController', function() {
   describe('#index', function() {
      it('should show all stories', function() {
         var stories = [{}, {}];

         storyModel.listAll = function(callback) {
            callback(stories);
         };

         var _obj;
         var res = {
            render: function(view, obj) {
               _obj = obj;
            }
         };

         testObject.index({}, res);

         _obj.should.have.property('stories');
         _obj.stories.length.should.equal(2);
      });

      it('should display the stories/index view', function() {
         storyModel.listAll = function(callback) {
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

   describe('#edit', function() {
      it('should show the edit view', function() {
         storyModel.findById = function(id, callback) {
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
         storyModel.findById = function(id, callback) {
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

         _obj.should.have.property('story');
         _obj.story.should.have.property('name', 'expected object to edit');
      });
   });

   describe('#destroy', function() {
      it('should delete the object with the id given', function() {
         var _id = 0;
         storyModel.deleteStory = function(id, callback) {
            _id = id;
            callback();
         };

         testObject.destroy({params: {storie: 234}}, {send: function() {}});

         _id.should.equal(234);
      });
   });

   describe('#create', function() {
      it('should redirect back', function() {
         storyModel.save = function(obj, callback) {
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
         storyModel.save = function(obj, callback) {
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
         storyModel.update = function(obj, callback) {
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
         storyModel.update = function(obj, callback) {
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

