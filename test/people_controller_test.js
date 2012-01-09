require('should');

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

         _obj.should.have.property.stories;
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

         _obj.should.have.property.story;
         _obj.story.should.have.property.name;
         _obj.story.name.should.equal('expected object to edit');
      });
   });
});

