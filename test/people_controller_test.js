var should = require('should');

var mongoose = require('mongoose');
var Story = mongoose.model('Story',  new mongoose.Schema());

var testObject = require('../lib/stories_controller.js');

describe('StoriesController', function() {
   describe('#index', function() {
      it('should show all stories', function() {
         var stories = [{}, {}];

         Story.find = function(callback) {
            callback({}, stories);
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
         Story.find = function(callback) {
            callback({}, {});
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
         Story.findById = function(id, callback) {
            callback(null, {});
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
         Story.findById = function(id, callback) {
            if (id == 123) {
               callback(null, expectedObject);
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
         var objectToBeDeleted = {
            name: 'object to be deleted',
            remove: function(callback) {
               callback();
            }
         };
         Story.findById = function(id, callback) {
            if (id == 234) {
               callback(null, objectToBeDeleted);
            }
         };

         var _obj;
         var res = {
            send: function(obj) {
               _obj = obj;
            }
         };

         testObject.destroy({params: {storie: 234}}, res);

         should.exist(_obj);
      });

      it('should throw an error if the object is not found', function() {
         Story.findById = function(id, callback) {
            callback({});
         };

         try {
            testObject.destroy({params: {storie: 1}}, {});
            should.fail('expected an error');
         } catch(e) {
            e.should.equal('Could not find story to delete: 1');
         }
      });
   });
});

