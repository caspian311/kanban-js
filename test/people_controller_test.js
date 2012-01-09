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

});

